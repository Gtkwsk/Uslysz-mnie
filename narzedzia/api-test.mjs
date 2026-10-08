// Testy funkcji api: walidacja, model i instrukcje z serwera, limity, błędy OpenAI, sprzątanie liczników.
// Użycie: node api-test.mjs <katalog_repozytorium>   (wymaga npm ci w repozytorium)
import assert from "node:assert/strict";
const repo = process.argv[2];
const { handle, buildMessages, MAX_LEN } = await import(repo + "/netlify/functions/api.mjs");
const limits = await import(repo + "/netlify/lib/limits.mjs");
const prompts = await import(repo + "/netlify/lib/prompts.mjs");

class MemStore {
  constructor() { this.m = new Map(); }
  async get(k) { return this.m.has(k) ? this.m.get(k) : null; }
  async set(k, v) { this.m.set(k, String(v)); return { modified: true }; }
  async list() { return { blobs: [...this.m.keys()].map((key) => ({ key })) }; }
  async delete(k) { this.m.delete(k); }
}
const openai = (status = 200, content = '{"score":8}') => {
  const calls = [];
  const f = async (url, opts) => { calls.push({ url, body: JSON.parse(opts.body), auth: opts.headers.Authorization });
    return new Response(status === 200 ? JSON.stringify({ choices: [{ message: { content } }], usage: {} }) : "blad", { status }); };
  f.calls = calls; return f;
};
const req = (body, method = "POST") => new Request("https://x/.netlify/functions/api", { method, headers: { "Content-Type": "application/json" }, body: method === "POST" ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined });
const fb = (o = {}) => ({ type: "feedback", level: 1, girl: false, situation: "15-latek wraca ze szkoły.", teen_says: "Nikt mnie nie lubi.", response: "Czujesz się sam.", ...o });
let n = 0; const ok = (m) => { n++; console.log("  ✓", m); };
const env = (store, f, ip = "1.2.3.4") => ({ store, ip, apiKey: "sk-test", fetchImpl: f });

