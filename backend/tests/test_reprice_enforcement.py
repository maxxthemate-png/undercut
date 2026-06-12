"""Verifies the two dark revenue flags' decision logic before they're flipped on.

`reprice_all` gates plan-based throttling behind REPRICER_TIER_FREQUENCY and
per-user listing budgets behind REPRICER_ENFORCE_PLAN_LIMITS (both default off).
The decisions themselves live in two PURE helpers in billing.py, which this file
exercises across every branch — so flipping the env flags on in production has
verified, predictable behavior, and flipping them back off is a no-op by design
(reprice_all never writes repricing_enabled; enforcement is evaluation-time only).

Runnable two ways (no pytest required):
    backend/venv/bin/python -m pytest backend/tests/test_reprice_enforcement.py -q
    backend/venv/bin/python backend/tests/test_reprice_enforcement.py
"""
import os
import sys
from datetime import datetime, timedelta

# allow running as a plain script: make `backend` importable as a package root
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
# settings require these at import time; harmless dummies for a pure-logic test
os.environ.setdefault("ANTHROPIC_API_KEY", "test")
os.environ.setdefault("DATABASE_URL", "sqlite://")

from backend.services import billing  # noqa: E402

NOW = datetime(2026, 6, 11, 12, 0, 0)


# ---- freq_should_skip ----------------------------------------------------
def test_freq_scale_never_skips():
    # scale has interval 0 -> always allowed, even one second after a run
    assert billing.freq_should_skip("scale", NOW - timedelta(seconds=1), NOW) is False


def test_freq_never_run_does_not_skip():
    # a store that has never been repriced must run regardless of plan
    assert billing.freq_should_skip("starter", None, NOW) is False


def test_freq_starter_skips_inside_window_runs_after():
    # starter interval = 55 min
    assert billing.freq_should_skip("starter", NOW - timedelta(minutes=10), NOW) is True
    assert billing.freq_should_skip("starter", NOW - timedelta(minutes=54), NOW) is True
    assert billing.freq_should_skip("starter", NOW - timedelta(minutes=56), NOW) is False


def test_freq_pro_window_is_shorter_than_starter():
    # pro = 12 min: still allowed at 13 min where starter would still be blocked
    assert billing.freq_should_skip("pro", NOW - timedelta(minutes=5), NOW) is True
    assert billing.freq_should_skip("pro", NOW - timedelta(minutes=13), NOW) is False
    assert billing.freq_should_skip("starter", NOW - timedelta(minutes=13), NOW) is True


def test_freq_unknown_plan_defaults_to_55():
    assert billing.freq_should_skip("mystery", NOW - timedelta(minutes=30), NOW) is True
    assert billing.freq_should_skip("mystery", NOW - timedelta(minutes=60), NOW) is False


# ---- plan_budget_take ----------------------------------------------------
def test_budget_under_limit_takes_all():
    assert billing.plan_budget_take(100, 40) == (40, 0)


def test_budget_exactly_at_limit_takes_all():
    assert billing.plan_budget_take(40, 40) == (40, 0)


def test_budget_over_limit_caps_and_skips_remainder():
    # 120 listings, 100 budget -> take 100, skip 20
    assert billing.plan_budget_take(100, 120) == (100, 20)


def test_budget_exhausted_skips_everything():
    assert billing.plan_budget_take(0, 30) == (0, 30)
    assert billing.plan_budget_take(-5, 30) == (0, 30)


def test_budget_drains_across_multiple_stores():
    # one user, limit 100, three stores of 60/60/60 processed in sequence.
    # Mirrors reprice_all's per-user budget bookkeeping.
    remaining = 100
    taken, skipped = [], []
    for group_len in (60, 60, 60):
        take, skip = billing.plan_budget_take(remaining, group_len)
        remaining -= take
        taken.append(take)
        skipped.append(skip)
    assert taken == [60, 40, 0]          # 1st store full, 2nd capped, 3rd starved
    assert skipped == [0, 20, 60]
    assert sum(taken) == 100             # never exceeds the plan limit
    assert sum(taken) + sum(skipped) == 180


# ---- the plan maps match the public pricing -------------------------------
def test_plan_limits_match_pricing_page():
    assert billing.PLANS["starter"]["listing_limit"] == 100
    assert billing.PLANS["pro"]["listing_limit"] == 1000
    assert billing.PLANS["scale"]["listing_limit"] == 10000
    assert billing.FREE_LIMIT == 25


def test_interval_map_orders_plans_correctly():
    iv = billing.PLAN_REPRICE_INTERVAL_MIN
    # scale fastest (every cycle), pro faster than starter/free
    assert iv["scale"] == 0
    assert iv["pro"] < iv["starter"]
    assert iv["starter"] == iv["free"]


if __name__ == "__main__":
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_") and callable(v)]
    failed = 0
    for fn in fns:
        try:
            fn()
            print(f"  ok   {fn.__name__}")
        except AssertionError as e:
            failed += 1
            print(f"  FAIL {fn.__name__}: {e or 'assertion failed'}")
    print(f"\n{len(fns) - failed}/{len(fns)} passed")
    sys.exit(1 if failed else 0)
