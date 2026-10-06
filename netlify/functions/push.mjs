// Przypomnienia: GET zwraca klucz publiczny, POST zapisuje subskrypcję push telefonu.
// Przy POST z confirm=true serwer od razu wysyła powiadomienie próbne.
import { getStore } from "@netlify/blobs";
import {
  STORE, DEFAULT_TZ, CONFIRM_MESSAGE,
  vapidKeys, validSubscription, validTimeZone, saveSubscription, sendPush,
} from "../lib/push.mjs";

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});

export async function handle(req, store, wp) {
  if (req.method === "GET") {
    const { publicKey } = await vapidKeys(store);
    return json({ publicKey });
  }
  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "Niepoprawne dane" }, 400); }
    if (!body || !validSubscription(body.subscription)) return json({ error: "Niepoprawna subskrypcja" }, 400);
    const tz = validTimeZone(body.tz) ? body.tz : DEFAULT_TZ;
    await saveSubscription(store, body.subscription, tz);
    if (body.confirm) {
      const r = await sendPush(store, body.subscription, CONFIRM_MESSAGE, wp);
      return json({ ok: true, confirmed: r.ok });
    }
    return json({ ok: true });
  }
  return json({ error: "Method not allowed" }, 405);
}

export default async (req) => handle(req, getStore(STORE));
