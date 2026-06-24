# Revenue Growth Opportunity Report

**Generated:** 2026-06-23  
**Prepared by:** Scheduled analysis routine  
**Data source:** Production PostgreSQL (Render) via `scripts/revenue_opportunities.py`

---

## Executive Summary

> **Note on live data:** The production database is hosted on Render with credentials
> stored outside this environment. Live segment counts are not available in this run.
> The queries, outreach messages, and revenue model below are production-ready —
> run `DATABASE_URL=... python scripts/revenue_opportunities.py` to get actual counts
> and plug them into the impact table at the bottom of this document.

Three monetisation segments have been identified based on the current data model:

| Segment | Opportunity | Lever | Projected MRR (per user at 10 % conversion) |
|---------|-------------|-------|----------------------------------------------|
| **A** — Engaged free/trial users | Convert to Starter | Email upgrade CTA | **+$2.90** |
| **B** — Paid users at ≥80 % capacity | Upsell to next tier | Email + in-app nudge | **+$25–$60** |
| **C** — Onboarding dropouts (<30 days) | Complete setup | Rescue email | **+$0.46** (probabilistic) |

---

## Segment A — High-Engagement Free & Trial Users

**Who they are:** Users on `plan = 'free'` or `plan = 'trial'` who have connected a store
and have at least one repricing-enabled listing or a price change in the last 14 days.
These users are deriving value — they just haven't paid yet.

**Why they convert:** They've already done the hard work (eBay OAuth, listing import).
The friction to upgrade is a single Stripe Checkout click.

**Revenue impact:** At 10 % conversion, every 10 users in this segment = +$29/mo MRR.

---

### Outreach Message A1 — Free user with active repricing

**Channel:** Email  
**Subject:** Your listings are repricing — here's what you're leaving on the table

```
Hi [first_name or "there"],

Good news: Undercut is already watching your prices on eBay. You have
[enabled_listings] listings repricing right now.

Here's the catch — on the Free plan, Undercut reprices every hour at most.
Your competitors who are on Starter or Pro are adjusting prices every few minutes.

For $29/month, the Starter plan gives you:
  ✓ Up to 100 listings (vs your current 25)
  ✓ Hourly repricing cadence unlocked for all listings
  ✓ AI-assisted pricing suggestions

You've already connected your store. Upgrading takes 30 seconds.

→ Upgrade to Starter: https://undercut-nu.vercel.app/billing

Questions? Just reply to this email.

— The Undercut Team
```

---

### Outreach Message A2 — Trial user with ≤5 days remaining

**Channel:** Email  
**Subject:** Your trial ends in [trial_days_left] days — keep your repricing going

```
Hi [first_name or "there"],

Your Undercut Founding Trial ends in [trial_days_left] days.

In the last two weeks, Undercut has made [price_changes_14d] price adjustments
across your listings — automatically, while you were doing other things.

When your trial ends, repricing pauses for listings over the 25-item Free cap.

Lock in the Starter plan at $29/month before your trial expires and keep the
momentum going without interruption.

→ Upgrade now: https://undercut-nu.vercel.app/billing

Thanks for trying Undercut — we'd love to keep working for you.

— The Undercut Team
```

---

### Outreach Message A3 — Trial user with >5 days remaining (mid-trial)

**Channel:** Email  
**Subject:** You're [price_changes_14d] price changes in — here's what's next

```
Hi [first_name or "there"],

Quick check-in from Undercut.

You're [days_on_plan] days into your trial and Undercut has already made
[price_changes_14d] repricing decisions for you. Every one of those kept you
competitive without you lifting a finger.

The Starter plan ($29/month) keeps all of that running after your trial, plus
unlocks full access for up to 100 listings.

There's no pressure — you have [trial_days_left] days left. But if you already
know this is working for you, you can upgrade any time:

→ https://undercut-nu.vercel.app/billing

— The Undercut Team
```

---

## Segment B — Paid Users at ≥80 % Listing Capacity

**Who they are:** Active paying customers (`plan IN ('starter', 'pro', 'scale')`) whose
enabled listings are ≥80 % of their `listing_limit`. These users have grown into their
plan and are the highest-intent upsell candidates in the customer base.

**Why they upgrade:** They have more inventory to manage. The pain (throttling, manual
workarounds) is real and present. This is a value-aligned upsell, not a push.

**Revenue impact:** At 50 % conversion (high intent), every 2 Starter→Pro upgrades =
+$100/mo MRR. Every 2 Pro→Scale upgrades = +$240/mo MRR.

---

### Outreach Message B1 — Starter user at ≥80 % capacity

**Channel:** Email  
**Subject:** You're running out of room — time to talk

```
Hi [first_name or "there"],

You have [enabled_listings] of your 100 Starter-plan listing slots filled.
That means you're [utilization_pct]% of the way to your limit.

When you hit 100, new listings won't be repriced automatically — you'll have to
manually manage pricing for anything beyond the cap.

The Pro plan ($79/month) gives you room for up to 1,000 listings, plus
more frequent repricing cycles (every 12 minutes vs. hourly on Starter).

If your inventory is growing, now's the time to upgrade — before you hit the
wall mid-season.

→ Upgrade to Pro: https://undercut-nu.vercel.app/billing

— The Undercut Team
```

---

### Outreach Message B2 — Pro user at ≥80 % capacity

**Channel:** Email  
**Subject:** You're scaling fast — here's your next move

```
Hi [first_name or "there"],

You're using [enabled_listings] of your 1,000 Pro-plan listing slots —
that's [utilization_pct]% capacity.

At your current growth rate, you could hit the limit sooner than you'd expect.
The Scale plan ($199/month) gives you:

  ✓ Up to 10,000 listings
  ✓ The fastest repricing cadence available (continuous — no throttling)
  ✓ Priority support

We work with high-volume eBay sellers every day. Scale was built for exactly
where you're heading.

→ Upgrade to Scale: https://undercut-nu.vercel.app/billing

Or reply here and we'll answer any questions first.

— The Undercut Team
```

