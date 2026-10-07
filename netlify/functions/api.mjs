// Ocena odpowiedzi rodzica i scenka z opisu („Moja sytuacja”) przez OpenAI.
// Telefon wysyła tylko dane; model, instrukcje i długość odpowiedzi ustala serwer,
// więc funkcja nie służy do niczego poza tymi dwoma zadaniami. Klucz: zmienna OPEN_API_KEY w Netlify.
import { getStore } from "@netlify/blobs";
import { STORE as LIMITS, takeQuota } from "../lib/limits.mjs";
import { SYS_FEEDBACK, SYS_CUSTOM, feedbackMsg, customMsg } from "../lib/prompts.mjs";

const MODEL = "gpt-5.6-terra";
const MAX_TOKENS = 1024;
const EFFORT = "medium";
export const MAX_LEN = { situation: 600, teen_says: 600, response: 1500, description: 1500 };

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const text = (v, max) => typeof v === "string" && v.trim().length > 0 && v.length <= max;

// Zwraca wiadomości dla modelu albo null, gdy dane są niepoprawne
export function buildMessages(body) {
  if (!body || typeof body !== "object") return null;
  if (body.type === "feedback") {
    const { level, girl, situation, teen_says, response } = body;
    if (![1, 2, 3].includes(level) || typeof girl !== "boolean") return null;
    if (!text(situation, MAX_LEN.situation) || !text(teen_says, MAX_LEN.teen_says) || !text(response, MAX_LEN.response)) return null;
    return [
      { role: "system", content: SYS_FEEDBACK },
      { role: "user", content: feedbackMsg({ level, girl, situation, teen_says, response }) },
    ];
  }
  if (body.type === "custom") {
    if (!text(body.description, MAX_LEN.description)) return null;
    return [
      { role: "system", content: SYS_CUSTOM },
      { role: "user", content: customMsg(body.description) },
    ];
  }
  return null;
}

export async function handle(req, { store, ip, apiKey, fetchImpl = fetch }) {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!apiKey) return json({ error: "API key not configured" }, 500);
  let body;
  try { body = await req.json(); } catch { return json({ error: "Niepoprawne dane" }, 400); }
  const messages = buildMessages(body);
  if (!messages) return json({ error: "Niepoprawne dane" }, 400);

  const quota = await takeQuota(store, ip);
  if (!quota.ok) return json({ error: "limit", scope: quota.scope }, 429);

  let r;
  try {
    r = await fetchImpl("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: MODEL, messages, max_completion_tokens: MAX_TOKENS, reasoning_effort: EFFORT }),
    });
  } catch {
    return json({ error: "upstream" }, 502);
  }
  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    console.log(`OpenAI ${r.status}: ${detail.slice(0, 300)}`);
    return json({ error: "upstream", status: r.status }, r.status === 429 ? 503 : 502);
  }
  const d = await r.json().catch(() => null);
  return json({ content: (d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "" });
}

export default async (req, context) => handle(req, {
  store: getStore({ name: LIMITS, consistency: "strong" }),
  ip: context && context.ip,
  apiKey: process.env.OPEN_API_KEY,
});
