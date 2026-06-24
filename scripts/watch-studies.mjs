#!/usr/bin/env node
/**
 * watch-studies.mjs
 * Watches the manual-source pages (fiscal-cost studies, population estimates) and
 * flags when a page changes — your signal that a NEW study may be out and a number
 * needs a human review. It does NOT auto-edit any figure; contested numbers stay
 * human-reviewed on purpose.
 *
 * How it works: fetches each page, strips volatile noise, hashes the text, and
 * compares to scripts/.watch-state.json. Anything changed is printed and the run
 * exits non-zero so a GitHub Action can email/notify you.
 *
 * Run:  node scripts/watch-studies.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_PATH = join(__dirname, ".watch-state.json");

const WATCHLIST = [
  { id: "FAIR_fiscal", url: "https://www.fairus.org/issue/publications-resources/fiscal-burden-illegal-immigration-united-states-taxpayers-2023" },
  { id: "AEI_fiscal",  url: "https://www.aei.org/research-products/report/the-fiscal-impact-of-immigration-an-update/" },
  { id: "Cato_fiscal", url: "https://www.cato.org/white-paper/immigrants-recent-effects-government-budgets-1994-2023" },
  { id: "Pew_unauth",  url: "https://www.pewresearch.org/topic/immigration-migration/immigration-issues/unauthorized-immigration/" },
];

function normalize(html) {
  // crude text extraction + collapse whitespace so trivial markup churn is ignored
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200000);
}

async function loadState() {
  try { return JSON.parse(await readFile(STATE_PATH, "utf8")); }
  catch { return {}; }
}

async function main() {
  const state = await loadState();
  const changed = [];

  for (const item of WATCHLIST) {
    try {
      const res = await fetch(item.url, { headers: { "User-Agent": "real-cost-clock-watcher/1.0" }, redirect: "follow" });
      if (!res.ok) { console.error(`  ! ${item.id}: HTTP ${res.status} — skipped`); continue; }
      const html = await res.text();
      const hash = createHash("sha256").update(normalize(html)).digest("hex").slice(0, 16);
      if (state[item.id] && state[item.id] !== hash) {
        changed.push(item);
        console.log(`  CHANGED: ${item.id} -> review ${item.url}`);
      } else if (!state[item.id]) {
        console.log(`  baseline saved: ${item.id}`);
      } else {
        console.log(`  unchanged: ${item.id}`);
      }
      state[item.id] = hash;
    } catch (err) {
      console.error(`  ! ${item.id}: ${err.message} — skipped`);
    }
  }

  await writeFile(STATE_PATH, JSON.stringify(state, null, 2) + "\n", "utf8");

  if (changed.length) {
    console.log(`\n${changed.length} source page(s) changed — a new study may be out. Review and update data.json.`);
    process.exit(2); // non-zero signals the GitHub Action to notify you
  }
  console.log("\nNo source changes detected.");
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
