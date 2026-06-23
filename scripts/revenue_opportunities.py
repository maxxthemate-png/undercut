"""
Revenue Growth Opportunity Analysis
====================================
Run against the production database to identify three monetisation segments:

  A) High-engagement free/trial users ready to convert
  B) Paid users at ≥80 % of their listing limit (upsell triggers)
  C) Recent sign-ups stuck in onboarding

Usage:
  DATABASE_URL=postgresql://... python scripts/revenue_opportunities.py

Outputs a JSON report to stdout (pipe to jq or redirect to a file).
Requires: psycopg2-binary or the project's existing requirements.txt.
"""

import json
import os
import sys
from datetime import datetime, timedelta

import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    sys.exit("ERROR: DATABASE_URL environment variable is not set.")

# Plan pricing (must stay in sync with backend/services/billing.py)
PLAN_PRICE = {"starter": 29, "pro": 79, "scale": 199}
PLAN_LIMIT = {"free": 25, "trial": 100, "starter": 100, "pro": 1000, "scale": 10000}
UPSELL_TO  = {"free": "starter", "trial": "starter", "starter": "pro", "pro": "scale"}

NOW = datetime.utcnow()


def run_query(cur, sql, params=None):
    cur.execute(sql, params or ())
    return cur.fetchall()


def segment_a(cur):
    """Free/trial users who have connected a store AND have active/recent repricing activity."""
    sql = """
        SELECT
            u.id,
            u.email,
            u.plan,
            u.created_at,
            u.trial_ends_at,
            COUNT(DISTINCT rl.id)                                    AS enabled_listings,
            COUNT(DISTINCT pc.id)                                    AS price_changes_14d,
            MAX(pc.created_at)                                       AS last_reprice_at
        FROM users u
        JOIN stores s ON s.user_id = u.id AND s.is_active = TRUE
        LEFT JOIN repricer_listings rl
               ON rl.store_id = s.id AND rl.repricing_enabled = TRUE
        LEFT JOIN price_changes pc
               ON pc.listing_id = rl.id
              AND pc.created_at >= NOW() - INTERVAL '14 days'
        WHERE u.plan IN ('free', 'trial')
          AND u.is_active = TRUE
          AND u.email_unsubscribed = FALSE
        GROUP BY u.id, u.email, u.plan, u.created_at, u.trial_ends_at
        HAVING COUNT(DISTINCT rl.id) > 0 OR COUNT(DISTINCT pc.id) > 0
        ORDER BY price_changes_14d DESC, enabled_listings DESC
    """
    rows = run_query(cur, sql)
    results = []
    for r in rows:
        plan = r["plan"]
        next_plan = UPSELL_TO.get(plan, "starter")
        mrr_gain = PLAN_PRICE[next_plan]
        days_on_plan = (NOW - r["created_at"]).days if r["created_at"] else 0
        trial_days_left = None
        if r["trial_ends_at"]:
            td = (r["trial_ends_at"] - NOW).days
            trial_days_left = max(0, td)
        results.append({
            "email": r["email"],
            "plan": plan,
            "enabled_listings": r["enabled_listings"],
            "price_changes_14d": r["price_changes_14d"],
            "last_reprice_at": r["last_reprice_at"].isoformat() if r["last_reprice_at"] else None,
            "days_on_plan": days_on_plan,
            "trial_days_left": trial_days_left,
            "recommended_upgrade": next_plan,
            "mrr_gain": mrr_gain,
        })
    return results


def segment_b(cur):
    """Paid users at ≥80 % of their listing_limit (upsell to next tier)."""
    sql = """
        SELECT
            u.id,
            u.email,
            u.plan,
            u.listing_limit,
            u.created_at,
            COUNT(rl.id) AS enabled_listings
        FROM users u
        JOIN stores s ON s.user_id = u.id AND s.is_active = TRUE
        JOIN repricer_listings rl
          ON rl.store_id = s.id AND rl.repricing_enabled = TRUE
        WHERE u.plan IN ('starter', 'pro', 'scale')
          AND u.is_active = TRUE
          AND u.email_unsubscribed = FALSE
          AND u.payment_status = 'ok'
        GROUP BY u.id, u.email, u.plan, u.listing_limit, u.created_at
        HAVING u.listing_limit > 0
           AND COUNT(rl.id)::float / u.listing_limit >= 0.8
        ORDER BY COUNT(rl.id)::float / u.listing_limit DESC
    """
    rows = run_query(cur, sql)
    results = []
    for r in rows:
        plan = r["plan"]
        limit = r["listing_limit"] or PLAN_LIMIT.get(plan, 25)
        utilization = round(r["enabled_listings"] / limit, 3) if limit else 0
        next_plan = UPSELL_TO.get(plan)
        mrr_gain = (PLAN_PRICE.get(next_plan, 0) - PLAN_PRICE.get(plan, 0)) if next_plan else 0
        results.append({
            "email": r["email"],
            "plan": plan,
            "listing_limit": limit,
            "enabled_listings": r["enabled_listings"],
            "utilization_pct": round(utilization * 100, 1),
            "recommended_upgrade": next_plan,
            "mrr_gain": mrr_gain,
        })
    return results


