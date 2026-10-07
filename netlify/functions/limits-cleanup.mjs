// Codzienne sprzątanie liczników limitów AI z poprzednich dni.
import { getStore } from "@netlify/blobs";
import { STORE, cleanup } from "../lib/limits.mjs";

export default async () => {
  const removed = await cleanup(getStore({ name: STORE, consistency: "strong" }));
  console.log(`Limity: usunięte stare liczniki ${removed}`);
};

export const config = { schedule: "@daily" };
