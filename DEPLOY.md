# Deploying Undercut

Quick reference for shipping a change to production. Read this before you deploy, not after something breaks.

## The one thing to remember

**Frontend deploys are MANUAL. Backend deploys are automatic.** These are two different pipelines:

| | Trigger | Command |
|---|---|---|
| **Backend** (Render, `undercut-api`) | Auto-deploys on every push to `main` | Just `git push` — nothing else to run |
| **Frontend** (Vercel, `undercut-nu.vercel.app`) | Git auto-deploy is **OFF** (intentionally, unreliable) | You must run the deploy command by hand, every time |

If you merge a frontend change and walk away, **it is not live.** `main` will silently drift ahead of what's actually deployed until someone runs the Vercel command below. This has bitten this repo before — the `deploy-drift-check.yml` GitHub Action (added alongside this doc) exists specifically to catch that silent drift; see below.

## Deploy commands

**Backend — automatic, no command needed.** Push to `main` and Render picks it up:
- Render runs `preDeployCommand: cd backend && python -m alembic upgrade head` before starting the new instance — DB migrations run automatically as part of every backend deploy.
- Render only rebuilds the backend when `backend/**` or `render.yaml` change (see `buildFilters` in `render.yaml`) — pushing frontend-only or docs-only changes will NOT trigger a backend rebuild.
- Service: `undercut-api` (`srv-d8h4mgcvikkc73es12og`) on Render.

**Frontend — manual, every time:**
```bash
cd dashboard && vercel deploy --prod --yes --scope maxxthemate-8931s-projects -b API_URL=https://undercut-api.onrender.com
```
Run this after merging any change under `dashboard/`. Nothing else does it for you.

## What to poll after deploying

1. **Backend health** (auto-deploy takes a few minutes after push — poll until it reflects the new state):
   ```bash
   curl -s https://undercut-api.onrender.com/health
   ```
   Expect: `{"status":"ok","database":"up","token_encryption":"active","timestamp":"..."}`
   - `database: "down"` = DB connection issue (check Render Postgres status).
   - `token_encryption` should read `"active"`. If it says `"disabled"` or `"error: key-unset"` / `"error: key-invalid"`, seller eBay OAuth tokens are NOT encrypted at rest — see the plan-enforcement/security gotcha below. **Do not let this sit at anything other than `active` with real sellers connected.**

2. **Frontend is actually live** (after running `vercel deploy --prod`):
   ```bash
   curl -sI https://undercut-nu.vercel.app/ | head -5
   ```
   Confirm `HTTP/2 200` and check `x-vercel-id` / `age` headers reset (a fresh deploy resets `age`). There's no commit-SHA endpoint on the frontend, so the real check is the automated one below.

3. **eBay Trading API self-test** (confirms the server's own keyset can reach eBay's Trading API and reports prod-vs-sandbox — no seller token required, safe to run anytime):
   ```bash
   curl -H "X-Admin-Key: $ADMIN_KEY" https://undercut-api.onrender.com/api/admin/ebay-selftest
   ```
   Useful after any backend deploy that touches `backend/services/ebay_store.py`, `ebay_oauth.py`, or eBay keyset env vars. `$ADMIN_KEY` is the `ADMIN_KEY` (or fallback `UNDERCUT_API_KEY`) env var set at the Render service level.

4. **Billing sanity check** (already covered by `health-check.yml` every 10 min, but useful to check manually right after a billing-touching deploy):
   ```bash
   curl -s https://undercut-api.onrender.com/api/billing/plans
   ```

5. **Automated deploy-drift check** — `.github/workflows/deploy-drift-check.yml` runs every 6 hours (and on demand via `workflow_dispatch`) and compares the latest Vercel production deployment's commit SHA against the latest commit touching `dashboard/` on `main`. It's read-only (never deploys) and needs a `VERCEL_TOKEN` repo secret (read-only scope) to do the actual comparison — until that secret is set it logs a warning and no-ops instead of false-alarming. This does NOT replace running the manual `vercel deploy --prod` command; it just tells you if you forgot to.

