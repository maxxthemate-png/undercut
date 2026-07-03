# Undercut

**Automated eBay repricer with a hard price floor.** Beats the lowest competitor on every
listing, 24/7 — but never reprices below the per-item floor the seller sets
(cost + fees + minimum margin). Live at **https://undercutpricer.com**.

## Architecture

| Piece | Tech | Where |
|---|---|---|
| API | FastAPI + SQLAlchemy 2 + Alembic (Python 3.11) | Render (`undercut-api`, auto-deploys on push to `main`; preDeploy runs migrations) |
| DB / cache | Postgres (basic-256mb) + Redis (free) | Render |
| Frontend | Next.js 14 App Router + Tailwind | Vercel (deploy with `cd dashboard && npx vercel --prod`) |
| Billing | Stripe Checkout + portal + webhooks (monthly + annual) | live mode |
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
```bash
# backend
cd backend && python -m venv venv && venv/bin/pip install -r requirements.txt
cp ../.env.example ../.env   # fill in keys
venv/bin/uvicorn backend.api.main:app --reload   # from repo root
# frontend
cd dashboard && npm i && npm run dev
```

## Key directories
- `backend/api/` — routes (auth, repricer, billing, leads, tools, admin, cron, email)
- `backend/services/` — reprice engine, billing, lifecycle emails, ops digest
- `dashboard/app/` — marketing site + SEO engine (`_content/` registry) + dashboard
- `OPERATIONS.md` — ops runbook · `DEPLOY_UNDERCUT.md` — deploy specifics

> **Legacy note:** files referencing "ListingArb" (FB-arbitrage: `backend/scrapers/facebook.py`,
> `backend/automation/`, `backend/tasks/worker.py` legacy jobs, `contracts/`) are from the
> pre-pivot product, are gated behind `ENABLE_LEGACY_ARBITRAGE=false`, and never run.
