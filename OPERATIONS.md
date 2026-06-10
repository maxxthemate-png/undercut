# Undercut — Operations Runbook

## Live endpoints
- App: https://undercut-nu.vercel.app · API: https://undercut-api.onrender.com (`/health`)
- Founder metrics: `/admin` (needs `ADMIN_KEY`) · `GET /api/admin/metrics`, `/api/admin/gating-preview`

## Automated jobs (GitHub Actions; repo secrets in parentheses)
| Workflow | Schedule | Does |
|---|---|---|
| reprice.yml | */15 min | reprices all enabled listings (`API_URL`, `CRON_KEY`) |
| lifecycle-emails.yml | daily 14:17 UTC | drip/trial/dunning/digest emails + founder ops digest |
| health-check.yml | */10 min | probes `/health` (+DB), homepage, `/api/billing/plans`; SendGrid alert on failure (`SENDGRID_API_KEY`, `ALERT_TO`, `ALERT_FROM`) |
| db-backup.yml | weekly Mon | encrypted pg_dump → artifact, 28d retention (`DATABASE_URL_EXTERNAL`, `BACKUP_PASSPHRASE`) |

⚠️ GitHub disables schedules after 60 days of repo inactivity — the daily ops digest flags
`[STALE REPRICE CRON]` if the newest reprice run is >1h old. That's the watchdog's watchdog.

## Restore a DB backup
```bash
# download the artifact, then:
openssl enc -d -aes-256-cbc -pbkdf2 -pass pass:<BACKUP_PASSPHRASE> -in undercut-YYYY-MM-DD.dump.enc \
  | pg_restore -d "$DATABASE_URL" --clean
```
Render also keeps its own daily Postgres backups (dashboard → undercut-db → Backups).

## Env vars — THE gotcha
The api service reads **SERVICE-level** env vars, NOT the `undercut-secrets` group.
Set everything at the service level (`srv-d8h4mgcvikkc73es12og`) and trigger a deploy.

### Feature flags (service level)
- `REPRICER_ENFORCE_PLAN_LIMITS` (on) — caps scheduled repricing at the user's effective plan limit
- `REPRICER_TIER_FREQUENCY` (on) — scale=every run, pro=15-min, starter/free/trial=hourly
- `DUNNING_GRACE_DAYS` (7) — past_due grace before access drops to free limits

## Dunning (failed payments)
`invoice.payment_failed` → `payment_status=past_due` + day-0 email → day-3 reminder →
day-7 access reduced (plan column untouched) → `invoice.paid` restores instantly.
**Stripe webhook must have `invoice.payment_failed` + `invoice.paid` events enabled.**

## Deploys
- Backend: push to `main` → Render auto-deploy (preDeploy runs `alembic upgrade head`).
- Frontend: `cd dashboard && npx vercel --prod` (git auto-deploy unreliable — always deploy manually).

## Secrets inventory (names only)
Render service: STRIPE_*, EBAY_*, ANTHROPIC_API_KEY, SENDGRID_API_KEY, FROM_EMAIL,
OPERATOR_EMAIL, PUBLIC_APP_URL, PUBLIC_API_URL, SECRET_KEY, UNDERCUT_API_KEY, ADMIN_KEY,
TOKEN_ENC_KEY, flags above. GitHub: API_URL, CRON_KEY, SENDGRID_API_KEY, ALERT_TO,
ALERT_FROM, DATABASE_URL_EXTERNAL, BACKUP_PASSPHRASE.