## Known traps

- **Render service-level env vars override the `undercut-secrets` env group**, despite `render.yaml`'s `fromGroup`. If you set a Stripe key / price ID / secret in the env GROUP and it doesn't seem to take effect, check whether a stale duplicate exists at the **service level** (`srv-d8h4mgcvikkc73es12og` → Environment Variables) — the service-level one always wins. This has caused hours of confusion before (orphaned webhook secret, wrong Stripe price IDs). Always set secrets at the service level and redeploy.

- **Plan-enforcement flags are ALREADY TRUE in prod — do not re-flip them.** `REPRICER_TIER_FREQUENCY=true` and `REPRICER_ENFORCE_PLAN_LIMITS=true` are both set at the Render service level (confirmed 2026-06-24). Tier service levels are live: Free/Starter reprice hourly, Pro/Scale every 15 min (the `reprice.yml` cron ceiling is `*/15`, so "15-min" is the real floor even on Scale — never advertise faster than that). If you see stale docs/plans suggesting these flags are "off" or "pending," ignore them — they're wrong. Don't add a task to flip these; they're already on.

- **`ENVIRONMENT=production` without a valid `TOKEN_ENC_KEY` first will make the backend intentionally refuse to boot** (fail-fast, by design — seller eBay OAuth tokens are write-scoped and must never be stored plaintext). If you ever need to rotate `TOKEN_ENC_KEY`: generate a new one with `python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"`, set it at the Render **service level**, confirm `/health` reports `token_encryption: "active"` before assuming it worked — "the var is set" is not proof, only the `/health` field is. Also watch for the same env-group-vs-service-level duplicate trap here (a duplicate `TOKEN_ENC_KEY` in the group previously masked a valid service-level key).

- **The eBay seller OAuth flow cannot be live-verified end-to-end.** The owner is permanently banned from eBay selling and has no warm path to a real seller/sandbox test account. A prior bug (OAuth tokens sent in the wrong XML slot instead of the `X-EBAY-API-IAF-TOKEN` header) silently broke seller listing-import and repricing for a while before being caught — fixed 2026-06-22 (commit `863cd66`). Because this can't be tested live, treat any change to `backend/services/ebay_store.py`, `ebay_oauth.py`, or `repricer_routes.py`'s token handling as high-risk: run the eBay self-test endpoint above post-deploy, and check that a failed listing import now alerts loudly (it used to fail silently and return `[]` — that alerting was added specifically because the first real seller connect is the only true test).

- **Frontend content-claims linter**: never reintroduce false feature claims in dashboard copy (bulk CSV import, tagging/rules engine, default-floor/override — none of these exist). Run `node scripts/content-claims.mjs dashboard/app/_content/*/index.ts` before deploying if you touched pricing or feature copy. Note it only lints the `_content` registry, not bespoke `page.tsx` files (home/compare/PricingTable duplicate pricing facts manually) — grep those too if you change a price or tier limit.

- **Render Postgres free/basic tier has a rough ~90-day expiry window from DB creation** — check it hasn't lapsed before assuming a DB-down health check is a code bug.

## Reference

- Backend: `https://undercut-api.onrender.com` (Render service `srv-d8h4mgcvikkc73es12og`)
- Frontend: `https://undercut-nu.vercel.app` (Vercel project `undercut`, `prj_C4SdJQsQxNmal55HNqemQcwxNcS2`)
- Repo: `github.com/maxxthemate-png/undercut` (`main`)
- Scheduled jobs (GitHub Actions, not Celery): `reprice.yml` (*/15 min), `lifecycle-emails.yml` (daily), `health-check.yml` (*/10 min), `db-backup.yml` (weekly), `indexnow.yml` (on `dashboard/**` push + weekly), `auto-content.yml` (weekly), `self-heal.yml` (weekly, opens PRs only, never deploys), `deploy-drift-check.yml` (every 6h, read-only).
