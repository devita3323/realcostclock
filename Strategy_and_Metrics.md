# The Real Cost Clock — Strategy & Metrics Plan

*A Debt-Clock-style transparency site for U.S. immigration and guest-worker policy.*
*Working title options: "The Real Cost Clock," "American Ledger," "The Policy Cost Counter."*

---

## 1. The core strategic decision (read this first)

The Debt Clock works for one reason: **the number is undisputed.** The U.S. Treasury publishes the national debt to the penny, so no critic can wave it away. The clock's power is credibility, not anger.

If you want a site that moves politicians, persuades skeptics, **and** rallies a base — the three goals you ranked — every number on the page has to survive a hostile fact-checker. The moment one counter is exposed as made-up, the press discredits the entire site and your real numbers die with the fake one. Credibility is therefore the *foundation* the other two goals stand on, not a competing priority.

This plan splits every proposed metric into three tiers:

- **Tier 1 — Hard counters.** Published by the federal government, defensible to the decimal. These are your Treasury-debt equivalent. Build the site around them.
- **Tier 2 — Labeled estimates.** Real, researched figures from named institutions, shown *with* the source and the word "estimate" visible. Honest and powerful — but never disguised as hard counts.
- **Tier 3 — Do not put a live counter on these.** Things that cannot be measured, only guessed. Putting a fake-precise number here is what gets the whole project dismissed.

---

## 2. What the framing should be

Drop "Stolen Dreams" / "Stolen" as the headline. Here's the tactical reason, not a moral one: "stolen" asserts that every visa and every dollar is a one-to-one theft from a specific American. That's a causal claim the data does **not** support (economists dispute it across the spectrum), so it hands opponents a free win in the first sentence and makes the site easy to label "misinformation."

A framing that keeps the emotional punch but can't be debunked:

> **"What current policy costs you — counted from the government's own numbers."**

The anger comes from the *size of the real numbers* and from making them clickable back to .gov sources. Let the citizen do the outrage; you just supply the receipts. This is *more* persuasive to a skeptic, not less.

---

## 3. The metrics — tiered

### Tier 1 — Hard counters (build the site on these)

| Metric | Latest figure | Source |
|---|---|---|
| H-1B cap registrations / selected per year | 470,342 registrations; ~135,000 selected (FY2025) | USCIS H-1B Registration Statistics |
| H-1B petitions approved per year (new + renewal) | ~400,000 approved (FY2024); ~142,000 *new* | USCIS FY2024 H-1B Report to Congress |
| H-2A agricultural positions certified | ~384,000 positions (FY2024) | DOL OFLC H-2A Selected Statistics FY2024 |
| H-2B non-ag positions certified | ~233,000 positions (FY2024) | DOL OFLC H-2B Statistical Factsheet FY2024 |
| U.S. remittance outflow (money sent abroad) | ~$103 billion sent from U.S. (2024) | World Bank / IOM World Migration Report |
| Remittances received by Mexico from all sources | ~$68 billion (2024) | World Bank / Banco de México |

These are the spine of the site. Each gets a live or annual counter and a "Source ↗" link.

### Tier 2 — Labeled estimates (show, but mark clearly)

| Metric | Estimate | Source & caveat |
|---|---|---|
| Unauthorized immigrant population | ~14 million (mid-2023) | Pew Research / DHS. **Estimate** — methods vary ±2M. |
| Unauthorized workers in the labor force | ~8.3 million (~75% of the population) | Pew / CMS. **Estimate.** |
| Net fiscal cost of illegal immigration | ~$150.7 billion/year (gross minus taxes paid) | **FAIR (an advocacy org).** Label it as such; note CBO/Cato produce *lower* or net-positive estimates. Showing the range is what makes you credible. |
| Federal/state/local taxes paid *by* unauthorized immigrants | ~$31–32 billion/year | FAIR / ITEP. Include this — leaving it out is the #1 thing critics attack. |

**Critical credibility rule:** for the fiscal-cost number, show a *range* with at least two sources that disagree (e.g., FAIR high-end vs. Cato/CBO low-end). A single advocacy number presented as fact is the easiest thing in the world to discredit. A transparent range is nearly impossible to attack.

### Tier 3 — Do NOT build live counters on these

- **"All illegal immigrants working under the table."** Off-the-books labor is by definition unrecorded. Any live ticking number here is fabricated and will be called out instantly.
- **"Lost taxable wages / lost property taxes from Americans."** This assumes every foreign worker displaced a specific American one-to-one, which is the exact disputed causal claim economists reject. You can *discuss* wage-competition research, but you cannot put a live dollar counter on it.
- **Naming specific companies or individuals as "abusers."** USCIS *does* publish an H-1B Employer Data Hub (top sponsors are public — Amazon, Cognizant, Infosys, etc.), so you may show *who sponsors the most visas* as a neutral, sourced fact. But framing a specific private business as a criminal "abuser" creates real legal exposure (defamation) and I'd steer you hard away from it. "Top sponsors, ranked, from USCIS data" = fine. "These companies are stealing from you" = lawsuit bait.

