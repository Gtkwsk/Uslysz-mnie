// Dzienne limity zapytań do AI: na adres IP i dla całej aplikacji.
// Liczniki leżą w Netlify Blobs pod kluczami all/<dzień> i ip/<dzień>/<skrót IP>; adres IP nie jest zapisywany wprost.
// Liczniki z poprzednich dni usuwa codziennie funkcja limits-cleanup.
import { createHash } from "node:crypto";

export const STORE = "limity";
const TZ = "Europe/Warsaw"; // dzień liczony po polsku, od północy do północy

export const dayKey = (date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

const ipHash = (ip) => createHash("sha256").update("uslysz-mnie:" + ip).digest("hex").slice(0, 32);

// Hojny limit na adres, bo cała szkoła albo rodzina może wychodzić do internetu z jednego IP.
// Limit dla całej aplikacji wyznacza najwyższy możliwy koszt dnia. Oba można zmienić zmiennymi LIMIT_IP i LIMIT_DAY w Netlify.
export const limits = () => ({
  ip: Number(process.env.LIMIT_IP) || 40,
  day: Number(process.env.LIMIT_DAY) || 2000,
});

export async function takeQuota(store, ip, { now = new Date(), ipLimit = limits().ip, dayLimit = limits().day } = {}) {
  const day = dayKey(now);
  const allKey = `all/${day}`;
  const ipKey = `ip/${day}/${ipHash(ip || "nieznany")}`;
  const [all, mine] = (await Promise.all([store.get(allKey), store.get(ipKey)])).map((v) => Number(v) || 0);
  if (mine >= ipLimit) return { ok: false, scope: "ip" };
  if (all >= dayLimit) return { ok: false, scope: "all" };
  await Promise.all([store.set(allKey, String(all + 1)), store.set(ipKey, String(mine + 1))]);
  return { ok: true };
}

export async function cleanup(store, { now = new Date() } = {}) {
  const today = dayKey(now);
  const { blobs } = await store.list();
  let removed = 0;
  for (const { key } of blobs) {
    if (key.split("/")[1] !== today) { await store.delete(key); removed++; }
  }
  return removed;
}
