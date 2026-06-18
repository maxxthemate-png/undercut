# Undercut — Live Pricing (source of truth: dashboard/app/_content/shared.ts)

| Plan | Monthly | Annual (2 mo free) | Listings | Repricing | Notes |
|---|---|---|---|---|---|
| Free | $0 | — | 25 | hourly | hard floor included |
| Starter | $29 | $290/yr (save $58) | 100 | hourly | |
| Pro | $79 | $790/yr (save $158) | 1,000 | 15-min | AI tuning |
| Scale | $199 | $1,990/yr (save $398) | 10,000 | fastest | AI tuning, priority support |

- Every account starts with a **14-day Founding trial** (Starter features, no card) → auto-drops to Free.
- Annual = 10× monthly. Refunds: 30-day window on annual; monthly cancel-anytime (see /refund-policy).
- Stripe price IDs live at the Render service level (`STRIPE_PRICE_*`, `STRIPE_PRICE_*_ANNUAL`).
- Reprice frequency is enforced by `REPRICER_TIER_FREQUENCY` (scale runs every cron cycle —
  to honor a literal "5-min" promise, move reprice.yml to `*/5` once a Scale customer exists).
