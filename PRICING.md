# UNDERCUT — Pricing (DRAFT for Maxx to decide)

Multi-tenant SaaS for high-volume eBay sellers. Value levers: **# active listings repriced**,
**reprice frequency** (fresher price = more buy-box wins = the core value), **AI advisor** on/off,
and **# of stores**. Anchored to competitor repricers (3Dsellers / RepricerExpress / Sellbrite ~ $20–100+/mo).

| Tier | Price | Listings | Reprice freq | AI advisor | Stores | For |
|------|-------|----------|--------------|-----------|--------|-----|
| **Starter** | **$29/mo** | up to 100 | every 6h | — (rule-based undercut + hard floor) | 1 | Side-hustle sellers trying repricing |
| **Growth** | **$79/mo** | up to 1,000 | hourly | ✅ | 3 | Full-time SMB sellers — the core tier |
| **Pro** | **$199/mo** | up to 10,000 | every 15 min | ✅ | unlimited | High-volume power sellers (target persona) |

## Reasoning
- **The hard floor + undercut is in every tier** — the "never sell below your minimum" guarantee *is* the product; never gate safety.
- **Reprice frequency is the primary value lever** — fresher prices win more visibility/sales, and it maps cleanly to infra cost, so it's the natural paid axis.
- **AI advisor is the premium differentiator** — gate it above Starter.
- The stated **target persona (high-volume sellers) lands in Pro**; Growth is the volume tier; Starter is a low-friction on-ramp.

## Open questions for Maxx
- Annual plan (e.g., 2 months free) to pull cash forward?
- **Free trial (14-day)** vs **free tier (≤25 listings)** as the acquisition hook?
- Per-listing overage above Pro, or a custom **Enterprise** tier for 10k+ listings?
- Founding-customer discount for the first ~10 stores to seed testimonials?

_These are starting points — adjust before wiring Stripe products._
