// Test UI: rodzaj nastolatka na ekranie oczekiwania, w dymku reakcji, w podpowiedziach i w prompcie oceny.
// Użycie: node uitest.js <katalog_z_aplikacją> <port>
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs");
const http = require("http");
const path = require("path");
const vm = require("vm");

const [, , appDirArg, port] = process.argv;
const appDir = path.resolve(appDirArg);
const BASE = `http://127.0.0.1:${port}/`;

// Baza scenek prosto z index.html
const lines = fs.readFileSync(appDir + "/public/index.html", "utf8").split("\n");
const s = lines.findIndex(l => l.startsWith("const SCENARIOS_DB = ["));
const e = lines.findIndex((l, i) => i > s && l.startsWith("];"));
const DB = vm.runInNewContext("(" + lines.slice(s, e + 1).join("\n").replace(/^const SCENARIOS_DB = /, "").replace(/;\s*$/, "") + ")");
const LATKA_BOYS = new Set([29, 33, 51, 54, 55, 60, 65, 91]);
const girl = o => o.sex ? o.sex === "f" : (/\d+-latk(ę|ą|ce|i)\b/.test(o.ctx) || (/\d+-latka\b/.test(o.ctx) && !LATKA_BOYS.has(o.id)));

const FB = score => JSON.stringify({ choices: [{ message: { content: JSON.stringify({
  score, teen_reaction: "Reakcja testowa.", what_works: "Test.", watch_out: "Test.", reflection_question: "Test?",
  suggestions: { warm: "Echo testowe.", naming: "Nazwa testowa.", best: "Najlepsza testowa." }, trap_detected: score < 5 ? "Rada" : null, perfect_note: null,
}) } }] });

// Serwer statyczny + atrapa /.netlify/functions/api (odpowiedź po 6 s, wynik 3)
const bodies = [];
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json" };
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/.netlify/functions/api") {
    let b = ""; req.on("data", c => b += c);
    req.on("end", async () => {
      const { buildMessages } = await import(require("url").pathToFileURL(path.join(appDir, "netlify/functions/api.mjs")).href);
      const messages = buildMessages(JSON.parse(b)); bodies.push({ messages: messages || [{}, { content: "BŁĘDNE ZAPYTANIE" }] });
      setTimeout(() => { res.writeHead(messages ? 200 : 400, { "Content-Type": "application/json" }); res.end(JSON.stringify({ content: JSON.parse(FB(3)).choices[0].message.content })); }, 6000);
    });
    return;
  }
  let p = decodeURIComponent(req.url.split("?")[0]); if (p === "/") p = "/index.html";
  const f = path.join(appDir, "public", p);
  if (!f.startsWith(appDir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});

async function withPage(browser, saved, fn) {
  const ctx = await browser.newContext();
  const errors = [];
  await ctx.addInitScript(sv => {
    localStorage.setItem("uslysz_mnie_onb", "done");
    localStorage.setItem("uslysz_mnie_v4", JSON.stringify(sv));
  }, saved);
  const page = await ctx.newPage();
  page.on("pageerror", err => errors.push(String(err)));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(BASE);
  await page.waitForSelector("text=Poziom 1", { timeout: 30000 });
  try { return await fn(page); } finally { if (errors.length) console.log("  BŁĘDY KONSOLI:", errors); await ctx.close(); }
}

const savedFor = (lv, keepIds) => ({ lv, stats: { t: 0, ts: 0, b: 0 }, lvGood: { 1: 0, 2: 0, 3: 0 }, tc: {}, usedIds: DB.filter(o => !keepIds.includes(o.id)).map(o => o.id), db: 2, streak: 0, lastDay: null });

