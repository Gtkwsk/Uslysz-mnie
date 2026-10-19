// Testy PWA: kryteria instalacji (CDP), okienko instalacji (Android, iPhone, aplikacja zainstalowana),
// Użycie: node pwatest.js <katalog_repozytorium> <port> [katalog_na_zrzuty]  (z trzecim argumentem nadpisuje też public/screenshots/*.png)
// szybki start (Babel tylko przy pierwszym uruchomieniu), praca offline, subskrypcja push, zrzuty ekranu.
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs"), http = require("http"), path = require("path");
const [, , appDirArg, port, shotsDir] = process.argv;
const appDir = path.resolve(appDirArg);
const BASE = `http://localhost:${port}/`;
let extraComment = ""; // zmiana kodu aplikacji w locie (test unieważniania pamięci kompilacji)
const pushLog = [];
let pushGets = 0;
const FAKE_KEY = Buffer.concat([Buffer.from([4]), Buffer.alloc(64, 7)]).toString("base64url");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".md": "text/plain; charset=utf-8" };
const server = http.createServer((req, res) => {
  if (req.url.startsWith("/.netlify/functions/push")) {
    if (req.method === "GET") { pushGets++; res.writeHead(200, { "Content-Type": "application/json" }); return res.end(JSON.stringify({ publicKey: FAKE_KEY })); }
    let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => { pushLog.push(JSON.parse(b)); res.writeHead(200, { "Content-Type": "application/json" }); res.end('{"ok":true,"confirmed":true}'); });
    return;
  }
  let p = decodeURIComponent(req.url.split("?")[0]); if (p === "/") p = "/index.html";
  const f = path.join(appDir, "public", p);
  if (!f.startsWith(appDir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  let body = fs.readFileSync(f);
  if (p === "/index.html" && extraComment) body = Buffer.from(body.toString("utf8").replace('<script type="text/plain" id="app-src">', '<script type="text/plain" id="app-src">\n// ' + extraComment));
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); res.end(body);
});
const results = [];
const check = (cond, msg) => { results.push([!!cond, msg]); console.log(cond ? "  ✓" : "  ✗", msg); };

