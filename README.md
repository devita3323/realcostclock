# The Real Cost Clock

A Debt-Clock-style transparency site for U.S. immigration & guest-worker policy.
Every figure links to its primary government source. See **SETUP_GUIDE.md** to deploy.

## Structure
- `index.html` — the site; renders entirely from `data.json`.
- `data.json` — all figures, sources, and tiers. **Edit this to update numbers.**
- `scripts/fetch-data.mjs` — auto-updates World Bank figures (run: `node scripts/fetch-data.mjs`).
- `.github/workflows/update-data.yml` — runs the fetcher monthly + on demand.

## Local preview
Any static server works, e.g.:
```
npx serve .       # or:  python3 -m http.server
```
Then open the printed URL. (Opening index.html directly with file:// won't load data.json — use a server.)

## Design principle
Tier 1 = hard government counts. Tier 2 = labeled estimates (human-reviewed). Unmeasurable
categories are intentionally excluded so one weak number can't discredit the rest.
