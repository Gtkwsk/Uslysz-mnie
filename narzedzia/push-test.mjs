// Testy funkcji przypomnień: magazyn w pamięci zamiast Netlify Blobs, atrapa i prawdziwy web-push.
// Użycie: node push-test.mjs <katalog_repozytorium>   (wymaga npm ci w repozytorium i polecenia openssl)
import assert from "node:assert/strict";
import https from "node:https";
import { readFileSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { createECDH, randomBytes } from "node:crypto";

const repo = process.argv[2];
const lib = await import(repo + "/netlify/lib/push.mjs");
const { handle } = await import(repo + "/netlify/functions/push.mjs");
const webpush = (await import(repo + "/node_modules/web-push/src/index.js")).default;

class MemStore {
  constructor() { this.m = new Map(); this.writes = 0; this.reads = 0; }
  async get(k, o) { this.reads++; const v = this.m.get(k); return v === undefined ? null : (o && o.type === "json" ? JSON.parse(v) : v); }
  async setJSON(k, v, o = {}) { if (o.onlyIfNew && this.m.has(k)) return { modified: false }; this.m.set(k, JSON.stringify(v)); this.writes++; return { modified: true, etag: "x" }; }
  async list({ prefix = "" } = {}) { return { blobs: [...this.m.keys()].filter((k) => k.startsWith(prefix)).map((key) => ({ key, etag: "x" })) }; }
  async delete(k) { this.m.delete(k); }
}
const fakeWp = (status = 201) => { const calls = []; return { calls, sendNotification: async (sub, payload, opts) => { calls.push({ sub, payload: JSON.parse(payload), opts }); if (status >= 300) { const e = new Error("x"); e.statusCode = status; throw e; } return { statusCode: status }; } }; };
const clientKeys = () => { const e = createECDH("prime256v1"); e.generateKeys(); return { p256dh: e.getPublicKey().toString("base64url"), auth: randomBytes(16).toString("base64url") }; };
const sub = (host = "fcm.googleapis.com", id = "abc") => ({ endpoint: `https://${host}/fcm/send/${id}`, keys: clientKeys() });
const req = (method, body) => new Request("https://x/.netlify/functions/push", { method, headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : (typeof body === "string" ? body : JSON.stringify(body)) });
let n = 0; const ok = (m) => { n++; console.log("  ✓", m); };

// 1) Klucze VAPID: generowane raz, potem te same
{
  lib.resetKeyCache(); const st = new MemStore();
  const r1 = await (await handle(req("GET"), st)).json();
  lib.resetKeyCache();
  const r2 = await (await handle(req("GET"), st)).json();
  assert.ok(r1.publicKey && r1.publicKey.length > 80); assert.equal(r1.publicKey, r2.publicKey);
  assert.equal(JSON.parse(st.m.get("vapid")).publicKey, r1.publicKey);
  ok("GET: klucz publiczny generowany raz i odczytywany ponownie");
  // wyścig: ktoś zapisał klucze wcześniej, nasz zapis z onlyIfNew przegrywa
  lib.resetKeyCache(); const st2 = new MemStore(); const theirs = webpush.generateVAPIDKeys();
  let first = true; const orig = st2.get.bind(st2);
  st2.get = async (k, o) => { if (k === "vapid" && first) { first = false; st2.m.set("vapid", JSON.stringify(theirs)); return null; } return orig(k, o); };
  const k = await lib.vapidKeys(st2); assert.equal(k.publicKey, theirs.publicKey);
  ok("wyścig przy pierwszym starcie: wygrywa wcześniejszy zapis kluczy");
}

// 2) POST: walidacja i zapis
{
  lib.resetKeyCache(); const st = new MemStore(); const wp = fakeWp();
  assert.equal((await handle(req("POST", "{zle"), st, wp)).status, 400);
  assert.equal((await handle(req("POST", { subscription: { endpoint: "https://evil.example.com/x", keys: clientKeys() } }), st, wp)).status, 400);
  assert.equal((await handle(req("POST", { subscription: { endpoint: "http://fcm.googleapis.com/x", keys: clientKeys() } }), st, wp)).status, 400);
  assert.equal((await handle(req("PUT", {}), st, wp)).status, 405);
  ok("POST: odrzuca zły JSON, obce serwery, http i złe metody");
  const s = sub();
  const r = await handle(req("POST", { subscription: s, tz: "Nie/Istnieje" }), st, wp);
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { ok: true }); assert.equal(wp.calls.length, 0);
  const rec = JSON.parse(st.m.get(lib.subKey(s.endpoint, "Europe/Warsaw")));
  assert.equal(rec.tz, "Europe/Warsaw"); assert.equal(rec.lastSent, null);
  assert.equal(JSON.parse(st.m.get(lib.idxKey(s.endpoint))).key, lib.subKey(s.endpoint, "Europe/Warsaw"));
  ok("POST bez potwierdzenia: zapis, zła strefa zamieniona na Europe/Warsaw, bez powiadomienia");
  const r2 = await handle(req("POST", { subscription: s, tz: "America/New_York", confirm: true }), st, wp);
  assert.deepEqual(await r2.json(), { ok: true, confirmed: true });
  assert.equal(wp.calls.length, 1); assert.equal(wp.calls[0].payload.body, lib.CONFIRM_MESSAGE.body);
  assert.equal(wp.calls[0].opts.vapidDetails.publicKey, JSON.parse(st.m.get("vapid")).publicKey);
  const moved = JSON.parse(st.m.get(lib.subKey(s.endpoint, "America/New_York")));
  assert.equal(moved.tz, "America/New_York"); assert.equal(moved.created, rec.created);
  assert.equal(st.m.has(lib.subKey(s.endpoint, "Europe/Warsaw")), false);
  assert.equal(JSON.parse(st.m.get(lib.idxKey(s.endpoint))).key, lib.subKey(s.endpoint, "America/New_York"));
  assert.equal([...st.m.keys()].filter((k) => k.startsWith("sub/")).length, 1);
  ok("POST z potwierdzeniem: powiadomienie próbne, przeniesienie do nowej strefy bez duplikatu");
  assert.equal(lib.tzOfKey(lib.subKey(s.endpoint, "America/Argentina/Buenos_Aires")), "America/Argentina/Buenos_Aires");
  assert.equal(lib.tzOfKey(lib.subKey(s.endpoint, "UTC")), "UTC");
  ok("strefa odczytywana z klucza (także wieloczłonowa i UTC)");
  for (const host of ["web.push.apple.com", "updates.push.services.mozilla.com", "wns2-par02p.notify.windows.com"]) {
    assert.equal((await handle(req("POST", { subscription: sub(host) }), st, wp)).status, 200);
  }
  ok("POST: akceptuje serwery Apple, Mozilli i Microsoftu");
}

