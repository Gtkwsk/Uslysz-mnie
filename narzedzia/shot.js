const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs"), http = require("http"), path = require("path");
// Użycie: node shot.js <katalog_repozytorium> <katalog_na_zrzuty>
const root = path.resolve(process.argv[2] || ".") + "/public";
const out = path.resolve(process.argv[3] || "zrzuty"); fs.mkdirSync(out, { recursive: true });
const srv = http.createServer((q, r) => { let p = q.url.split("?")[0]; if (p === "/") p = "/index.html"; const f = path.join(root, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }); return fs.createReadStream(path.join(root, "404.html")).pipe(r); }
  r.writeHead(200, { "Content-Type": f.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream" }); fs.createReadStream(f).pipe(r); }).listen(8799, async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await pg.goto("http://localhost:8799/prywatnosc.html"); await pg.screenshot({ path: out + "/prywatnosc.png", fullPage: true });
  await pg.goto("http://localhost:8799/quiz.html"); await pg.waitForTimeout(800); await pg.screenshot({ path: out + "/quiz.png" });
  await pg.goto("http://localhost:8799/analiza/scenki.md"); await pg.screenshot({ path: out + "/404.png" });
  console.log("scrollWidth", await pg.evaluate(() => document.documentElement.scrollWidth));
  await b.close(); srv.close(); });
