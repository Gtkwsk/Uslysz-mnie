// Ikony aplikacji renderowane z emoji 👂 (Noto Color Emoji) w Chromium.
// Użycie: node icons.js <katalog_wyjściowy>   (np. public/icons)
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const out = process.argv[2];
const BG = "radial-gradient(circle at 50% 38%, #fffaf5 0%, #fbeee2 55%, #f3e1cf 100%)";
const variants = [
  { file: "icon-192.png", size: 192, emoji: 0.82 },
  { file: "icon-512.png", size: 512, emoji: 0.82 },
  { file: "icon-maskable-512.png", size: 512, emoji: 0.52 },
  { file: "apple-touch-icon.png", size: 180, emoji: 0.78 },
  { file: "favicon-32.png", size: 32, emoji: 0.92, transparent: true },
  { file: "badge-96.png", size: 96, emoji: 0.86, transparent: true, mono: true },
];
(async () => {
  const browser = await chromium.launch();
  for (const v of variants) {
    const page = await browser.newPage({ viewport: { width: v.size, height: v.size }, deviceScaleFactor: 1 });
    await page.setContent(`<html><body style="margin:0">
      <div id="i" style="width:${v.size}px;height:${v.size}px;display:flex;align-items:center;justify-content:center;background:${v.transparent ? "transparent" : BG}">
        <span style="font-family:'Noto Color Emoji';font-size:${Math.round(v.size * v.emoji * 0.82)}px;line-height:1;${v.mono ? "filter:brightness(0) invert(1);" : ""}transform:translateY(${Math.round(v.size * 0.02)}px)">👂</span>
      </div></body></html>`);
    await page.waitForTimeout(150);
    await page.locator("#i").screenshot({ path: `${out}/${v.file}`, omitBackground: !!v.transparent });
    await page.close();
    console.log("zapisano", v.file);
  }
  await browser.close();
})();
