// Test aplikacji: komunikat o limicie, ponawianie zapytań (najwyżej 2 próby), brak ponawiania przy limicie i złych danych.
// Użycie: node limittest.js <katalog_repozytorium> <port>
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs"), http = require("http"), path = require("path");
const [, , appDirArg, port] = process.argv;
const appDir = path.resolve(appDirArg);
const FBC = JSON.stringify({ score: 8, teen_reaction: "R.", what_works: "T.", watch_out: "T.", reflection_question: "T?", suggestions: { warm: "E.", naming: "N.", best: "" }, trap_detected: null, perfect_note: null });
let plan = []; let hits = 0;
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/.netlify/functions/api") {
    let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => {
      hits++; const [status, body] = plan.shift() || [200, { content: FBC }];
      res.writeHead(status, { "Content-Type": "application/json" }); res.end(JSON.stringify(body));
    }); return;
  }
  let p = req.url.split("?")[0]; if (p === "/") p = "/index.html";
  const f = path.join(appDir, "public", p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": p.endsWith(".html") ? "text/html; charset=utf-8" : p.endsWith(".js") ? "text/javascript" : "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
let n = 0, fail = 0; const check = (c, m) => { if (c) { n++; console.log("  ✓", m); } else { fail++; console.log("  ✗", m); } };
server.listen(port, async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(() => { localStorage.setItem("uslysz_mnie_onb", "done"); localStorage.setItem("uslysz_mnie_install", String(Date.now())); });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${port}/`); await page.waitForSelector("text=Poziom 1");
  await page.click('button.lb:has-text("Poziom 1")'); await page.waitForSelector("textarea.ta");
  const send = async (scenario) => {
    plan = scenario; hits = 0;
    await page.fill("textarea.ta", "Czujesz się sam."); await page.click("button.snb");
    await page.waitForSelector(".err, .scr", { timeout: 20000 });
    const err = await page.$(".err") ? await page.textContent(".err p") : null;
    return { err, hits };
  };
  let r = await send([[429, { error: "limit", scope: "ip" }]]);
  check(r.hits === 1 && /limit ocen/.test(r.err) && /tego połączenia/.test(r.err), `limit na połączenie: komunikat, bez ponawiania (${r.hits} zapytanie) „${r.err}”`);
  await page.click(".err button");
  r = await send([[429, { error: "limit", scope: "all" }]]);
  check(r.hits === 1 && /Aplikacja wykorzystała/.test(r.err), `limit dla całej aplikacji: osobny komunikat „${r.err}”`);
  await page.click(".err button");
  r = await send([[400, { error: "Niepoprawne dane" }]]);
  check(r.hits === 1 && /Nie udało się uzyskać oceny/.test(r.err), "złe dane (400): bez ponawiania, zwykły komunikat błędu");
  await page.click(".err button");
  r = await send([[502, { error: "upstream" }], [502, { error: "upstream" }], [200, { content: FBC }]]);
  check(r.hits === 2 && r.err, `chwilowy błąd serwera dwa razy: najwyżej 2 próby (${r.hits}), potem komunikat`);
  await page.click(".err button");
  r = await send([[503, { error: "upstream" }], [200, { content: FBC }]]);
  check(r.hits === 2 && !r.err, "chwilowy błąd, potem sukces: ocena po drugiej próbie");
  const maxLen = await page.evaluate(() => [...document.querySelectorAll("textarea")].map((t) => t.maxLength));
  console.log(`\n${fail ? "BŁĘDY: " + fail : `Wszystkie testy (${n}) zaliczone.`}`);
  await browser.close(); server.close(); process.exit(fail ? 1 : 0);
});
