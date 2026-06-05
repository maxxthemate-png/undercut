# Deploying Undercut (eBay repricer)

Backend (FastAPI API + Celery worker + Celery beat + Postgres + Redis) → **Render** (or Railway).
Dashboard (Next.js) → **Vercel**.

> Note: `LAUNCH.md` in this repo is the legacy arbitrage runbook — ignore it. This is the repricer's.

## A. Backend on Render (recommended — `render.yaml` Blueprint)
1. `git push` this repo to GitHub.
2. Render → **New → Blueprint** → pick the repo. It provisions: Postgres (`undercut-db`), Redis (`undercut-redis`), and 3 services (`undercut-api`, `undercut-worker`, `undercut-beat`).
3. In the `undercut-secrets` env group, set: `ANTHROPIC_API_KEY`, `EBAY_APP_ID`, `EBAY_CERT_ID`, `EBAY_DEV_ID`, `EBAY_USER_TOKEN`, and `EBAY_RU_NAME` (later). `EBAY_SANDBOX` is preset to `false`.
4. Deploy. Migrations run automatically (`preDeployCommand: alembic upgrade head`). DATABASE_URL/REDIS_URL are auto-wired.
5. API is live at `https://undercut-api.onrender.com`. Check `/health`.

## B. Backend on Railway (alternative — `Procfile`)
1. New project from the repo. Add **PostgreSQL** + **Redis** plugins (they set `DATABASE_URL`/`REDIS_URL`).
2. Create 3 services from the same repo using the `Procfile` process types: `web`, `worker`, `beat`. Add a one-off `release` (`alembic upgrade head`) or run it once.
3. Set the same secrets as above; `EBAY_SANDBOX=false`.

## C. Dashboard on Vercel
1. Import the `dashboard/` directory as a Vercel project (Next.js auto-detected).
2. Set env `API_URL = https://undercut-api.onrender.com`.
3. Deploy. Add the dashboard's domain to the API's CORS allow-list (`backend/api/main.py`) if it isn't `localhost`.

## D. eBay OAuth (multi-tenant onboarding) — after the API is live
1. eBay dev portal → your app → User Tokens / OAuth → set the **accept-URL** to `https://<api-domain>/api/repricer/oauth/callback`; copy the generated **RuName**.
2. Set `EBAY_RU_NAME` in the backend env → redeploy. Sellers can now "Connect eBay".

## Go-live checklist
- [ ] Production eBay keyset + User Token in env, `EBAY_SANDBOX=false`
- [ ] Backend deployed; `/health` ok; migrations applied
- [ ] Dashboard deployed; `API_URL` set; CORS updated
- [ ] RuName set (for self-serve onboarding)
- [ ] First store connected → import → set floor/ceiling/undercut → enable → `/api/repricer/run` reprices a real listing