async function answerOne(page) {
  const says = (await page.textContent(".spt")).trim();
  const before = bodies.length;
  await page.fill("textarea.ta", "Testowa odpowiedź");
  await page.click("button.snb");
  const label = await (await page.waitForSelector(".ml-label")).textContent();
  const phases = new Set();
  for (let i = 0; i < 14; i++) { const t = await page.$(".ml-phase"); if (t) phases.add(await t.textContent().catch(() => "")); await page.waitForTimeout(500); }
  await page.waitForSelector(".teen-react .teen-name", { timeout: 20000 });
  const bubble = await page.textContent(".teen-react .teen-name");
  if (bodies.length !== before + 1) throw new Error("Brak zapytania do API");
  const msg = bodies[bodies.length - 1].messages[1].content;
  return { says, label, phases: [...phases].filter(Boolean), bubble, promptLine: msg.split("\n").find(l => /mówi:/.test(l)).replace(/: ".*/, ":") };
}

(async () => {
  await new Promise(r => server.listen(+port, "127.0.0.1", r));
  const browser = await chromium.launch();
  try {
    // 1) Pojedyncze scenki: chłopiec "N-latek", chłopiec w formie "prosi 15-latka", dziewczyna "N-latkę", dziewczyna "N-latka"
    for (const [lv, id] of [[1, 1], [2, 81], [3, 126], [1, 2]]) {
      const o = DB.find(x => x.id === id);
      const r = await withPage(browser, savedFor(lv, [id]), async page => {
        await page.click(`button.lb:has-text("Poziom ${lv}")`);
        await page.waitForSelector(".spt");
        return answerOne(page);
      });
      if (!r.says.includes(o.says.slice(0, 20))) throw new Error(`Wylosowano inną scenkę niż id ${id}: ${r.says}`);
      console.log(`id ${id} (${girl(o) ? "dziewczyna" : "chłopak"}): ekran oczekiwania „${r.label}” | fazy: ${r.phases.join(" / ")} | dymek: „${r.bubble}” | prompt: ${r.promptLine}`);
    }
    // 2) Podpowiedzi po 3 słabych odpowiedziach: same dziewczyny / sami chłopcy
    for (const g of [true, false]) {
      const keep = DB.filter(o => girl(o) === g).map(o => o.id);
      const hints = await withPage(browser, savedFor(3, keep), async page => {
        await page.click(`button.lb:has-text("Poziom 3")`);
        for (let k = 0; k < 3; k++) {
          await page.waitForSelector(".spt");
          await answerOne(page);
          await page.click("text=Następna sytuacja");
        }
        await page.waitForSelector(".rsb p");
        const says = (await page.textContent(".spt")).trim();
        const seen = [];
        for (const ch of "abcdefghijkl") { seen.push(await page.textContent(".rsb p")); await page.type("textarea.ta", ch); }
        seen.push(await page.textContent(".rsb p"));
        return { says, seen };
      });
      const sc = DB.find(o => hints.says.includes(o.says.slice(0, 25)));
      const distinct = [...new Set(hints.seen)];
      console.log(`podpowiedzi (${g ? "dziewczyny" : "chłopcy"}, scenka id ${sc ? sc.id : "?"}): ${hints.seen.length} odczytów przy pisaniu, ${distinct.length} różnych tekstów:`);
      distinct.forEach(h => console.log("   ", h));
    }

    // 3) Migracja: zapis sprzed zmiany bazy (bez pola db) -> lista użytych id wyzerowana, statystyki zostają
    {
      const old = { lv: 1, stats: { t: 5, ts: 40, b: 9 }, lvGood: { 1: 3, 2: 0, 3: 0 }, tc: {}, usedIds: DB.filter(o => o.id !== 1).map(o => o.id), streak: 0, lastDay: null };
      const r = await withPage(browser, old, async page => {
        await page.click(`button.lb:has-text("Poziom 1")`);
        await page.waitForSelector(".spt");
        const statT = await page.textContent(".stb .sn");
        const st = JSON.parse(await page.evaluate(() => localStorage.getItem("uslysz_mnie_v4")));
        return { statT, db: st.db, used: st.usedIds.length, stats: st.stats };
      });
      console.log(`migracja: licznik scenek na ekranie ${r.statT}, zapis db=${r.db}, usedIds po losowaniu=${r.used}, stats=${JSON.stringify(r.stats)}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
})().catch(err => { console.error(err); process.exit(1); });
