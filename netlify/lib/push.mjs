// Przypomnienia o Scence Dnia: wspólny kod funkcji push (zapis subskrypcji) i push-daily (wysyłka).
// Klucze VAPID powstają przy pierwszym użyciu i leżą w Netlify Blobs, więc nie trzeba ich ustawiać ręcznie.
import webpush from "web-push";
import { createHash } from "node:crypto";

export const STORE = "przypomnienia";
export const HOUR = 20; // godzina przypomnienia w strefie czasowej użytkownika
export const DEFAULT_TZ = "Europe/Warsaw";
const SUBJECT = "https://uslyszmnie.netlify.app";

// Wysyłamy tylko do serwerów powiadomień przeglądarek (Chrome/Android, Firefox, Apple, Edge)
const PUSH_HOSTS = [
  /(^|\.)fcm\.googleapis\.com$/,
  /(^|\.)push\.services\.mozilla\.com$/,
  /(^|\.)push\.apple\.com$/,
  /(^|\.)notify\.windows\.com$/,
];

export const MESSAGES = [
  { title: "👂 Scenka Dnia czeka", body: "Jedna scenka, dwie minuty. Twoje dziecko poczuje różnicę." },
  { title: "👂 Usłysz Mnie", body: "Masz chwilę? Dzisiejsza scenka jest gotowa." },
  { title: "🔥 Nie zgub serii!", body: "Twoja codzienna scenka czeka. Wskakuj!" },
  { title: "👂 Dwie minuty empatii", body: "Wystarczą, żeby jutro zareagować inaczej." },
  { title: "💛 Pora na trening", body: "Jedno ćwiczenie dziennie zmienia nawyki." },
  { title: "👂 Twój nastolatek czeka", body: "Na kogoś, kto usłyszy. Ćwicz z nami." },
  { title: "🎯 Scenka Dnia", body: "Nowa sytuacja, nowa szansa. Jak odpowiesz?" },
];

export const CONFIRM_MESSAGE = {
  title: "👂 Usłysz Mnie",
  body: "Przypomnienia włączone. Do zobaczenia wieczorem przy Scence Dnia.",
};

export function validSubscription(sub) {
  if (!sub || typeof sub.endpoint !== "string" || sub.endpoint.length > 1000) return false;
  if (!sub.keys || typeof sub.keys.p256dh !== "string" || typeof sub.keys.auth !== "string") return false;
  if (sub.keys.p256dh.length > 200 || sub.keys.auth.length > 100) return false;
  let url;
  try { url = new URL(sub.endpoint); } catch { return false; }
  return url.protocol === "https:" && PUSH_HOSTS.some((re) => re.test(url.hostname));
}

export function validTimeZone(tz) {
  if (typeof tz !== "string" || tz.length > 64) return false;
  try { new Intl.DateTimeFormat("en-US", { timeZone: tz }); return true; } catch { return false; }
}

// Subskrypcja leży pod kluczem sub/<strefa czasowa>/<skrót adresu>, np. sub/Europe/Warsaw/3fa9…
// Dzięki temu funkcja godzinowa czyta tylko osoby, u których właśnie jest 20:00.
// Wskaźnik idx/<skrót> pamięta aktualny klucz, żeby po zmianie strefy nie zostawał duplikat.
const subId = (endpoint) => createHash("sha256").update(endpoint).digest("hex");
export const subKey = (endpoint, tz) => `sub/${tz}/${subId(endpoint)}`;
export const idxKey = (endpoint) => `idx/${subId(endpoint)}`;
export const tzOfKey = (key) => key.split("/").slice(1, -1).join("/");

let cachedKeys = null;