// 3) Wysyłka o 20:00 w strefie użytkownika
{
  lib.resetKeyCache(); const st = new MemStore();
  const waw = sub("fcm.googleapis.com", "waw"), ny = sub("fcm.googleapis.com", "ny"), gone = sub("fcm.googleapis.com", "gone");
  await lib.saveSubscription(st, waw, "Europe/Warsaw");
  await lib.saveSubscription(st, ny, "America/New_York");
  await lib.saveSubscription(st, gone, "Europe/Warsaw");
  const wp = { calls: [], sendNotification: async (s, p) => { wp.calls.push(s.endpoint); if (s.endpoint.endsWith("gone")) { const e = new Error("x"); e.statusCode = 410; throw e; } } };
  const at = (iso) => ({ now: new Date(iso), wp });
  st.reads = 0;
  let r = await lib.runDaily(st, at("2026-10-06T17:00:00Z")); // Warszawa 19:00
  assert.deepEqual(r, { due: 0, sent: 0, removed: 0, failed: 0 }); assert.equal(st.reads, 0);
  ok("17:00 UTC (19:00 w Warszawie): nikt nie ma 20:00, żaden wpis nie jest czytany");
  r = await lib.runDaily(st, at("2026-10-06T18:00:00Z")); // Warszawa 20:00 (CEST), Nowy Jork 14:00
  assert.deepEqual(r, { due: 2, sent: 1, removed: 1, failed: 0 });
  assert.ok(wp.calls.some((e) => e.endsWith("/waw"))); assert.ok(!wp.calls.some((e) => e.endsWith("/ny")));
  assert.equal(st.m.has(lib.subKey(gone.endpoint, "Europe/Warsaw")), false); assert.equal(st.m.has(lib.idxKey(gone.endpoint)), false);
  ok("18:00 UTC (20:00 w Warszawie): wysyłka do Warszawy, wygasła subskrypcja usunięta");
  r = await lib.runDaily(st, at("2026-10-06T18:30:00Z"));
  assert.deepEqual(r, { due: 1, sent: 0, removed: 0, failed: 0 });
  ok("drugie uruchomienie w tej samej godzinie: bez duplikatu");
  r = await lib.runDaily(st, at("2026-10-07T00:00:00Z")); // Nowy Jork 20:00 (EDT)
  assert.deepEqual(r, { due: 1, sent: 1, removed: 0, failed: 0 });
  ok("00:00 UTC (20:00 w Nowym Jorku): wysyłka do Nowego Jorku");
  r = await lib.runDaily(st, at("2026-12-01T19:00:00Z")); // zima: Warszawa 20:00 (CET)
  assert.deepEqual(r, { due: 1, sent: 1, removed: 0, failed: 0 });
  ok("zima, 19:00 UTC (20:00 w Warszawie): zmiana czasu uwzględniona");
  const trip = sub("fcm.googleapis.com", "trip");
  await lib.saveSubscription(st, trip, "Europe/Warsaw");
  r = await lib.runDaily(st, at("2026-12-02T19:00:00Z")); // Warszawa 20:00
  assert.equal(r.sent, 2);
  await lib.saveSubscription(st, trip, "America/New_York"); // lot do Nowego Jorku tego samego dnia
  r = await lib.runDaily(st, at("2026-12-03T01:00:00Z")); // Nowy Jork 20:00, nadal 2 grudnia
  assert.deepEqual(r, { due: 2, sent: 1, removed: 0, failed: 0 }); // ny dostaje, trip już dziś dostał
  assert.equal(JSON.parse(st.m.get(lib.subKey(trip.endpoint, "America/New_York"))).lastSent, "2026-12-02");
  ok("zmiana strefy w podróży: data ostatniego przypomnienia przenosi się, bez drugiego tego samego dnia");
  const msg = lib.MESSAGES[lib.localNow(new Date("2026-10-06T18:00:00Z"), "Europe/Warsaw").weekday];
  assert.equal(msg.title, "🔥 Nie zgub serii!"); // wtorek
  ok("treść zależna od dnia tygodnia (wtorek: „Nie zgub serii!”)");
}