---

## 4. What you actually need to build it

**Data layer (the hard part, and the part that earns trust):**
- A small set of source datasets, refreshed on each agency's real cadence (USCIS quarterly, DOL OFLC quarterly, World Bank annually). These do **not** tick by the second — and you should *say so*. An honest "FY2024 figure, updates each fiscal year" beats a fake live ticker.
- For the genuinely continuous feel, you can animate counters that *accrue* against a published annual rate (e.g., "remittances leaving the U.S. this year, at the 2024 rate of $103B/yr" — clearly labeled "projected at last year's rate").

**Tech (lightweight is fine):**
- A single static site (HTML/JS) is enough for a prototype and even for launch. The prototype accompanying this doc is exactly this.
- If you want auto-updating data later: a tiny backend or scheduled job that pulls the agency CSVs and writes a `data.json`. Supabase or a simple cron + static host both work.

**Trust infrastructure (non-negotiable for your goals):**
- Every number links to its primary .gov source.
- A visible "Methodology" page explaining each figure, each source, and each estimate's uncertainty.
- A "Last updated" date on every counter.

---

## 5. How it impacts each audience

- **Skeptics & press:** they can't dismiss what they can click through to USCIS.gov. The labeled ranges signal honesty, which is what flips a fact-checker from adversary to neutral.
- **Politicians' staff:** add a district/state breakdown (DOL OFLC and the USCIS Employer Data Hub both support state-level cuts). A staffer who can see "X H-2 positions certified in our district last year, source DOL" will use it in a hearing.
- **Regular citizens:** the per-taxpayer framing (e.g., FAIR's "$957/year after taxes paid," clearly attributed) and the remittance number ("$103B left the U.S. in 2024") are the shareable, gut-level hooks — and they're sourced, so sharing them doesn't blow up in anyone's face.

---

## 6. What to avoid (the list that keeps the site alive)

1. No live counter on anything unmeasurable (off-the-books labor).
2. No "stolen/theft" causal claims you can't source.
3. Never hide the offsetting taxes-paid number.
4. Never present one advocacy estimate as settled fact — always show the range.
5. Don't accuse named private businesses of crimes.
6. Put the FHA category aside: **as of May 25, 2025, FHA no longer insures loans for non-permanent residents** (HUD Mortgagee Letter / TI-490). So "FHA loans to non-citizens" is now largely a closed door, not an ongoing leak — using it would make the site look out of date.

---

## 7. Sources

- USCIS — FY2025 H-1B Registration Statistics: https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations/h-1b-electronic-registration-process
- USCIS — FY2024 H-1B Petitions Annual Report to Congress: https://www.uscis.gov/sites/default/files/document/legal-docs/ola_signed_fy2024_h1b_petitions.pdf
- USCIS — H-1B Employer Data Hub: https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub
- DOL OFLC — H-2A Selected Statistics FY2024 Q4: https://www.dol.gov/sites/dolgov/files/ETA/oflc/pdfs/H-2A_Selected_Statistics_FY2024_Q4.pdf
- DOL OFLC — H-2B Statistical Factsheet FY2024: https://www.dol.gov/sites/dolgov/files/ETA/oflc/pdfs/DOS-DOL_H-2B_Selected_Statistical_Factsheet_FY2024.pdf
- World Bank — Migration & Development Brief (remittances 2024): https://www.worldbank.org/en/news/press-release/2024/06/26/remittances-slowed-in-2023-expected-to-grow-faster-in-2024
- World Bank Open Data — Personal remittances, paid (US): https://data.worldbank.org/indicator/BM.TRF.PWKR.CD.DT?locations=US
- Pew Research — Unauthorized immigrant population 2025 report: https://www.pewresearch.org/wp-content/uploads/sites/20/2025/08/RE_2025.08.21_Unauthorized-Immigrants_REPORT.pdf
- Pew Research — H-1B program key facts: https://www.pewresearch.org/short-reads/2025/03/04/what-we-know-about-the-us-h-1b-visa-program/
- DHS OHSS — Estimates of the Unauthorized Immigrant Population: https://ohss.dhs.gov/sites/default/files/2024-06/2024_0418_ohss_estimates-of-the-unauthorized-immigrant-population-residing-in-the-united-states-january-2018%E2%80%93january-2022.pdf
- FAIR — Fiscal Burden of Illegal Immigration 2023: https://www.fairus.org/issue/publications-resources/fiscal-burden-illegal-immigration-united-states-taxpayers-2023
- HUD — Mortgagee Letter / TI-490 (FHA residency requirement change, eff. May 25 2025): https://www.hud.gov/sites/default/files/OCHCO/documents/TI-490.pdf
