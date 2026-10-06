// Codzienne przypomnienie o Scence Dnia. Netlify uruchamia funkcję co godzinę;
// powiadomienie dostają osoby, u których właśnie wybiła 20:00 (każda strefa czasowa osobno).
import { getStore } from "@netlify/blobs";
import { STORE, runDaily } from "../lib/push.mjs";

export default async () => {
  const r = await runDaily(getStore(STORE));
  console.log(`Przypomnienia: sprawdzone ${r.due}, wysłane ${r.sent}, usunięte ${r.removed}, błędy ${r.failed}`);
};

export const config = { schedule: "@hourly" };
