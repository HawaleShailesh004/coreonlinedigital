/**
 * Verifies that candidate Unsplash photo IDs actually resolve on the CDN.
 * Usage: node scripts/check-unsplash.mjs id1 id2 ...
 *        node scripts/check-unsplash.mjs --file ids.txt
 */
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
let ids = [];

if (args[0] === "--file") {
  ids = readFileSync(args[1], "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
} else {
  ids = args;
}

const CONCURRENCY = 8;
const results = [];

async function check(id) {
  const url = `https://images.unsplash.com/${id}?w=64&q=20`;
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    return { id, status: res.status, ok: res.ok };
  } catch (error) {
    return { id, status: 0, ok: false, error: String(error) };
  }
}

const queue = [...ids];
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) {
      const id = queue.shift();
      results.push(await check(id));
    }
  }),
);

const ok = results.filter((r) => r.ok);
const bad = results.filter((r) => !r.ok);

for (const r of ok) console.log(`OK    ${r.id}`);
for (const r of bad) console.log(`FAIL  ${r.status}  ${r.id}`);
console.log(`\n${ok.length}/${results.length} resolved`);