(async () => {
  await new Promise((r) => server.listen(+port, "127.0.0.1", r));
  const browser = await chromium.launch();
  const onbDone = () => localStorage.setItem("uslysz_mnie_onb", "done");
  try {
    // 1) Kryteria instalacji Chrome i pamięć kompilacji
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      await ctx.addInitScript(onbDone);
      const page = await ctx.newPage();
      const errors = []; page.on("pageerror", (e) => errors.push(String(e)));
      const babelReq = []; page.on("request", (r) => { if (r.url().includes("babel.min.js")) babelReq.push(r.url()); });
      await page.goto(BASE); await page.waitForSelector("text=Poziom 1", { timeout: 30000 });
      check(babelReq.length === 1, `1. uruchomienie: Babel pobrany (${babelReq.length}×), aplikacja działa`);
      await page.evaluate(() => navigator.serviceWorker.ready);
      await page.reload(); await page.waitForSelector("text=Poziom 1");
      const cdp = await ctx.newCDPSession(page);
      const inst = await cdp.send("Page.getInstallabilityErrors");
      check(inst.installabilityErrors.length === 0, `Chrome uznaje aplikację za instalowalną (błędy: ${JSON.stringify(inst.installabilityErrors)})`);
      const man = await cdp.send("Page.getAppManifest");
      check(!man.errors.length, `manifest bez błędów (${man.errors.map((e) => e.message).join("; ") || "brak"})`);
      check(babelReq.length === 1, `2. uruchomienie: Babel nie pobrany ponownie (łącznie ${babelReq.length}×)`);
      const keys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith("uslysz_mnie_build_")));
      check(keys.length === 1, `skompilowany kod w pamięci telefonu (${keys.length} wpis)`);
      // zmiana kodu: nowa kompilacja, stary wpis usunięty
      extraComment = "zmiana " + Date.now();
      await page.reload(); await page.waitForSelector("text=Poziom 1");
      const keys2 = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith("uslysz_mnie_build_")));
      check(babelReq.length === 2 && keys2.length === 1 && keys2[0] !== keys[0], `po zmianie kodu: nowa kompilacja i jeden wpis (${babelReq.length}× Babel)`);
      extraComment = "";
      // offline
      await page.reload(); await page.waitForSelector("text=Poziom 1");
      await ctx.setOffline(true);
      await page.reload();
      const offOk = await page.waitForSelector("text=Poziom 1", { timeout: 15000 }).then(() => true).catch(() => false);
      check(offOk, "bez internetu: aplikacja startuje z pamięci (service worker + skompilowany kod)");
      await ctx.setOffline(false);
      check(errors.length === 0, `brak błędów strony (${errors.join(" | ") || "0"})`);
      await ctx.close();
    }
    // 2) Okienko instalacji: Android/Chrome (zdarzenie beforeinstallprompt)
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 },
        userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36" });
      await ctx.addInitScript(onbDone);
      const page = await ctx.newPage();
      await page.goto(BASE); await page.waitForSelector("text=Poziom 1");
      await page.evaluate(() => { const e = new Event("beforeinstallprompt"); e.prompt = () => { window.__prompted = true; }; e.userChoice = Promise.resolve({ outcome: "accepted" }); window.dispatchEvent(e); });
      const sheet = await page.waitForSelector(".inst-sheet", { timeout: 5000 }).then(() => true).catch(() => false);
      check(sheet, "Android: po uruchomieniu pojawia się okienko „Zainstaluj Usłysz Mnie”");
      if (shotsDir) { await page.waitForTimeout(600); await page.screenshot({ path: path.join(shotsDir, "okienko-android.png") }); }
      await page.click("button.inst-yes");
      const prompted = await page.evaluate(() => window.__prompted === true);
      await page.waitForTimeout(300);
      check(prompted && !(await page.$(".inst-sheet")), "Android: „Zainstaluj” otwiera systemowe okno instalacji, okienko znika");
      // Nie teraz: znika i nie wraca przez 3 dni
      await page.reload(); await page.waitForSelector("text=Poziom 1");
      await page.evaluate(() => { const e = new Event("beforeinstallprompt"); e.prompt = () => {}; e.userChoice = Promise.resolve({ outcome: "dismissed" }); window.dispatchEvent(e); });
      await page.waitForSelector(".inst-sheet"); await page.click("button.inst-later");
      await page.reload(); await page.waitForSelector("text=Poziom 1");
      await page.evaluate(() => { const e = new Event("beforeinstallprompt"); e.prompt = () => {}; e.userChoice = Promise.resolve({ outcome: "dismissed" }); window.dispatchEvent(e); });
      await page.waitForTimeout(1800);
      check(!(await page.$(".inst-sheet")), "„Nie teraz”: okienko nie wraca przy kolejnym uruchomieniu (przerwa 3 dni)");
      // Raz na uruchomienie: zignorowane okienko nie wraca po powrocie ze scenki do menu
      await page.evaluate(() => localStorage.removeItem("uslysz_mnie_install"));
      await page.reload(); await page.waitForSelector("text=Poziom 1");
      await page.evaluate(() => { const e = new Event("beforeinstallprompt"); e.prompt = () => {}; e.userChoice = Promise.resolve({ outcome: "dismissed" }); window.dispatchEvent(e); });
      await page.waitForSelector(".inst-sheet");
      await page.click('button.lb:has-text("Poziom 1")'); await page.waitForSelector(".spt");
      await page.click("button.bb"); await page.waitForSelector("text=Poziom 1"); await page.waitForTimeout(1800);
      check(!(await page.$(".inst-sheet")), "raz na uruchomienie: po powrocie ze scenki do menu okienko się nie powtarza");
      await page.reload(); await page.waitForSelector("text=Poziom 1");
      await page.evaluate(() => { const e = new Event("beforeinstallprompt"); e.prompt = () => {}; e.userChoice = Promise.resolve({ outcome: "dismissed" }); window.dispatchEvent(e); });
      check(await page.waitForSelector(".inst-sheet", { timeout: 5000 }).then(() => true).catch(() => false), "kolejne uruchomienie: okienko pojawia się znowu");
      await ctx.close();
      // Komputer: Chrome też wysyła zdarzenie, ale okienko mówi o telefonie, więc go nie ma
      const dc = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      await dc.addInitScript(onbDone);
      const dp = await dc.newPage();
      await dp.goto(BASE); await dp.waitForSelector("text=Poziom 1");
      await dp.evaluate(() => { const e = new Event("beforeinstallprompt"); e.prompt = () => {}; e.userChoice = Promise.resolve({ outcome: "dismissed" }); window.dispatchEvent(e); });
      await dp.waitForTimeout(1800);
      check(!(await dp.$(".inst-sheet")), "komputer: bez okienka (instalacja z ikony w pasku adresu Chrome)");
      await dc.close();
    }
    // 3) iPhone (Safari): instrukcja zamiast przycisku
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1" });
      await ctx.addInitScript(onbDone);
      const page = await ctx.newPage();
      await page.goto(BASE); await page.waitForSelector("text=Poziom 1");
      const ok = await page.waitForSelector(".inst-sheet .inst-steps", { timeout: 5000 }).then(() => true).catch(() => false);
      const txt = ok ? await page.textContent(".inst-sheet") : "";
      check(ok && /Do ekranu początkowego/.test(txt), "iPhone: okienko z instrukcją „Udostępnij → Do ekranu początkowego”");
      if (shotsDir) { await page.waitForTimeout(600); await page.screenshot({ path: path.join(shotsDir, "okienko-iphone.png") }); }
      await page.click("button.inst-yes"); await page.reload(); await page.waitForSelector("text=Poziom 1"); await page.waitForTimeout(1800);
      check(!(await page.$(".inst-sheet")), "iPhone: po „Rozumiem” okienko nie wraca od razu");
      await ctx.close();
      for (const [name, ua] of [
        ["Facebook/Messenger", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/22F76 [FBAN/FBIOS;FBAV/505.0.0.39.106;FBBV/736431498;FBDV/iPhone15,2;FBMD/iPhone;FBSN/iOS;FBSV/18.5;FBSS/3;FBCR/;FBID/phone;FBLC/pl_PL;FBOP/80]"],
        ["Instagram", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 385.0.0.33.82 (iPhone15,2; iOS 18_5; pl_PL; pl; scale=3.00; 1179x2556; 742119836)"],
      ]) {
        const c = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, userAgent: ua });
        await c.addInitScript(onbDone);
        const pg = await c.newPage();
        await pg.goto(BASE); await pg.waitForSelector("text=Poziom 1"); await pg.waitForTimeout(1800);
        check(!(await pg.$(".inst-sheet")), `iPhone, przeglądarka wbudowana (${name}): bez okienka, bo tam nie da się dodać ikony`);
        await c.close();
      }
      const c = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/138.0.7204.156 Mobile/15E148 Safari/604.1" });
      await c.addInitScript(onbDone);
      const pg = await c.newPage();
      await pg.goto(BASE); await pg.waitForSelector("text=Poziom 1");
      check(await pg.waitForSelector(".inst-sheet .inst-steps", { timeout: 5000 }).then(() => true).catch(() => false), "iPhone, Chrome: okienko z instrukcją (od iOS 16.4 też tam działa)");
      await c.close();
    }
    // 4) Aplikacja już zainstalowana (tryb standalone): bez okienka; onboarding: bez okienka
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1" });
      await ctx.addInitScript(() => { localStorage.setItem("uslysz_mnie_onb", "done"); Object.defineProperty(navigator, "standalone", { get: () => true }); });
      const page = await ctx.newPage();
      await page.goto(BASE); await page.waitForSelector("text=Poziom 1"); await page.waitForTimeout(1800);
      check(!(await page.$(".inst-sheet")), "zainstalowana aplikacja: okienko się nie pokazuje");
      const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1" });
      const p2 = await ctx2.newPage();
      await p2.goto(BASE); await p2.waitForSelector(".onb-title"); await p2.waitForTimeout(1800);
      check(!(await p2.$(".inst-sheet")), "wprowadzenie dla nowej osoby: okienko nie przeszkadza");
      await ctx.close(); await ctx2.close();
    }
    // 5) Subskrypcja przypomnień (PushManager podstawiony, bo przeglądarka testowa nie ma serwera push)
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      await ctx.grantPermissions(["notifications"]);
      await ctx.addInitScript(() => {
        localStorage.setItem("uslysz_mnie_onb", "done");
        const fake = { endpoint: "https://fcm.googleapis.com/fcm/send/test-123", keys: { p256dh: "B" + "A".repeat(86), auth: "C".repeat(22) } };
        // subskrypcja przetrwa ponowne uruchomienie, jak w prawdziwym telefonie
        const mk = (bytes) => ({ endpoint: fake.endpoint, options: { applicationServerKey: bytes.buffer }, toJSON: () => fake,
          unsubscribe: async () => { localStorage.removeItem("__fakesub"); current = null; return true; } });
        const kept = localStorage.getItem("__fakesub");
        let current = kept ? mk(Uint8Array.from(JSON.parse(kept))) : null;
        PushManager.prototype.getSubscription = async () => current;
        PushManager.prototype.subscribe = async (opts) => { const b = new Uint8Array(opts.applicationServerKey); localStorage.setItem("__fakesub", JSON.stringify([...b])); current = mk(b); localStorage.setItem("__subscribed", String(+(localStorage.getItem("__subscribed") || 0) + 1)); return current; };
      });
      const page = await ctx.newPage();
      await page.goto(BASE); await page.waitForSelector("text=Poziom 1");
      const ok = await page.evaluate(() => requestNotifPermission());
      const last = pushLog[pushLog.length - 1] || {};
      check(ok === true && last.confirm === true && last.subscription && last.subscription.endpoint.includes("fcm.googleapis.com") && typeof last.tz === "string",
        `włączenie przypomnień: subskrypcja wysłana na serwer z potwierdzeniem i strefą (${last.tz})`);
      // ponowne uruchomienie tego samego dnia: bez zapytań do serwera
      await page.evaluate(() => localStorage.setItem("uslysz_mnie_notif", JSON.stringify({ asked: 1, enabled: true })));
      let before = pushLog.length, gets = pushGets;
      await page.reload(); await page.waitForSelector("text=Poziom 1"); await page.waitForTimeout(1500);
      check(pushLog.length === before && pushGets === gets, "drugie uruchomienie tego samego dnia: telefon nie odpytuje serwera");
      // następnego dnia: ciche odświeżenie tej samej subskrypcji, bez powiadomienia próbnego
      await page.evaluate(() => { const l = JSON.parse(localStorage.getItem("uslysz_mnie_push")); l.day = "Mon Jan 01 2001"; localStorage.setItem("uslysz_mnie_push", JSON.stringify(l)); });
      before = pushLog.length;
      await page.reload(); await page.waitForSelector("text=Poziom 1"); await page.waitForTimeout(1500);
      const last2 = pushLog[pushLog.length - 1] || {};
      const subs = await page.evaluate(() => +localStorage.getItem("__subscribed"));
      check(pushLog.length === before + 1 && last2.confirm === false && subs === 1, "następnego dnia: ciche odświeżenie tej samej subskrypcji, bez powiadomienia próbnego");
      // zmiana strefy czasowej (podróż): odświeżenie od razu, tego samego dnia
      await page.evaluate(() => { const l = JSON.parse(localStorage.getItem("uslysz_mnie_push")); l.tz = "America/New_York"; localStorage.setItem("uslysz_mnie_push", JSON.stringify(l)); });
      before = pushLog.length;
      await page.reload(); await page.waitForSelector("text=Poziom 1"); await page.waitForTimeout(1500);
      check(pushLog.length === before + 1, "inna strefa czasowa niż przy ostatnim zapisie: telefon od razu zgłasza nową");
      await ctx.close();
    }
    // 6) Zrzuty ekranu do okna instalacji (Android pokazuje je w oknie „Zainstaluj”)
    if (shotsDir) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
      await ctx.addInitScript(() => {
        localStorage.setItem("uslysz_mnie_onb", "done");
        localStorage.setItem("uslysz_mnie_install", String(Date.now()));
        localStorage.setItem("uslysz_mnie_v4", JSON.stringify({ lv: 1, stats: { t: 12, ts: 98, b: 10 }, lvGood: { 1: 6, 2: 0, 3: 0 }, tc: {}, usedIds: [], db: 2, streak: 4, lastDay: new Date().toISOString().slice(0, 10) }));
      });
      const page = await ctx.newPage();
      await page.goto(BASE); await page.waitForSelector("text=Poziom 1"); await page.waitForTimeout(1200);
      await page.screenshot({ path: path.join(appDir, "public/screenshots/start.png") });
      await page.click('button.lb:has-text("Poziom 1")'); await page.waitForSelector(".spt"); await page.waitForTimeout(2200);
      await page.screenshot({ path: path.join(appDir, "public/screenshots/scenka.png") });
      check(true, "zrzuty ekranu zapisane (start, scenka)");
      await ctx.close();
    }
  } finally {
    await browser.close(); server.close();
    const bad = results.filter(([ok]) => !ok).length;
    console.log(bad ? `\n${bad} test(ów) nie przeszło` : `\nWszystkie testy (${results.length}) zaliczone.`);
    process.exitCode = bad ? 1 : 0;
  }
})().catch((e) => { console.error(e); process.exit(1); });