---

## Segment C — Recent Sign-Ups with Incomplete Onboarding

**Who they are:** Users who signed up within the last 30 days and have NOT completed
core onboarding — defined as: (1) connecting an active eBay store AND (2) enabling
at least one listing for repricing.

**Two sub-groups:**
- `stuck_at = 'no_store_connected'` — signed up but never completed eBay OAuth
- `stuck_at = 'store_connected_no_listings'` — connected store but no listings enabled

**Why it matters:** Every user in this segment is a free/trial churn risk. Getting them
to their first reprice event is the highest-leverage onboarding action (first reprice
→ first reprice email → habit formation → conversion).

**Revenue impact:** Conservative 8 % complete onboarding, 20 % of those convert to
Starter. Every 63 dropout users rescued = ~1 new paying customer = +$29/mo MRR.

---

### Outreach Message C1 — No store connected (OAuth not completed)

**Channel:** Email  
**Subject:** One step left to start saving on eBay

```
Hi [first_name or "there"],

You signed up for Undercut [days_since_signup] days ago — thanks for that.

You haven't connected your eBay store yet, so Undercut hasn't been able to
start watching your prices. It takes about 90 seconds and it's the only step
between you and automated repricing.

Here's what happens the moment you connect:
  1. Undercut scans your listings
  2. You enable repricing on the ones you want
  3. Undercut adjusts prices automatically — you don't touch a thing

→ Connect your eBay store: https://undercut-nu.vercel.app/dashboard

If you ran into trouble during setup, just reply and we'll sort it out.

— The Undercut Team
```

---

### Outreach Message C2 — Store connected, no listings enabled

**Channel:** Email  
**Subject:** Your store is connected — here's the last step

```
Hi [first_name or "there"],

Your eBay store is connected to Undercut — nice work.

The last step is switching on repricing for your listings. Until you do,
Undercut is watching but not acting.

It only takes a minute:
  1. Go to your dashboard → Listings
  2. Select the listings you want automated
  3. Toggle repricing on

From there, Undercut handles everything — checking competitors, adjusting
your price, protecting your floor.

→ Enable repricing: https://undercut-nu.vercel.app/dashboard

[If you're on a trial] You have [trial_days_left] days left on your trial.
Make them count.

— The Undercut Team
P.S. Not sure which listings to start with? Start with your top 10 by sales
volume — those are where automated pricing moves the needle fastest.
```

---

## Revenue Impact Model

### Inputs (plug in actual counts from the analysis script)

| Variable | Placeholder | Source |
|----------|-------------|--------|
| Segment A size | `N_A` | `segment_a_count` from script |
| Segment B size | `N_B` | `segment_b_count` from script |
| Segment C size | `N_C` | `segment_c_count` from script |
| Avg. Segment B upsell value | `V_B` | Weighted avg of Starter→Pro ($50) and Pro→Scale ($120) gaps |

### Projection Formula

```
Segment A MRR gain  = N_A × 10% conversion × $29  (all convert to Starter)
Segment B MRR gain  = N_B × 50% conversion × V_B
Segment C MRR gain  = N_C × 8% onboarding × 20% paid × $29

Total projected MRR gain = A + B + C
```

### Example (illustrative — 50 users per segment)

| Segment | Users | Conversion | Avg. Gain | MRR Impact |
|---------|-------|------------|-----------|------------|
| A — Engaged free/trial | 50 | 10 % | $29 | **+$145/mo** |
| B — Near-limit paid | 50 | 50 % | $50 (blended) | **+$1,250/mo** |
| C — Onboarding dropouts | 50 | 8 % → 20 % | $29 | **+$23/mo** |
| **Total** | | | | **+$1,418/mo** |

Segment B is the highest-ROI lever by far: these are paying customers who are
already sold on the product and have a concrete, immediate reason to upgrade.

---

## Recommended Actions

1. **Run the analysis script** to get actual counts:
   ```bash
   DATABASE_URL="$(render env get DATABASE_URL --service <service-id>)" \
     python scripts/revenue_opportunities.py | tee revenue_report_$(date +%Y%m%d).json
   ```

2. **Prioritise Segment B first** — near-limit paid users need the least convincing
   and yield the highest per-user MRR gain. Consider triggering Message B1/B2
   in the in-app dashboard nudge (the limit-nudge banner already exists) in
   addition to email.

3. **Add Segment B to the lifecycle email system** — `lifecycle_emails.py` currently
   handles trial/dunning/winback but has no near-limit upsell trigger. This is
   a one-function addition.

4. **Segment C rescue should fire at day 3** — the current `first_reprice_emailed_at`
   trigger only fires after the first reprice succeeds. Users who never complete
   setup receive nothing. A dedicated onboarding-rescue email at day 3 (if no
   `repricing_enabled` listing exists) would catch this cohort.

5. **Track and report** — add `segment_b_near_limit` and `onboarding_rescue` counts
   to the daily ops digest (`ops_digest.py`) so this becomes a standing metric.

---

## Data Gaps

- **No Stripe revenue data in DB** — MRR is estimated from plan × headcount. Actual
  MRR (accounting for annual discounts, trials, refunds) should be pulled from Stripe.
- **No in-product engagement signal beyond repricing** — login frequency, dashboard
  views, and manual reprice runs are not tracked. Adding a `last_login_at` column
  would sharpen Segment A scoring.
- **No cohort-level email performance** — open/click rates from SendGrid are not
  stored. Connecting SendGrid Event Webhooks to a `email_events` table would let
  you measure which of these messages actually converts.
