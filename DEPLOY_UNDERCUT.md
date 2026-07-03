# Deploying Undercut

## Production topology
- **Render** (Blueprint `render.yaml`): `undercut-api` (web) + `undercut-db` (Postgres) + `undercut-redis`.
  Push to `main` → auto-deploy; `preDeployCommand` runs `alembic upgrade head`.
  No celery worker/beat — all scheduling is GitHub Actions (see OPERATIONS.md).
- **Vercel**: `dashboard/` — deploy with `cd dashboard && npx vercel --prod` (manual; git integration unreliable).
- **GitHub Actions**: reprice (15-min), lifecycle+digest (daily), health-check (10-min), db-backup (weekly).

## First-time setup checklist
1. Render: create from Blueprint; then set ALL secrets at the **service level** of undercut-api
   (the env group does NOT reach the service — known gotcha) and deploy.
2. Stripe (live): products+prices (monthly + annual), webhook → `/api/billing/webhook` with events:
   `checkout.session.completed`, `customer.subscription.*`, **`invoice.payment_failed`, `invoice.paid`**.
3. SendGrid: verify sender; set `SENDGRID_API_KEY`, `FROM_EMAIL`, `OPERATOR_EMAIL`.
4. eBay developer app: APP/CERT/DEV IDs + RuName; set `TOKEN_ENC_KEY` for token encryption.
5. GitHub repo secrets: `API_URL`, `CRON_KEY` (= UNDERCUT_API_KEY), `SENDGRID_API_KEY`,
   `ALERT_TO`, `ALERT_FROM`, `DATABASE_URL_EXTERNAL`, `BACKUP_PASSPHRASE`.
6. Verify: `scripts/verify-live.sh`, then `GET /health`, one manual reprice-cron call, a $1-test checkout.

## Verifying a deploy
`curl https://undercut-api.onrender.com/health` → `{"status":"ok","database":"up"}` ·
new pages 200 on undercutpricer.com · `gh run list` all green.