def segment_c(cur):
    """Sign-ups in the last 30 days who have not completed core onboarding.

    Onboarding is considered complete when the user has:
      1. Connected at least one active store, AND
      2. At least one listing with repricing_enabled = TRUE.
    """
    sql = """
        SELECT
            u.id,
            u.email,
            u.plan,
            u.created_at,
            u.trial_ends_at,
            COUNT(DISTINCT s.id)  AS stores_connected,
            COUNT(DISTINCT rl.id) AS enabled_listings
        FROM users u
        LEFT JOIN stores s  ON s.user_id = u.id AND s.is_active = TRUE
        LEFT JOIN repricer_listings rl
               ON rl.store_id = s.id AND rl.repricing_enabled = TRUE
        WHERE u.created_at >= NOW() - INTERVAL '30 days'
          AND u.is_active = TRUE
          AND u.email_unsubscribed = FALSE
        GROUP BY u.id, u.email, u.plan, u.created_at, u.trial_ends_at
        HAVING COUNT(DISTINCT s.id) = 0
            OR COUNT(DISTINCT rl.id) = 0
        ORDER BY u.created_at DESC
    """
    rows = run_query(cur, sql)
    results = []
    for r in rows:
        days_since_signup = (NOW - r["created_at"]).days if r["created_at"] else 0
        trial_days_left = None
        if r["trial_ends_at"]:
            td = (r["trial_ends_at"] - NOW).days
            trial_days_left = max(0, td)

        # Determine where they dropped off
        if r["stores_connected"] == 0:
            stuck_at = "no_store_connected"
        else:
            stuck_at = "store_connected_no_listings"

        results.append({
            "email": r["email"],
            "plan": r["plan"],
            "days_since_signup": days_since_signup,
            "trial_days_left": trial_days_left,
            "stores_connected": r["stores_connected"],
            "enabled_listings": r["enabled_listings"],
            "stuck_at": stuck_at,
        })
    return results


def mrr_impact(a_rows, b_rows, c_rows, conversion_rate_a=0.10, conversion_rate_c=0.08):
    """
    Conservative conversion assumptions (adjust to actuals):
      - Segment A (free/trial engaged): 10 % convert to next tier
      - Segment B (near-limit paid):    50 % upsell (high-intent)
      - Segment C (onboarding dropout): 8 % complete onboarding → then 20 % pay
    """
    gain_a = sum(r["mrr_gain"] for r in a_rows) * conversion_rate_a
    gain_b = sum(r["mrr_gain"] for r in b_rows) * 0.50
    # Onboarding completers who then convert: assumed 20 % go to Starter ($29)
    gain_c = len(c_rows) * conversion_rate_c * 0.20 * 29
    return {
        "segment_a_mrr_gain": round(gain_a, 2),
        "segment_b_mrr_gain": round(gain_b, 2),
        "segment_c_mrr_gain": round(gain_c, 2),
        "total_mrr_gain": round(gain_a + gain_b + gain_c, 2),
        "assumptions": {
            "a_conversion_rate": conversion_rate_a,
            "b_conversion_rate": 0.50,
            "c_onboarding_completion_rate": conversion_rate_c,
            "c_post_onboarding_paid_rate": 0.20,
        },
    }


def main():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    cur = conn.cursor()

    a = segment_a(cur)
    b = segment_b(cur)
    c = segment_c(cur)
    impact = mrr_impact(a, b, c)

    report = {
        "generated_at": NOW.isoformat() + "Z",
        "summary": {
            "segment_a_count": len(a),
            "segment_b_count": len(b),
            "segment_c_count": len(c),
            **impact,
        },
        "segment_a_engaged_free_trial": a,
        "segment_b_near_limit_paid": b,
        "segment_c_onboarding_incomplete": c,
    }

    print(json.dumps(report, indent=2, default=str))
    cur.close()
    conn.close()


if __name__ == "__main__":
    main()
