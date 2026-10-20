// Test liczenia poprawek: scenka liczy się w postępie raz, z najlepszym wynikiem (statystyki, poziom, pułapki, historia, podsumowanie).
// Użycie: node poprawka-test.js <katalog_repozytorium> <port>
// Atrapa oceny bierze wynik z pierwszej liczby w odpowiedzi rodzica („7 …” daje 7), słowo „rada” daje pułapkę „Rada”.
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs"), http = require("http"), path = require("path");
const root = path.resolve(process.argv[2] || ".") + "/public", port = Number(process.argv[3]) || 8815;
const T = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".png": "image/png" };
http.createServer((q, r) => {
  if (q.url.startsWith("/.netlify/functions/api")) {
    let b = ""; q.on("data", c => b += c);
    return q.on("end", () => {
      const resp = JSON.parse(b).response || "", score = Number((resp.match(/\d+/) || [5])[0]);
      const fb = { score, teen_reaction: "Test.", what_works: "Test.", watch_out: "Test.", reflection_question: "Test?", suggestions: { warm: "Echo.", naming: "Nazwa.", best: "" }, trap_detected: /rada/i.test(resp) ? "Rada" : null, perfect_note: null };
      r.writeHead(200, { "Content-Type": "application/json" }); r.end(JSON.stringify({ content: JSON.stringify(fb) }));
    });
  }
  if (q.url.startsWith("/.netlify/")) { r.writeHead(404); return r.end(); }
  let p = q.url.split("?")[0]; if (p === "/") p = "/index.html"; const f = path.join(root, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "Content-Type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r);
}).listen(port, async () => {
  const b = await chromium.launch(); let fails = 0;
  const ok = (c, m) => { console.log((c ? "  ✓ " : "  ✗ ") + m); if (!c) fails++; };
  const all = Array.from({ length: 200 }, (_, i) => i + 1);
  const base = o => ({ lv: 1, stats: { t: 4, ts: 29, b: 9 }, lvGood: { 1: 3, 2: 0, 3: 0 }, tc: {}, usedIds: [], db: 2, streak: 0, lastDay: null, ...o });
  async function open(st, hist = []) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
    await ctx.addInitScript(([sv, h]) => { if (!sessionStorage.getItem("init")) { sessionStorage.setItem("init", "1"); localStorage.setItem("uslysz_mnie_onb", "done"); localStorage.setItem("uslysz_mnie_install", String(Date.now())); localStorage.setItem("uslysz_mnie_v4", JSON.stringify(sv)); localStorage.setItem("uslysz_mnie_hist", JSON.stringify(h)); } }, [st, hist]);
    const pg = await ctx.newPage(); const errs = []; pg.on("pageerror", e => errs.push(String(e)));
    await pg.goto(`http://127.0.0.1:${port}/`); await pg.waitForSelector("text=Poziom 1", { timeout: 60000 }); await pg.waitForTimeout(300);
    return { ctx, pg, errs };
  }
  const saved = async pg => JSON.parse(await pg.evaluate(() => localStorage.getItem("uslysz_mnie_v4")));
  const hist = async pg => JSON.parse(await pg.evaluate(() => localStorage.getItem("uslysz_mnie_hist") || "[]"));
  async function answer(pg, text) {
    await pg.waitForSelector("textarea"); await pg.waitForTimeout(3200);
    await pg.fill("textarea", text); await pg.click("text=Wyślij odpowiedź");
    await pg.waitForSelector(".btns .bp", { timeout: 20000 }); await pg.waitForTimeout(1200);
  }
  const retry = async pg => { await pg.click(".btns .bs"); };
  const nextScene = async pg => { await pg.click("text=Następna sytuacja"); };
  const title = async pg => (await pg.locator(".tl").textContent()).trim();

  console.log("1. Poprawka lepsza, potem gorsza");
  let { ctx, pg, errs } = await open(base({}));
  await pg.click("text=Poziom 1"); await answer(pg, "5 pierwsza odpowiedź");
  let s = await saved(pg); ok(s.stats.t === 5 && s.stats.ts === 34, `pierwsza odpowiedź (5): t=${s.stats.t}, suma=${s.stats.ts}`);
  await retry(pg); await answer(pg, "8 poprawka");
  s = await saved(pg); ok(s.stats.t === 5 && s.stats.ts === 37, `poprawka lepsza (8): scenka liczona raz, t=${s.stats.t}, suma=${s.stats.ts}`);
  ok(s.lvGood[1] === 4, `poprawka przekroczyła 7: dobre odpowiedzi na poziomie 1 = ${s.lvGood[1]} (było 3)`);
  let h = await hist(pg); ok(h.length === 1 && h[0].score === 8 && h[0].resp === "8 poprawka", `historia: ${h.length} wpis, wynik ${h[0] && h[0].score}, odpowiedź „${h[0] && h[0].resp}”`);
  await retry(pg); await answer(pg, "7 druga poprawka");
  s = await saved(pg); ok(s.stats.t === 5 && s.stats.ts === 37 && s.lvGood[1] === 4, `poprawka gorsza (7): bez zmian, t=${s.stats.t}, suma=${s.stats.ts}, dobre=${s.lvGood[1]}`);
  h = await hist(pg); ok(h.length === 1 && h[0].score === 8, `historia zostaje przy najlepszej (wynik ${h[0].score})`);
  const sw = await pg.locator(".stb .sn").first().textContent(); ok(sw.trim() === "5", `pasek statystyk na ekranie: ${sw.trim()} sytuacji`);
  await nextScene(pg); await pg.waitForSelector("textarea"); ok((await title(pg)).endsWith("Scenka 6"), `następna scenka: „${await title(pg)}”`);
  await answer(pg, "6 nowa scenka");
  s = await saved(pg); ok(s.stats.t === 6 && s.stats.ts === 43, `nowa scenka liczy się normalnie: t=${s.stats.t}, suma=${s.stats.ts}`);
  ok((await hist(pg)).length === 2, "historia: 2 wpisy (2 scenki)");
  ok(errs.length === 0, "brak błędów strony " + JSON.stringify(errs)); await ctx.close();

  console.log("2. Pułapki");
  ({ ctx, pg } = await open(base({})));
  await pg.click("text=Poziom 1"); await answer(pg, "4 rada: zrób tak");
  s = await saved(pg); ok(s.tc.Rada === 1, `pierwsza odpowiedź z pułapką: Rada=${s.tc.Rada}`);
  await retry(pg); await answer(pg, "3 rada gorsza");
  s = await saved(pg); ok(s.tc.Rada === 1, `gorsza poprawka z tą samą pułapką: Rada=${s.tc.Rada}`);
  await retry(pg); await answer(pg, "9 bez pułapki");
  s = await saved(pg); ok((s.tc.Rada || 0) === 0 && s.stats.ts === 29 + 9 && s.stats.b === 9, `lepsza poprawka bez pułapki: Rada=${s.tc.Rada || 0}, suma=${s.stats.ts}`);
  await ctx.close();

  console.log("3. Awans przez poprawkę");
  ({ ctx, pg } = await open(base({ lvGood: { 1: 9, 2: 0, 3: 0 } })));
  await pg.click("text=Poziom 1"); await answer(pg, "6 prawie");
  s = await saved(pg); ok(s.lv === 1 && s.lvGood[1] === 9, `6: bez awansu (dobre=${s.lvGood[1]})`);
  await retry(pg); await answer(pg, "7 lepiej");
  s = await saved(pg); ok(s.lv === 2 && s.lvGood[1] === 10, `poprawka 7: awans na poziom ${s.lv} (dobre=${s.lvGood[1]})`);
  await ctx.close();
  ({ ctx, pg } = await open(base({ lvGood: { 1: 9, 2: 0, 3: 0 } })));
  await pg.click("text=Poziom 1"); await answer(pg, "7 dobrze");
  await retry(pg); await answer(pg, "8 jeszcze lepiej");
  s = await saved(pg); ok(s.lvGood[1] === 10, `7, potem 8: scenka liczona raz jako dobra (dobre=${s.lvGood[1]})`);
  await ctx.close();

  console.log("4. Powrót na łatwiejszy poziom");
  ({ ctx, pg } = await open(base({ lv: 2 })));
  await pg.click("text=Poziom 2"); await answer(pg, "3 słabo");
  await nextScene(pg); await answer(pg, "3 słabo");
  await retry(pg); await answer(pg, "3 dalej słabo");
  s = await saved(pg); ok(s.lv === 2, `dwie słabe scenki i słaba poprawka: zostaje poziom ${s.lv}`);
  await nextScene(pg); await answer(pg, "3 trzecia słaba scenka");
  s = await saved(pg); ok(s.lv === 1, `trzecia słaba scenka z rzędu: powrót na poziom ${s.lv}`);
  await ctx.close();
  ({ ctx, pg } = await open(base({ lv: 2 })));
  await pg.click("text=Poziom 2"); await answer(pg, "3 słabo");
  await nextScene(pg); await answer(pg, "3 słabo");
  await retry(pg); await answer(pg, "7 poprawione");
  await nextScene(pg); await answer(pg, "3 słabo");
  s = await saved(pg); ok(s.lv === 2, `poprawiona druga scenka przerywa serię słabych: zostaje poziom ${s.lv}`);
  await ctx.close();

  console.log("5. Podsumowanie co 10 scenek");
  ({ ctx, pg } = await open(base({ stats: { t: 9, ts: 60, b: 9 } })));
  await pg.click("text=Poziom 1"); await answer(pg, "5 dziesiąta scenka");
  await retry(pg); await answer(pg, "8 poprawka");
  s = await saved(pg); ok(s.stats.t === 10, `po poprawce dziesiątej scenki: t=${s.stats.t}`);
  await nextScene(pg); await pg.waitForSelector("text=Ćwiczę dalej", { timeout: 5000 }).catch(() => {});
  ok(await pg.locator("text=Ćwiczę dalej").count() === 1, "po dziesiątej scence podsumowanie");
  const avg = (await pg.locator(".si .sn").nth(1).textContent()).trim(); ok(avg === "6.8", `średnia w podsumowaniu z najlepszych wyników: ${avg} (68/10)`);
  await ctx.close();

  console.log(fails ? `Niezaliczone: ${fails}` : "Wszystkie testy zaliczone."); await b.close(); process.exit(fails ? 1 : 0);
});
