// Test poprawek: seria nie rośnie od samego otwarcia, numer scenki stały od losowania do oceny, przycisk 🧭 nie zasłania końca ekranu.
// Użycie: node seria-test.js <katalog_repozytorium> <port> [katalog_na_zrzut]
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs"), http = require("http"), path = require("path");
const root = path.resolve(process.argv[2] || ".") + "/public", port = Number(process.argv[3]) || 8812, out = process.argv[4];
const FB = s => ({ score: s, teen_reaction: "Poczuł, że ktoś go słucha.", what_works: "Echo i nazwana złość.", watch_out: "Pod złością może być rozczarowanie.", reflection_question: "Co poczułeś, gdy syn rzucił sprawdzian na blat?", suggestions: { warm: "Tyle nauki, a i tak nie wyszło.", naming: "Czujesz, że to nic nie dało.", best: "" }, trap_detected: null, perfect_note: null });
const T = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".png": "image/png" };
http.createServer((q, r) => {
  if (q.url.startsWith("/.netlify/functions/api")) { q.resume(); return setTimeout(() => { r.writeHead(200, { "Content-Type": "application/json" }); r.end(JSON.stringify({ content: JSON.stringify(FB(8)) })); }, 300); }
  if (q.url.startsWith("/.netlify/")) { r.writeHead(404); return r.end(); }
  let p = q.url.split("?")[0]; if (p === "/") p = "/index.html"; const f = path.join(root, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "Content-Type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r);
}).listen(port, async () => {
  const b = await chromium.launch(); let fails = 0;
  const ok = (c, m) => { console.log((c ? "  ✓ " : "  ✗ ") + m); if (!c) fails++; };
  const day = d => new Date(Date.now() - d * 86400000).toISOString().slice(0, 10);
  const all = Array.from({ length: 200 }, (_, i) => i + 1);
  async function open(st) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
    await ctx.addInitScript(sv => { if (!sessionStorage.getItem("init")) { sessionStorage.setItem("init", "1"); localStorage.setItem("uslysz_mnie_onb", "done"); localStorage.setItem("uslysz_mnie_install", String(Date.now())); localStorage.setItem("uslysz_mnie_v4", JSON.stringify(sv)); } }, st);
    const pg = await ctx.newPage(); const errs = []; pg.on("pageerror", e => errs.push(String(e)));
    await pg.goto(`http://127.0.0.1:${port}/`); await pg.waitForSelector("text=Poziom 1", { timeout: 60000 }); await pg.waitForTimeout(500);
    return { ctx, pg, errs };
  }
  const badge = async pg => (await pg.locator(".streak-badge").count()) ? (await pg.locator(".streak-badge").textContent()).trim() : "brak";
  const title = async pg => (await pg.locator(".tl").textContent()).trim();
  const st = (streak, lastDay, t = 4) => ({ lv: 1, stats: { t, ts: 29, b: 9 }, lvGood: { 1: 3, 2: 0, 3: 0 }, tc: {}, usedIds: all.filter(i => i !== 1 && i !== 3), db: 2, streak, lastDay });
  async function answer(pg) {
    await pg.waitForSelector("textarea"); await pg.waitForTimeout(3500);
    await pg.fill("textarea", "Cały weekend nad fizyką, a tu dwója. Wkurza cię to.");
    await pg.click("text=Wyślij odpowiedź"); await pg.waitForSelector("text=Następna sytuacja", { timeout: 20000 }); await pg.waitForTimeout(1500);
  }

  console.log("1. Seria");
  let { ctx, pg, errs } = await open(st(3, day(1)));
  ok(await badge(pg) === "🔥 3. dzień z rzędu", "wczoraj ostatni dzień, seria 3: po otwarciu „" + await badge(pg) + "” (bez zwiększenia)");
  await pg.reload(); await pg.waitForSelector("text=Poziom 1"); await pg.waitForTimeout(500);
  ok(await badge(pg) === "🔥 3. dzień z rzędu", "ponowne otwarcie tego samego dnia: „" + await badge(pg) + "”");
  await pg.click("text=Poziom 1"); await answer(pg); await pg.click("text=← Menu"); await pg.waitForTimeout(500);
  ok(await badge(pg) === "🔥 4. dzień z rzędu", "po odpowiedzi: „" + await badge(pg) + "”");
  let saved = JSON.parse(await pg.evaluate(() => localStorage.getItem("uslysz_mnie_v4")));
  ok(saved.streak === 4 && saved.lastDay === day(0), "zapis: streak=" + saved.streak + ", lastDay=" + saved.lastDay);
  await pg.click("text=Poziom 1"); await answer(pg); await pg.click("text=← Menu"); await pg.waitForTimeout(500);
  ok(await badge(pg) === "🔥 4. dzień z rzędu", "druga odpowiedź tego samego dnia: „" + await badge(pg) + "”");
  ok(errs.length === 0, "brak błędów strony " + JSON.stringify(errs)); await ctx.close();

  ({ ctx, pg, errs } = await open(st(5, day(3))));
  ok(await badge(pg) === "brak", "przerwa 3 dni, seria 5: po otwarciu bez odznaki serii (" + await badge(pg) + ")");
  await pg.click("text=Poziom 1"); await answer(pg);
  saved = JSON.parse(await pg.evaluate(() => localStorage.getItem("uslysz_mnie_v4")));
  ok(saved.streak === 1 && saved.lastDay === day(0), "po odpowiedzi seria od nowa: streak=" + saved.streak); await ctx.close();

  ({ ctx, pg, errs } = await open(st(2, day(0))));
  ok(await badge(pg) === "🔥 2. dzień z rzędu", "dziś już ćwiczone: „" + await badge(pg) + "”"); await ctx.close();

  ({ ctx, pg, errs } = await open(st(0, null)));
  ok(await badge(pg) === "brak", "nowa osoba: bez odznaki serii"); await ctx.close();

  console.log("2. Numer scenki w nagłówku");
  ({ ctx, pg, errs } = await open(st(0, null)));
  await pg.click("text=Poziom 1"); await pg.waitForSelector("textarea");
  const t1 = await title(pg); ok(t1.endsWith("Scenka 5"), "scenka: „" + t1 + "”");
  await answer(pg); const t2 = await title(pg); ok(t2 === t1, "ocena tej samej scenki: „" + t2 + "”");
  await pg.click("text=Udoskonal odpowiedź"); await pg.waitForSelector("textarea"); const t3 = await title(pg); ok(t3 === t1, "udoskonalenie tej samej scenki: „" + t3 + "”");
  await answer(pg); ok(await title(pg) === t1, "ocena po udoskonaleniu: „" + await title(pg) + "”");
  await pg.click("text=Następna sytuacja"); await pg.waitForSelector("textarea"); const t4 = await title(pg); ok(t4.endsWith("Scenka 7"), "następna scenka (2 oceny w statystyce): „" + t4 + "”");
  await ctx.close();
  ({ ctx, pg } = await open(st(0, null, 0)));
  await pg.click("text=Poziom 1"); await pg.waitForSelector("textarea"); ok(await title(pg) === "🟢 Poziom 1", "pierwsza scenka bez numeru: „" + await title(pg) + "”");
  await answer(pg); ok(await title(pg) === "🟢 Poziom 1", "jej ocena też bez numeru: „" + await title(pg) + "”");
  await pg.click("text=Następna sytuacja"); await pg.waitForSelector("textarea"); ok((await title(pg)).endsWith("Scenka 2"), "druga scenka: „" + await title(pg) + "”");
  await ctx.close();

  console.log("3. Przycisk mapy emocji");
  for (const [w, h] of [[390, 844], [360, 640], [430, 932]]) {
    ({ ctx, pg } = await open(st(0, null)));
    await pg.setViewportSize({ width: w, height: h });
    await pg.click("text=Poziom 1"); await answer(pg);
    await pg.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await pg.waitForTimeout(800);
    const fab = await pg.locator(".emo-fab").boundingBox();
    const last = await pg.locator(".btns button").last().boundingBox();
    ok(last.y + last.height <= fab.y, `${w}×${h}, ocena przewinięta do końca: ostatni przycisk kończy się na ${Math.round(last.y + last.height)}, przycisk 🧭 zaczyna na ${Math.round(fab.y)}`);
    if (w === 390 && out) await pg.screenshot({ path: out + "/ocena-koniec.png" });
    await pg.click("text=Udoskonal odpowiedź"); await pg.waitForSelector("textarea"); await pg.waitForTimeout(3500);
    await pg.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await pg.waitForTimeout(500);
    const fab2 = await pg.locator(".emo-fab").boundingBox(), send = await pg.locator(".snb").boundingBox();
    ok(send.y + send.height <= fab2.y || send.x + send.width <= fab2.x, `${w}×${h}, scenka: „Wyślij odpowiedź” nie wchodzi pod 🧭`);
    await ctx.close();
  }
  console.log(fails ? `Niezaliczone: ${fails}` : "Wszystkie testy zaliczone."); await b.close(); process.exit(fails ? 1 : 0);
});