export async function vapidKeys(store, generate = () => webpush.generateVAPIDKeys()) {
  if (cachedKeys) return cachedKeys;
  const existing = await store.get("vapid", { type: "json" });
  if (existing && existing.publicKey && existing.privateKey) return (cachedKeys = existing);
  const fresh = generate();
  const res = await store.setJSON("vapid", fresh, { onlyIfNew: true });
  if (res && res.modified) return (cachedKeys = fresh);
  // Ktoś zapisał klucze chwilę wcześniej: czekamy, aż będą widoczne
  for (let i = 0; i < 6; i++) {
    const keys = await store.get("vapid", { type: "json" });
    if (keys && keys.publicKey && keys.privateKey) return (cachedKeys = keys);
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error("Brak kluczy VAPID w magazynie");
}

export function resetKeyCache() { cachedKeys = null; }

export async function sendPush(store, subscription, message, wp = webpush) {
  const keys = await vapidKeys(store);
  try {
    await wp.sendNotification(subscription, JSON.stringify(message), {
      TTL: 4 * 3600,
      urgency: "normal",
      vapidDetails: { subject: SUBJECT, publicKey: keys.publicKey, privateKey: keys.privateKey },
    });
    return { ok: true };
  } catch (e) {
    const status = e && e.statusCode;
    return { ok: false, status, gone: status === 404 || status === 410 };
  }
}

export async function saveSubscription(store, subscription, tz) {
  const key = subKey(subscription.endpoint, tz);
  const ik = idxKey(subscription.endpoint);
  const idx = await store.get(ik, { type: "json" });
  const prevKey = idx && idx.key;
  const old = prevKey ? await store.get(prevKey, { type: "json" }) : null;
  // Najpierw usunięcie starego wpisu: przerwa w pół drogi grozi najwyżej brakiem jednego przypomnienia, nie podwójnym
  if (prevKey && prevKey !== key) await store.delete(prevKey);
  await store.setJSON(key, {
    subscription,
    tz,
    created: (old && old.created) || new Date().toISOString(),
    lastSent: (old && old.lastSent) || null,
  });
  if (prevKey !== key) await store.setJSON(ik, { key });
  return key;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function localNow(date, tz) {
  const parts = {};
  for (const p of new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", hourCycle: "h23", weekday: "short",
  }).formatToParts(date)) parts[p.type] = p.value;
  return {
    day: `${parts.year}-${parts.month}-${parts.day}`,
    hour: Number(parts.hour),
    weekday: WEEKDAYS.indexOf(parts.weekday),
  };
}

async function removeSubscription(store, key, subscription) {
  await store.delete(key);
  const ik = idxKey(subscription.endpoint);
  const idx = await store.get(ik, { type: "json" });
  if (idx && idx.key === key) await store.delete(ik);
}

// Wysyła przypomnienie do wszystkich, u których właśnie jest godzina HOUR i którzy go dziś nie dostali.
// Strefa czasowa jest w kluczu, więc czytane są tylko wpisy z tych stref, gdzie wybiła ta godzina.
// Paczkami po 20 naraz, bo funkcja okresowa ma na całą pracę 30 sekund.
export async function runDaily(store, { now = new Date(), wp = webpush, hour = HOUR, batch = 20 } = {}) {
  const { blobs } = await store.list({ prefix: "sub/" });
  const zones = new Map();
  const timeIn = (tz) => {
    if (!zones.has(tz)) zones.set(tz, localNow(now, validTimeZone(tz) ? tz : DEFAULT_TZ));
    return zones.get(tz);
  };
  const due = blobs.map(({ key }) => key).filter((key) => timeIn(tzOfKey(key)).hour === hour);
  const result = { due: due.length, sent: 0, removed: 0, failed: 0 };
  const one = async (key) => {
    const t = timeIn(tzOfKey(key));
    const rec = await store.get(key, { type: "json" });
    if (!rec || !rec.subscription || rec.lastSent === t.day) return;
    const r = await sendPush(store, rec.subscription, MESSAGES[t.weekday % MESSAGES.length], wp);
    if (r.ok) { await store.setJSON(key, { ...rec, lastSent: t.day }); result.sent++; }
    else if (r.gone) { await removeSubscription(store, key, rec.subscription); result.removed++; }
    else result.failed++;
  };
  for (let i = 0; i < due.length; i += batch) {
    await Promise.all(due.slice(i, i + batch).map((key) => one(key).catch(() => { result.failed++; })));
  }
  return result;
}
