#!/usr/bin/env node
/**
 * fetch-data.mjs
 * Auto-updates the "auto: true" figures in data.json from the World Bank API.
 * Manual figures (visas, estimates) are never touched — only a human edits those.
 *
 * Run locally:   node scripts/fetch-data.mjs
 * Run in CI:     called by .github/workflows/update-data.yml on a schedule
 *
 * No API key required. World Bank Indicators API is free and public.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "..", "data.json");

const WORLD_BANK_FEEDS = {
  remittances_us_outflow: { country: "USA", indicator: "BM.TRF.PWKR.CD.DT" },
  remittances_mexico_received: { country: "MEX", indicator: "BX.TRF.PWKR.CD.DT" },
};

async function getLatestWorldBank(country, indicator) {
  const thisYear = new Date().getFullYear();
  const from = thisYear - 6;
  const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=20&date=${from}:${thisYear}`;
  const res = await fetch(url, { headers: { "User-Agent": "real-cost-clock/1.0" } });
  if (!res.ok) throw new Error(`World Bank API ${res.status} for ${country}/${indicator}`);
  const body = await res.json();
  const rows = Array.isArray(body) ? body[1] : null;
  if (!rows || !rows.length) throw new Error(`No rows for ${country}/${indicator}`);
  const latest = rows.find((r) => r.value != null);
  if (!latest) throw new Error(`No non-null value for ${country}/${indicator}`);
  return { value: Number(latest.value), year: latest.date };
}

async function main() {
  const raw = await readFile(DATA_PATH, "utf8");
  const data = JSON.parse(raw);
  let changes = 0;

  for (const metric of data.metrics) {
    const feed = WORLD_BANK_FEEDS[metric.id];
    if (!feed) continue;
    try {
      const { value, year } = await getLatestWorldBank(feed.country, feed.indicator);
      if (metric.value !== value || metric.period !== year) {
        console.log(`  ${metric.id}: ${metric.value} (${metric.period}) -> ${value} (${year})`);
        metric.value = value;
        metric.period = year;
        changes++;
      } else {
        console.log(`  ${metric.id}: unchanged (${value}, ${year})`);
      }
    } catch (err) {
      console.error(`  ! ${metric.id} failed: ${err.message} — leaving existing value in place`);
    }
  }

  const usOut = data.metrics.find((m) => m.id === "remittances_us_outflow");
  const proj = data.metrics.find((m) => m.id === "remittance_projection");
  if (usOut && proj && proj.value !== usOut.value) {
    proj.value = usOut.value;
    changes++;
    console.log(`  remittance_projection: synced to ${usOut.value}`);
  }

  data.meta.lastFetched = new Date().toISOString().slice(0, 10);
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(changes ? `Done. ${changes} field(s) updated.` : "Done. No changes.");
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