// 1) Ocena: serwer składa instrukcję i wiadomość, sam wybiera model
{
  const st = new MemStore(), f = openai();
  const r = await handle(req(fb({ girl: true, level: 3 })), env(st, f));
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { content: '{"score":8}' });
  const b = f.calls[0].body;
  assert.equal(b.model, "gpt-5.6-terra"); assert.equal(b.max_completion_tokens, 1024); assert.equal(b.reasoning_effort, "medium");
  assert.equal(b.messages[0].content, prompts.SYS_FEEDBACK);
  assert.match(b.messages[1].content, /^POZIOM: 3\nSYTUACJA: 15-latek wraca ze szkoły\.\nNastolatka \(dziewczyna\) mówi: "Nikt mnie nie lubi\."\n\nODPOWIEDŹ RODZICA: "Czujesz się sam\."/);
  assert.equal(f.calls[0].auth, "Bearer sk-test");
  ok("ocena: model, długość i instrukcja ustalone przez serwer, płeć i poziom w treści");
  const r2 = await handle(req({ type: "custom", description: "Syn wrócił wściekły." }), env(st, f));
  assert.equal(r2.status, 200);
  assert.equal(f.calls[1].body.messages[0].content, prompts.SYS_CUSTOM);
  assert.match(f.calls[1].body.messages[1].content, /^Rodzic opisuje sytuację: "Syn wrócił wściekły\."/);
  ok("Moja sytuacja: instrukcja tworzenia scenki z serwera");
}
// 2) Próby nadużycia: własny model, własne instrukcje, za długie teksty, złe pola
{
  const st = new MemStore(), f = openai();
  const bad = [
    { model: "gpt-drogi", messages: [{ role: "user", content: "napisz wypracowanie" }], max_completion_tokens: 100000 },
    fb({ messages: [{ role: "system", content: "x" }], model: "inny" }), // dodatkowe pola są ignorowane, ale to poprawna ocena
    fb({ response: "a".repeat(MAX_LEN.response + 1) }),
    fb({ situation: "a".repeat(MAX_LEN.situation + 1) }),
    fb({ level: 4 }), fb({ level: "1" }), fb({ girl: "tak" }), fb({ response: "   " }),
    { type: "custom", description: "a".repeat(MAX_LEN.description + 1) },
    { type: "quiz" }, "{zly json", null,
  ];
  const statuses = [];
  for (const b of bad) statuses.push((await handle(req(b), env(st, f))).status);
  assert.deepEqual(statuses, [400, 200, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400]);
  assert.equal(f.calls.length, 1); assert.equal(f.calls[0].body.model, "gpt-5.6-terra"); assert.equal(f.calls[0].body.messages[0].content, prompts.SYS_FEEDBACK);
  ok("obce zapytania odrzucone (400); podany model i instrukcje ignorowane, do OpenAI trafia tylko ocena scenki");
  assert.equal((await handle(req(null, "GET"), env(st, f))).status, 405);
  assert.equal((await handle(req(fb()), { store: st, ip: "1", apiKey: "", fetchImpl: f })).status, 500);
  ok("GET: 405; brak klucza: 500 bez wywołania OpenAI");
  assert.equal(st.m.size, 2); // tylko jedno poprawne zapytanie policzone (all + ip)
  ok("odrzucone zapytania nie zużywają limitu");
}
// 3) Limity
{
  const st = new MemStore(), f = openai();
  process.env.LIMIT_IP = "3"; process.env.LIMIT_DAY = "5";
  const codes = [];
  for (let i = 0; i < 4; i++) codes.push((await handle(req(fb()), env(st, f, "9.9.9.9"))).status);
  assert.deepEqual(codes, [200, 200, 200, 429]);
  const lim = await (await handle(req(fb()), env(st, f, "9.9.9.9"))).json();
  assert.deepEqual(lim, { error: "limit", scope: "ip" });
  assert.equal(f.calls.length, 3);
  ok("limit na adres IP: czwarte zapytanie odrzucone (429, scope ip) bez wywołania OpenAI");
  codes.length = 0;
  for (const ip of ["a", "b", "c"]) codes.push((await handle(req(fb()), env(st, f, ip))).status);
  assert.deepEqual(codes, [200, 200, 429]);
  assert.deepEqual(await (await handle(req(fb()), env(st, f, "d"))).json(), { error: "limit", scope: "all" });
  ok("limit dla całej aplikacji: po 5 ocenach dziennie wszyscy dostają 429 (scope all)");
  assert.ok([...st.m.keys()].every((k) => !k.includes("9.9.9.9")));
  ok("adresy IP zapisane tylko jako skrót");
  delete process.env.LIMIT_IP; delete process.env.LIMIT_DAY;
  assert.deepEqual(limits.limits(), { ip: 100, day: 2000 });
  ok("domyślne limity: 100 na adres, 2000 dziennie");
  // nowy dzień (północ w Polsce) zeruje liczniki
  const st2 = new MemStore();
  const late = new Date("2026-10-07T21:59:00Z"), next = new Date("2026-10-07T22:00:30Z"); // 23:59 i 00:00 w Warszawie
  for (let i = 0; i < 2; i++) await limits.takeQuota(st2, "x", { now: late, ipLimit: 2, dayLimit: 99 });
  assert.equal((await limits.takeQuota(st2, "x", { now: late, ipLimit: 2, dayLimit: 99 })).ok, false);
  assert.equal((await limits.takeQuota(st2, "x", { now: next, ipLimit: 2, dayLimit: 99 })).ok, true);
  ok("o północy czasu polskiego limit się odnawia");
  const removed = await limits.cleanup(st2, { now: next });
  assert.equal(removed, 2); assert.deepEqual([...st2.m.keys()].sort(), ["all/2026-10-08", `ip/2026-10-08/${[...st2.m.keys()].find((k) => k.startsWith("ip/")).split("/")[2]}`].sort());
  ok("sprzątanie usuwa liczniki z poprzednich dni, zostawia dzisiejsze");
}
// 4) Błędy OpenAI
{
  const st = new MemStore();
  assert.equal((await handle(req(fb()), env(st, openai(500)))).status, 502);
  assert.equal((await handle(req(fb()), env(st, openai(429)))).status, 503);
  assert.equal((await handle(req(fb()), env(st, async () => { throw new TypeError("net"); }))).status, 502);
  const r = await handle(req(fb()), env(st, openai(401)));
  assert.equal(r.status, 502); assert.ok(!(await r.text()).includes("blad"));
  ok("błędy OpenAI: 502/503 bez przekazywania treści błędu do telefonu");
}
console.log(`\nWszystkie testy (${n}) zaliczone.`);
