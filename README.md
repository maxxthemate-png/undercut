# Undercut

**Automated eBay repricer with a hard price floor.** Beats the lowest competitor on every
listing, 24/7 — but never reprices below the per-item floor the seller sets
(cost + fees + minimum margin). Live at **https://undercutpricer.com**.

## Architecture

| Piece | Tech | Where |
|---|---|---|
| API | FastAPI + SQLAlchemy 2 + Alembic (Python 3.11) | Render (`undercut-api`, auto-deploys on push to `main`; preDeploy runs migrations) |
| DB | Postgres (basic-256mb) | Render. A free Redis instance is still provisioned in `render.yaml`, but no backend code references it. |
| Frontend | Next.js 14 App Router + Tailwind | Vercel (deploy with `cd dashboard && npx vercel --prod`) |
| Billing | Stripe Checkout + portal + webhooks: monthly and annual subscriptions, plus a one-time Season Pass | live mode |
| Marketplace | eBay OAuth (per-seller, encrypted at rest) + Trading/Browse APIs | — |
| AI | Anthropic Claude pricing advisor | `backend/agents/pricing_advisor.py` |
| Email | SendGrid — customer lifecycle + operator alerts | `backend/utils/notifications.py` |
| Scheduling | GitHub Actions crons → key-protected endpoints (no celery in prod) | `.github/workflows/` |

### Scheduled jobs (GitHub Actions)
- `reprice.yml` — every 15 min → `POST /api/repricer/cron/reprice-all`
- `lifecycle-emails.yml` — daily → lifecycle emails + ops digest
- `health-check.yml` — every 10 min → probes API/frontend/billing, emails operator on failure
- `db-backup.yml` — weekly → encrypted `pg_dump` artifact (28-day retention)

## Local dev
Run these in order from the repo root. This is the sequence that works from a cold clone.
```bash
# 1. Postgres (docker-compose maps it to host port 5433)
docker compose up -d postgres

# 2. Python deps
python3.11 -m venv backend/venv
backend/venv/bin/pip install -r backend/requirements.txt

# 3. Config
cp .env.example .env          # fill in keys; DATABASE_URL already points at port 5433

# 4. Schema
cd backend && venv/bin/alembic upgrade head && cd ..

# 5. API (run from the repo root so the `backend.` package resolves)
backend/venv/bin/uvicorn backend.api.main:app --reload

# 6. Frontend, in a second shell
cd dashboard && npm i && npm run dev
```

## Key directories
- `backend/api/` — routes (auth, repricer, billing, leads, tools, admin, cron, email)
- `backend/services/` — reprice engine, billing, lifecycle emails, ops digest
- `dashboard/app/` — marketing site + SEO engine (`_content/` registry) + dashboard
- `OPERATIONS.md` — ops runbook · `DEPLOY_UNDERCUT.md` — deploy specifics

> **Legacy note:** the pre-pivot "ListingArb" Facebook-arbitrage code was fully removed on 2026-07-03. Nothing legacy remains in the tree.
