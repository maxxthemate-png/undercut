# ListingArb — Launch Runbook 🚀

**Goal: bring in money.** This is the exact path from "code is done" to "first dollar."

---

## How it makes money
1. **Scrape** Facebook Marketplace for underpriced high-ticket items (RVs, boats, trailers, classic cars, heavy equipment).
2. **Score** each with Claude → estimate the spread between FB price and premium-platform value.
3. **DM the seller**: *"We'll cross-post your item to 10–15 premium platforms. If it sells above your asking price, we keep the difference. You pay nothing."*
4. **Seller signs** the (auto-generated) listing agreement.
5. **Cross-post** to eBay Motors (and others) with AI-optimized copy.
6. **A buyer pays above asking** → **we keep the spread.** That spread is the revenue.

Revenue per deal ≈ `buyer_price − seller_asking_price` (+ optional photo-package fee).

---

## Status: software is DONE and verified ✅
- Infra: Postgres (:5433) + Redis (:6379) in Docker, schema migrated (8 tables).
- API (:8000): 16 endpoints, all DB-backed — **21/21 end-to-end tests pass**.
- Dashboard (:3000): live, renders real data from the API (verified in a real browser).
- Pipeline: scraper, AI scorer, DM generator, reply classifier, **eBay cross-poster (revenue step)**, contract PDF generator — all wired into Celery tasks.

**The only thing standing between you and revenue is API keys + running the worker.**

---

## ▶️ Go live (3 steps)

### 1. Add your keys to `.env`
Open `.env` and fill in (everything else can stay as-is):

| Key | Unlocks | Required for revenue? |
|-----|---------|----------------------|
| `ANTHROPIC_API_KEY` | scoring, DM copy, listing copy | **YES** |
| `FB_EMAIL` / `FB_PASSWORD` | scraping + DMing sellers (use a **dedicated** FB account) | **YES** |
| `EBAY_APP_ID` / `EBAY_CERT_ID` / `EBAY_DEV_ID` / `EBAY_USER_TOKEN` | cross-posting = **capturing the spread** | **YES** |
| `TWILIO_*` + `OPERATOR_PHONE` | SMS alerts when a seller bites / buyer found | optional |
| `SENDGRID_API_KEY` | email alerts | optional |

Check go/no-go any time: **`GET http://localhost:8000/api/system/readiness`** — it tells you exactly what's still blocking revenue.

### 2. Start everything
```bash
cd /Users/maxx/Documents/main/claude/Brain/listinggrab/listingarb

# infra (idempotent)
docker compose up -d postgres redis

# backend API  (:8000)
backend/venv/bin/python -m uvicorn backend.api.main:app --host 0.0.0.0 --port 8000

# Celery worker + scheduler (run each in its own terminal, from the project root)
backend/venv/bin/celery -A backend.tasks.worker worker --loglevel=info
backend/venv/bin/celery -A backend.tasks.worker beat   --loglevel=info

# dashboard  (:3000)
cd dashboard && npm run dev
```

### 3. Start the money pipeline
- Kick a scan on demand: **`POST http://localhost:8000/api/system/run-scan`** (or wait for the 45-min cron).
- Open the dashboard at **http://localhost:3000**, review scored listings, click **Send DM** to approve outreach (Level-1 manual mode).
- When a seller is interested → generate the agreement (`POST /api/listings/{id}/generate-contract`), then **`POST /api/listings/{id}/post-to-platforms`** with `{"platforms":["ebay_motors"]}` → the worker posts it to eBay.
- When a buyer closes above asking → **`POST /api/deals/{id}/close`** with the buyer price → revenue is recorded and shows on the dashboard.

**Autonomy levels** (`PUT /api/system/autonomy`): `1` = you approve every DM (safe start), `2` = auto-DM, `3` = full auto. **Start at Level 1.**

---

## ⚠️ Real-world expectations & risk
- **Facebook automation violates FB's ToS.** Use a dedicated account, keep the DM cap low (`FB_DAILY_DM_LIMIT`, default 15), and expect occasional account friction/bans. A residential proxy (`PROXY_URL`, `PROXY_ENABLED=true`) reduces risk in production.
- **eBay requires a verified seller account** with API access (Trading API). Cross-posting won't work until those 4 eBay keys are real.
- **Revenue is a funnel:** scans → qualified listings → seller replies → agreements → sales above asking. Early on, expect to manually nudge each stage; the software automates the busywork, not the negotiation.
- FB Marketplace DOM changes can break the scraper's selectors over time (`backend/scrapers/facebook.py`); they're isolated and easy to patch.

---

## Not yet automated (manual for now)
- Posters for **RVTrader / Boats.com / Craigslist / AutoTrader / Hemmings / MachineryTrader** — `listing_creator` generates the optimized copy for all of them, but only **eBay Motors** has an automated API poster. Other platforms currently get a "post manually" flag. eBay is the highest-ROI channel, so the revenue loop is live with eBay alone.
- Buyer-inquiry ingestion is manual (close deals via the API/dashboard).
