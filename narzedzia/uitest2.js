// Test: "Moja sytuacja" (płeć od AI i bez niej), Scenka Dnia, scenka próbna z onboardingu.
// Użycie: node uitest2.js <katalog_repozytorium> <port>
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const fs = require("fs"), http = require("http"), path = require("path");
const [, , appDirArg, port] = process.argv;
const appDir = path.resolve(appDirArg);
let customReply = null;
const bodies = [];
const FB = JSON.stringify({ choices: [{ message: { content: JSON.stringify({ score: 8, teen_reaction: "R.", what_works: "T.", watch_out: "T.", reflection_question: "T?", suggestions: { warm: "E.", naming: "N.", best: "" }, trap_detected: null, perfect_note: null }) } }] });
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/.netlify/functions/api") {
    let b = ""; req.on("data", c => b += c);
    req.on("end", async () => {
      const { buildMessages } = await import(require("url").pathToFileURL(path.join(appDir, "netlify/functions/api.mjs")).href);
      const messages = buildMessages(JSON.parse(b));
      if (!messages) { bodies.push({ messages: [{}, { content: "BŁĘDNE ZAPYTANIE" }] }); res.writeHead(400); return res.end("{}"); }
      const j = { messages }; bodies.push(j);
      const isCustom = j.messages[0].content.startsWith("Rodzic opisuje sytuację");
      const body = isCustom ? JSON.stringify({ content: JSON.stringify(customReply) }) : JSON.stringify({ content: JSON.parse(FB).choices[0].message.content });
      setTimeout(() => { res.writeHead(200, { "Content-Type": "application/json" }); res.end(body); }, isCustom ? 200 : 2500);
    });
    return;
  }
  let p = req.url.split("?")[0]; if (p === "/") p = "/index.html";
  const f = path.join(appDir, "public", decodeURIComponent(p));
  if (!f.startsWith(appDir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": f.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});
const promptLine = () => bodies[bodies.length - 1].messages[1].content.split("\n").find(l => /mówi:/.test(l)).replace(/: ".*/, ":");
(async () => {
  await new Promise(r => server.listen(+port, "127.0.0.1", r));
  const browser = await chromium.launch();
  const errors = [];
  const newPage = async onb => {
    const ctx = await browser.newContext();
    if (onb) await ctx.addInitScript(() => localStorage.setItem("uslysz_mnie_onb", "done"));
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${port}/`);
    return page;
  };
  try {
    // Moja sytuacja: AI zwraca sex / nie zwraca sex
    for (const reply of [
      { level: 2, sex: "f", situation: "Mama opisuje: córka wraca ze szkoły zapłakana.", teen_says: "Nie chcę o tym gadać." },
      { level: 2, situation: "16-latek wraca z treningu i trzaska drzwiami.", teen_says: "Daj mi spokój." },
      { level: 2, situation: "Wieczór. 15-latka siedzi w kuchni.", teen_says: "Nikt mnie nie rozumie." },
    ]) {
      customReply = reply;
      const page = await newPage(true);
      await page.click("text=Moja sytuacja");
      await page.fill("textarea.ta", "Opis testowy");
      await page.click("text=Stwórz scenkę");
      await page.waitForSelector(".spt");
      await page.fill("textarea.ta", "Odpowiedź");
      await page.click("button.snb");
      const label = await (await page.waitForSelector(".ml-label")).textContent();
      await page.waitForSelector(".teen-react .teen-name", { timeout: 20000 });
      console.log(`Moja sytuacja (sex=${reply.sex ?? "brak"}, „${reply.situation.slice(0, 22)}…”): „${label}” | dymek „${await page.textContent(".teen-react .teen-name")}” | prompt: ${promptLine()}`);
      await page.context().close();
    }
    // Scenka Dnia
    {
      const page = await newPage(true);
      const preview = await page.textContent(".dotd-preview");
      await page.click(".dotd-card");
      await page.waitForSelector(".spt");
      const says = await page.textContent(".spt");
      await page.fill("textarea.ta", "Odpowiedź");
      await page.click("button.snb");
      const label = await (await page.waitForSelector(".ml-label")).textContent();
      await page.waitForSelector(".teen-react .teen-name", { timeout: 20000 });
      console.log(`Scenka Dnia: ${says.slice(0, 50)}… | „${label}” | dymek „${await page.textContent(".teen-react .teen-name")}” | prompt: ${promptLine()} | podgląd na starcie: ${preview.slice(0, 30)}…`);
      await page.context().close();
    }
    // Onboarding: scenka próbna
    {
      const page = await newPage(false);
      for (let i = 0; i < 3; i++) await page.click("button.bp");
      await page.waitForSelector(".onb-demo-card textarea");
      await page.fill(".onb-demo-card textarea", "Odpowiedź");
      await page.click(".onb-demo-card button.snb");
      await page.waitForSelector(".onb-demo-result", { timeout: 20000 });
      console.log(`Onboarding: prompt: ${promptLine()}`);
      await page.context().close();
    }
  } finally {
    if (errors.length) console.log("BŁĘDY:", errors);
    await browser.close(); server.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
