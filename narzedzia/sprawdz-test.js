// Test „Sprawdź się”: kafelek przed Poziomem 1, 10 sytuacji bez ocen po drodze, przerwa i powrót, analiza na końcu, ponowienie po błędzie.
// Użycie: node sprawdz-test.js <katalog_repozytorium> <port> [katalog_na_zrzuty]
// Atrapa oceny bierze wynik z pierwszej liczby w odpowiedzi („7 …” daje 7); analizę zwraca stałą, pierwszą może celowo zepsuć.
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs"), http = require("http"), path = require("path");
const repo = path.resolve(process.argv[2] || "."), root = repo + "/public", port = Number(process.argv[3]) || 8817, out = process.argv[4];
const calls = { feedback: [], summary: [] }; let failSummary = 0;
const SUMMARY = { style_name: "Towarzysz z odruchem Doradcy", style: "W wielu odpowiedziach jest uważność na to, co dziecko przeżywa. Przy trudniejszych sytuacjach pojawia się chęć szybkiego rozwiązania problemu, za którą stoi troska.", strengths: "Umiesz nazwać rozczarowanie i złość prostymi słowami, bez pouczania.", improve: [{ tip: "Gdy dziecko jest złe na Ciebie, zostań przy jego uczuciu, zanim cokolwiek wyjaśnisz.", example: "Wkurza cię, że czytałam twoje wiadomości." }, { tip: "Przy decyzjach dziecka zamiast rady spróbuj echa.", example: "Dziesięć lat i czujesz, że to nie twoje miejsce." }], encouragement: "Każda z tych odpowiedzi to krok w stronę dziecka. Ćwiczenie naprawdę zmienia odruchy." };
const T = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".png": "image/png" };
http.createServer((q, r) => {
  if (q.url.startsWith("/.netlify/functions/api")) {
    let b = ""; q.on("data", c => b += c);
    return q.on("end", async () => {
      const body = JSON.parse(b);
      const { buildMessages } = await import(require("url").pathToFileURL(repo + "/netlify/functions/api.mjs").href);
      const valid = !!buildMessages(body);
      const send = (st, o) => { r.writeHead(st, { "Content-Type": "application/json" }); r.end(JSON.stringify(o)); };
      if (!valid) return send(400, { error: "Niepoprawne dane" });
      if (body.type === "test_summary") { calls.summary.push(body); if (failSummary > 0) { failSummary--; return send(502, { error: "upstream" }); } return setTimeout(() => send(200, { content: JSON.stringify(SUMMARY) }), 400); }
      calls.feedback.push(body);
      const score = Number((body.response.match(/\d+/) || [5])[0]);
      const fb = { score, teen_reaction: "Test.", what_works: "Działa " + score + ".", watch_out: "Uwaga " + score + ".", reflection_question: "?", suggestions: { warm: "Echo.", naming: "Nazwa " + score + ".", best: "" }, trap_detected: score < 5 ? "Rada" : null, perfect_note: null };
      setTimeout(() => send(200, { content: JSON.stringify(fb) }), 300);
    });
  }
  if (q.url.startsWith("/.netlify/")) { r.writeHead(404); return r.end(); }
  let p = q.url.split("?")[0]; if (p === "/") p = "/index.html"; const f = path.join(root, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "Content-Type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r);
}).listen(port, async () => {
  const b = await chromium.launch(); let fails = 0;
  const ok = (c, m) => { console.log((c ? "  ✓ " : "  ✗ ") + m); if (!c) fails++; };
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
  const startState = { lv: 1, stats: { t: 4, ts: 29, b: 9 }, lvGood: { 1: 3, 2: 0, 3: 0 }, tc: {}, usedIds: [], db: 2, streak: 2, lastDay: new Date(Date.now() - 86400000).toISOString().slice(0, 10) };
  await ctx.addInitScript(sv => { if (!localStorage.getItem("uslysz_mnie_onb")) { localStorage.setItem("uslysz_mnie_onb", "done"); localStorage.setItem("uslysz_mnie_install", String(Date.now())); localStorage.setItem("uslysz_mnie_v4", JSON.stringify(sv)); } }, startState);
  const pg = await ctx.newPage(); const errs = []; pg.on("pageerror", e => errs.push(String(e)));
  const home = async () => { await pg.goto(`http://127.0.0.1:${port}/`); await pg.waitForSelector("text=Poziom 1", { timeout: 60000 }); await pg.waitForTimeout(300); };
  const ls = async k => JSON.parse(await pg.evaluate(k => localStorage.getItem(k), k));
  const scores = [7, 8, 6, 9, 5, 4, 7, 3, 6, 8]; // suma 63
  async function answer(i) {
    await pg.waitForSelector(`text=Sytuacja ${i + 1} z 10`); await pg.waitForTimeout(1500);
    await pg.fill("textarea", `${scores[i]} odpowiedź numer ${i + 1}`);
    await pg.click(i < 9 ? "text=Dalej →" : "text=Zakończ i zobacz wynik");
  }

  console.log("1. Kafelek i wstęp");
  await home();
  const tiles = await pg.locator(".lp .lb .l").allTextContents();
  ok(tiles[0] === "Sprawdź się" && tiles[1].startsWith("Poziom 1"), `kafelki: ${tiles.slice(0, 2).join(" | ")}`);
  ok((await pg.locator(".lb-test .d").textContent()) === "10 sytuacji, wynik i analiza na końcu", "opis kafelka przed pierwszym testem");
  if (out) await pg.screenshot({ path: out + "/test-0-start.png", fullPage: true });
  await pg.click(".lb-test"); await pg.waitForSelector("text=Zaczynam");
  ok((await pg.locator(".tl").textContent()).trim() === "📝 Sprawdź się", "tytuł w pasku");
  ok(await pg.locator(".stb").count() === 0, "bez paska statystyk treningu");
  if (out) { await pg.waitForTimeout(1000); await pg.screenshot({ path: out + "/test-1-wstep.png", fullPage: true }); }

  console.log("2. Sytuacje bez ocen po drodze");
  await pg.click("text=Zaczynam");
  for (let i = 0; i < 4; i++) await answer(i);
  await pg.waitForSelector("text=Sytuacja 5 z 10"); await pg.waitForTimeout(1500);
  if (out) await pg.screenshot({ path: out + "/test-2-sytuacja.png" });
  const body = await pg.locator("#app").textContent();
  ok(!/\d+\/10\b/.test(body) && await pg.locator(".scr").count() === 0, "po 4 odpowiedziach na ekranie nie ma żadnej oceny");
  ok(calls.feedback.length === 4, `oceny liczone w tle: ${calls.feedback.length} zapytania`);
  const girls = calls.feedback.map(c => c.girl).join(","); ok(girls === "true,false,true,false", `płeć w zapytaniach (10 f, 22 m, 76 f, 67 m): ${girls}`);
  ok(await pg.locator(".tst-prog span.d").count() === 4, "pasek postępu: 4 zrobione");

  console.log("3. Przerwa i powrót");
  await home();
  ok((await pg.locator(".lb-test .d").textContent()) === "Test w toku: 4 z 10", "kafelek: " + await pg.locator(".lb-test .d").textContent());
  await pg.click(".lb-test"); await pg.waitForSelector("text=Kontynuuj");
  ok((await pg.locator(".bp").first().textContent()).includes("sytuacja 5 z 10"), "przycisk: " + (await pg.locator(".bp").first().textContent()));
  await pg.click("text=Kontynuuj");
  failSummary = 2; // aplikacja sama ponawia raz, więc dwa błędy z rzędu
  for (let i = 4; i < 10; i++) await answer(i);

  console.log("4. Błąd analizy i ponowienie");
  await pg.waitForSelector("text=Spróbuj ponownie", { timeout: 20000 });
  ok(true, "błąd analizy: komunikat i przycisk ponowienia");
  const run = await ls("uslysz_mnie_test"); ok(run && run.answers.length === 10, "odpowiedzi zachowane po błędzie");
  await pg.click("text=Spróbuj ponownie");
  await pg.waitForSelector(".tst-score", { timeout: 20000 }); await pg.waitForTimeout(800);
  ok(calls.feedback.length === 10, `każda odpowiedź oceniona raz mimo ponowienia (${calls.feedback.length})`);
  ok(calls.summary.length === 3, `analiza: ${calls.summary.length} zapytania (2 nieudane + ponowienie)`);
  const sent = calls.summary[2].items.map(x => x.score).join(","); ok(sent === scores.join(","), "do analizy trafiają oceny: " + sent);
  ok(calls.summary[2].items[5].trap === "Rada", "i pułapki (sytuacja 6: Rada)");

  console.log("5. Wynik");
  ok((await pg.locator(".tst-n").textContent()) === "63", "wynik: " + await pg.locator(".tst-n").textContent() + "/100");
  ok((await pg.locator(".tst-band").textContent()) === "Dobry kierunek", "opis wyniku: " + await pg.locator(".tst-band").textContent());
  ok((await pg.locator(".tst-sn").textContent()) === SUMMARY.style_name, "styl: " + await pg.locator(".tst-sn").textContent());
  ok(await pg.locator(".tst-tip").count() === 2, "2 podpowiedzi, co poćwiczyć");
  ok(await pg.locator(".tst-enc").count() === 1, "ciepłe zakończenie");
  ok((await pg.locator(".btns .bp").first().textContent()).includes("Poziom 2"), "polecany poziom (średnia poziomu 1: 7,5, poziomu 2: 5,3): " + await pg.locator(".btns .bp").first().textContent());
  if (out) await pg.screenshot({ path: out + "/test-3-wynik.png", fullPage: true });
  await pg.click("text=Twoje odpowiedzi po kolei"); await pg.waitForTimeout(300);
  ok(await pg.locator(".tst-item").count() === 10, "szczegóły: 10 odpowiedzi z ocenami");
  const st = await ls("uslysz_mnie_v4");
  ok(st.stats.t === 4 && st.stats.ts === 29, "statystyki treningu bez zmian");
  ok(st.streak === 3 && st.lastDay === new Date().toISOString().slice(0, 10), `seria dni: test liczy się jako ćwiczenie (${st.streak})`);
  ok((await ls("uslysz_mnie_hist") || []).length === 0, "historia treningu bez zmian");
  ok(await ls("uslysz_mnie_test") === null, "test w toku usunięty po zakończeniu");

  console.log("6. Kolejne podejście");
  await pg.click("text=Wróć do menu"); await pg.waitForTimeout(300);
  ok((await pg.locator(".lb-test .d").textContent()).startsWith("Ostatni wynik: 63/100"), "kafelek: " + await pg.locator(".lb-test .d").textContent());
  await pg.click(".lb-test"); await pg.waitForSelector("text=Zobacz analizę");
  await pg.click("text=Zobacz analizę"); await pg.waitForSelector(".tst-score"); ok(true, "ostatnia analiza dostępna ze wstępu");
  await pg.click("text=Wróć do menu"); await pg.click(".lb-test"); await pg.click("text=Zrób test jeszcze raz");
  scores.splice(0, 10, 9, 9, 8, 9, 8, 7, 9, 8, 8, 9); // suma 84
  for (let i = 0; i < 10; i++) await answer(i);
  await pg.waitForSelector(".tst-score", { timeout: 20000 });
  ok((await pg.locator(".tst-n").textContent()) === "84", "drugi wynik: 84");
  ok((await pg.locator(".tst-prev").textContent()) === "To o 21 pkt więcej niż poprzednio (63).", "porównanie: " + await pg.locator(".tst-prev").textContent());
  ok((await pg.locator(".btns .bp").first().textContent()).includes("Poziom 3"), "polecany poziom po dobrym wyniku: " + await pg.locator(".btns .bp").first().textContent());
  await pg.click("text=Ćwicz dalej"); await pg.waitForSelector("textarea");
  ok((await pg.locator(".tl").textContent()).includes("Poziom 3"), "przejście do treningu: " + (await pg.locator(".tl").textContent()).trim());
  ok(errs.length === 0, "brak błędów strony " + JSON.stringify(errs));

  console.log(fails ? `Niezaliczone: ${fails}` : "Wszystkie testy zaliczone."); await b.close(); process.exit(fails ? 1 : 0);
});
