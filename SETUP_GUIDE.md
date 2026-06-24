# The Real Cost Clock — Setup & Deploy Guide

Plain-English, no coding experience assumed. By the end you'll have a live website that
auto-updates its remittance figures and that you update by hand for the rest in ~15 min/quarter.

Total cost to launch: **a domain name (~$12/year). Everything else is free.**

---

## What you have in this folder

```
realcostclock/
├── index.html                 ← the website (reads data.json)
├── data.json                  ← ALL the numbers + sources live here. This is what you edit.
├── scripts/
│   └── fetch-data.mjs         ← auto-fetches World Bank figures, updates data.json
└── .github/
    └── workflows/
        └── update-data.yml    ← runs the fetcher automatically once a month
```

The whole design in one sentence: **the website never contains numbers — it reads them
from `data.json`, the fetcher refreshes the automatic ones, and you edit the rest.**

---

## Part 1 — Put it online (about 30 minutes, one time)

You need two free accounts: **GitHub** (stores the files + runs the auto-updater) and
**Cloudflare** (serves the website). And one paid thing: a **domain name**.

### Step 1 — Create a GitHub account and repository
1. Go to github.com, sign up (free).
2. Click the **+** top-right → **New repository**.
3. Name it `realcostclock`. Set it to **Public**. Click **Create repository**.

### Step 2 — Upload these files
1. On the new repo page, click **uploading an existing file**.
2. Drag in `index.html`, `data.json`, the `scripts` folder, and the `.github` folder.
   - If drag-and-drop won't take folders, install **GitHub Desktop** (free app) — it makes
     this a simple "copy files in, click Commit, click Push." Easiest path for non-coders.
3. Commit the files.

### Step 3 — Connect Cloudflare Pages
1. Go to dash.cloudflare.com, sign up (free).
2. Left menu → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize GitHub, pick your `realcostclock` repo.
4. Build settings: leave the build command **blank**, set output directory to **/** (root).
   (This is a plain static site — no build step.)
5. Click **Save and Deploy**. In ~1 minute you'll get a live URL like
   `realcostclock.pages.dev`. **Your site is live.**

### Step 4 — Add your real domain
1. Buy a domain (Cloudflare itself sells them at cost, or Namecheap/Porkbun). ~$12/yr.
2. In Cloudflare Pages → your project → **Custom domains** → add your domain and follow the
   prompts. Cloudflare handles HTTPS automatically.

---

## Part 2 — Turn on the auto-updater (5 minutes, one time)

The fetcher script runs by itself once a month via GitHub Actions — but GitHub disables
scheduled actions on brand-new repos until you confirm.

1. In your GitHub repo, click the **Actions** tab.
2. If prompted, click **"I understand my workflows, enable them."**
3. You'll see **"Update data."** Click it → **Run workflow** once to test it now.
4. It pulls the latest World Bank numbers, and if anything changed, commits the new
   `data.json`. Cloudflare auto-redeploys within a minute. **Done — that part is now hands-off.**

---

## Part 3 — Your update routine (the only ongoing work)

Open `data.json`. Every number is one block. To update a figure you change two fields:
`"value"` (the number) and `"period"` (the date it covers), then save. That's it — the site
updates itself on the next deploy.

**Each quarter (~15 min):**
- **H-2A / H-2B** — visit the DOL OFLC links in the file, grab the new certified-positions
  totals, update `value` and `period`.

**Each year (~20 min):**
- **H-1B registrations & approvals** — update from the USCIS links when the new FY report drops (spring).
- **Unauthorized population** — update when Pew/DHS release their annual estimate.
- **Fiscal cost** — update when FAIR (or whichever sources you cite) release the new study.
  *Review this one carefully* — it's the contested number and your credibility shield.

**Automatic, no action needed:**
- **Remittances (US outflow + Mexico)** — the fetcher handles these. World Bank updates ~once
  a year and your monthly action catches it.

### How to edit data.json without breaking it
- Only change text **between the quotation marks**, or the number after `"value":`.
- Don't remove commas or braces. If you're nervous, edit it on github.com directly — it
  warns you if the format breaks before you save.
- After saving, glance at the live site. If a card shows blank, you likely deleted a comma —
  undo and try again.

---

## Part 4 — Adding a new metric later

Copy any existing block in `data.json`, paste it, and change the fields. Give it a unique
`"id"`. The website automatically renders any metric you add — no HTML editing required.
If it's a World Bank indicator, add its `id` + country + indicator code to the
`WORLD_BANK_FEEDS` list in `scripts/fetch-data.mjs` and it'll auto-update too.

---

## What stays manual on purpose (and why that's correct)

The contested estimates are intentionally human-updated. You *want* a person reviewing the
fiscal-cost and population numbers before they publish — that human checkpoint is exactly
what protects you if a journalist or opponent challenges the site. Automating those would
remove your safety net, not add convenience.

---

## Quick reference — the links you'll update from

- USCIS H-1B registration stats: https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations/h-1b-electronic-registration-process
- USCIS H-1B Employer Data Hub (for the "top sponsors" feature later): https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub
- DOL OFLC performance data (H-2A/H-2B): https://www.dol.gov/agencies/eta/foreign-labor/performance
- World Bank remittances (auto): https://data.worldbank.org/indicator/BM.TRF.PWKR.CD.DT?locations=US
- Pew unauthorized population: https://www.pewresearch.org/topic/immigration-migration/immigration-issues/unauthorized-immigration/
- FAIR fiscal cost study: https://www.fairus.org/issue/publications-resources/fiscal-burden-illegal-immigration-united-states-taxpayers-2023
