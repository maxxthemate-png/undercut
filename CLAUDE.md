# CLAUDE.md — Undercut

## Project Overview
**Undercut** is a multi-tenant SaaS that automatically reprices a seller's eBay listings to beat the lowest competitor — always clamped to a per-listing **hard price floor** (and optional ceiling) so it never sells below the seller's minimum margin. Claude AI tunes how aggressive to be so sellers win the sale without racing to the bottom. (Pivoted 2026-06-04 from a Facebook-arbitrage prototype, "ListingArb," into eBay repricing.)

**Build status: LIVE in production — hardened (Master Plan v2 waves 1–4 shipped 2026-06-10).** 82 routes / 71-URL sitemap; legal pages + /pricing + OG cards live; unsubscribe/password-reset/dunning/plan-enforcement live (flags ON); monitoring (10-min health check), weekly encrypted DB backups, daily ops digest all green. See OPERATIONS.md. Frontend (Vercel) + backend (Render) deployed and verified end-to-end: signup → no-card 14-day "Founding" trial → 1-click eBay OAuth connect → listing import → set floors → automated repricing. **Stripe billing is LIVE** — monthly **and** annual checkout both verified producing real `cs_live_` sessions (2026-06-09). Also live: a 30+ page programmatic-SEO content engine, email lead-capture, a profit-calculator lead magnet, and a key-gated founder metrics dashboard (`/admin`) with funnel metrics. The customer **email nurture engine is built and deployed but dormant** — it activates the moment a SendGrid sender is verified.

## Tech Stack
- **Backend:** Python 3.11, FastAPI, Uvicorn, SQLAlchemy 2.0, Alembic (migrations 001–006), Pydantic / pydantic-settings.
- **Auth:** JWT (python-jose), passlib `pbkdf2_sha256`; multi-tenant scoping (User → Store → RepricerListing). All `/api/repricer/*` scoped to `user.id`.
- **Database:** PostgreSQL (Render-hosted).
- **Billing:** Stripe — Checkout + customer portal + webhooks; plan → listing-limit gating; trial logic; **monthly + annual** intervals (additive `interval` param; annual price IDs `STRIPE_PRICE_*_ANNUAL`).
- **Marketplace:** eBay — per-seller OAuth (signed, 15-min `state`), Browse/Trading/Inventory APIs. Seller OAuth tokens **encrypted at rest** (Fernet / `cryptography`, keyed by `TOKEN_ENC_KEY`; no-op if unset).
- **AI:** Anthropic Claude — pricing advisor (`backend/agents/pricing_advisor.py`). (crewai/langchain-anthropic present; needs Python <3.13 → `PYTHON_VERSION=3.11.9`.)
- **Email:** SendGrid (`backend/utils/notifications.py`) — operator alerts + **customer lifecycle** (`send_customer_email` + `backend/utils/email_templates.py`: welcome, lead drip 1/3/7, trial-ending, trial-expired).
- **Scheduling (free-tier, no Celery needed in prod):** GitHub Actions cron → key-protected endpoints. `reprice.yml` (15-min) → `POST /api/repricer/cron/reprice-all`; `lifecycle-emails.yml` (daily) → `POST /api/cron/lifecycle-emails`. (Celery+Redis worker/beat also defined in `render.yaml`.)
- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind, recharts (admin). **Programmatic-SEO engine:** shared components in `dashboard/app/_components/`, typed content registry in `dashboard/app/_content/` (types/shared/registry + `guides`/`alternatives`/`glossary` arrays), dynamic statically-generated routes `app/{guides,alternatives,glossary}/[slug]`; `sitemap.ts` auto-derives all routes from the registry (~40 URLs). Bespoke pages: `/compare`, `/streetpricer-alternative`, `/repricerexpress-alternative`, `/ebay-repricing-software`, `/free-ebay-repricer`, `/ebay-profit-calculator`, `/guides/ebay-price-floor`.
- **Hosting / CI:** Render (API web `srv-d8h4mgcvikkc73es12og` + worker + beat + Postgres + Redis; **preDeploy runs `alembic upgrade head`**; auto-deploys on push to `main`) · Vercel (frontend; **deploy via `vercel --prod` — git auto-deploy is unreliable here**). Repo: `github.com/maxxthemate-png/undercut` (`main`).
- **Secrets:** Render service-level env + env group + Vercel + GitHub secrets. **Never commit secrets.**
- ⚠️ **Critical infra gotcha:** the api service reads **SERVICE-level** env vars, NOT the env group (despite `render.yaml fromGroup`). Always set Stripe/secret/price env at the **service level** (`srv-d8h4mgcvikkc73es12og`) + redeploy, or they won't take effect.

## Active Skills
- human-action-checklist: Run at session start and after every response. Surface all blocking human actions with exact URLs and paste-back instructions. Label each item BLOCKING NOW / BLOCKING LAUNCH / OPTIONAL.

## Build Priorities
*(Top 3 to reach first revenue. The product + billing are live; revenue now needs activation + traffic + a buyer.)*
1. ~~Activate the email nurture engine~~ **DONE 2026-06-09** — SendGrid live at the service level; welcome/drip/trial emails active (test send 202; cron + Action verified green).
2. **Drive traffic + land the first paying seller** — only the owner can post. Real assets (verified to exist): **`GTM_OUTREACH.md`** (repo root, gitignored/local-only — channels, per-platform scripts, 7-day plan, founding offer) and **`~/Documents/Brain/Docs/UNDERCUT_GTM_DAY1.md`** (paste-ready eBay-forum/Reddit replies + directory-listing copy). Fastest path: eBay Seller Tools forum threads (§8/§"Fastest path to $1" in GTM_OUTREACH.md). The live SEO funnel (47 pages) compounds over weeks.
3. **Tighten trial → paid conversion** — in-app upgrade nudges, the now-live annual plans (second revenue stream), and monitor lead→signup / trial→paid in `/admin`.

## Known Blockers
- ~~SendGrid~~ **DONE — verified 2026-06-09:** sender `nuvent66@gmail.com` verified; `SENDGRID_API_KEY`/`FROM_EMAIL`/`OPERATOR_EMAIL` set at the api service level + deployed; test send 202, cron endpoint 200 clean, GitHub Action green. Email engine is LIVE (welcome on signup + daily drip/trial reminders). *Deliverability note: gmail.com from-address → some mail lands in Promotions/spam; post-revenue upgrade = custom domain + SendGrid domain auth.*
- ~~Rotate `sk_live`~~ **DONE — verified 2026-06-09:** Stripe returned "Expired API Key" for the chat-pasted key (it's dead); the currently active key was set by the owner directly in Render and never exposed in chat.
- **No paying customers yet:** requires human outreach — Claude cannot acquire customers or post through the owner's accounts.
- **Owner has no eBay seller account** → can't self-demo repricing; needs real eBay-seller customers.
- **Render Postgres free/basic tier:** watch the expiry (~90 days from DB creation) — upgrade before then or data is lost.
- **`/admin`** requires the `ADMIN_KEY` (or `UNDERCUT_API_KEY`) to view.
- **Claude cannot** enter secrets/financial credentials, log into accounts, complete bank/ID verification, browser-drive the Stripe/Render dashboards, post/DM through the owner's accounts, or complete CAPTCHAs — all such steps are the owner's.

## How to Add More Skills
To add a new skill to this project, open CLAUDE.md and add a line under ## Active Skills:
- skill-name: [One sentence describing when Claude should use it and what it does]