// 4) Prawdziwy web-push: szyfrowanie i nagłówki, wysłane do lokalnego serwera
{
  lib.resetKeyCache(); const st = new MemStore();
  const got = await new Promise((resolve) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    // Tymczasowy certyfikat samopodpisany (openssl), tylko do tego testu; nic nie trafia do repozytorium
    const dir = mkdtempSync(tmpdir() + "/pushtest-") + "/";
    execFileSync("openssl", ["req", "-x509", "-newkey", "ec", "-pkeyopt", "ec_paramgen_curve:prime256v1", "-nodes", "-keyout", dir + "tkey.pem", "-out", dir + "tcert.pem", "-subj", "/CN=127.0.0.1", "-days", "2"], { stdio: "ignore" });
    const srv = https.createServer({ key: readFileSync(dir + "tkey.pem"), cert: readFileSync(dir + "tcert.pem") }, (rq, rs) => { const ch = []; rq.on("data", (c) => ch.push(c)); rq.on("end", () => { rs.writeHead(201); rs.end(); srv.close(); resolve({ headers: rq.headers, body: Buffer.concat(ch) }); }); });
    srv.listen(0, "127.0.0.1", async () => {
      const s = { endpoint: `https://127.0.0.1:${srv.address().port}/push/1`, keys: clientKeys() };
      const r = await lib.sendPush(st, s, lib.CONFIRM_MESSAGE, webpush);
      if (!r.ok) { console.log("sendPush:", r); process.exit(1); }
    });
  });
  assert.equal(got.headers["content-encoding"], "aes128gcm");
  assert.match(got.headers.authorization, /^vapid t=.+, k=.+$/);
  assert.equal(got.headers.ttl, String(4 * 3600));
  assert.ok(got.body.length > 100);
  ok("web-push: zaszyfrowana treść (aes128gcm) i podpis VAPID w żądaniu");
}
console.log(`\nWszystkie testy (${n}) zaliczone.`);
