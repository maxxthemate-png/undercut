"""The pricing engine's core promises, as unit tests.

compute_price is the whole product: undercut the lowest competitor, NEVER go
below the floor, respect the ceiling, and actually take one-cent moves (the
most common repricing action — float epsilon used to skip ~half of them).
"""
from datetime import date, timedelta

from backend.services.repricer import PricingInputs, compute_price, compute_streak_days


def test_floor_is_hard_clamp_and_flagged():
    d = compute_price(PricingInputs(current_price=30, competitor_low=10, floor=25))
    assert d.new_price == 25.0
    assert d.floored is True
    assert d.changed is True


def test_amount_undercut_beats_competitor_by_a_penny():
    d = compute_price(PricingInputs(current_price=30, competitor_low=20, floor=5))
    assert d.new_price == 19.99
    assert d.floored is False


def test_percent_undercut_math():
    d = compute_price(PricingInputs(current_price=200, competitor_low=100, floor=5,
                                    undercut_type="percent", undercut_value=5))
    assert d.new_price == 95.0


def test_one_cent_move_is_taken_not_skipped_by_float_epsilon():
    # |10.00 - 10.01| < 0.01 in IEEE754 — the exact bug: the winning one-cent
    # move computed changed=False and the listing sat 1 cent above forever.
    d = compute_price(PricingInputs(current_price=10.01, competitor_low=10.01, floor=1))
    assert d.new_price == 10.00
    assert d.changed is True
    # a couple more price points that hit the same epsilon trap
    for cur, comp in ((2.13, 2.13), (8.32, 8.32), (19.99, 19.99)):
        d = compute_price(PricingInputs(current_price=cur, competitor_low=comp, floor=0.5))
        assert d.changed is True, f"one-cent move skipped at {cur}"


def test_no_move_when_price_already_right():
    d = compute_price(PricingInputs(current_price=19.99, competitor_low=20.00, floor=5))
    assert d.changed is False


def test_no_competitor_holds_current():
    d = compute_price(PricingInputs(current_price=42.0, competitor_low=None, floor=10))
    assert d.new_price == 42.0
    assert d.changed is False


def test_ceiling_caps_target():
    d = compute_price(PricingInputs(current_price=10, competitor_low=100, floor=5, ceiling=50))
    assert d.new_price == 50.0


def test_floor_beats_ceiling_when_rules_conflict():
    # ceiling < floor is a broken rule state; the FLOOR is the hard guarantee —
    # applying ceiling last used to price below floor here.
    d = compute_price(PricingInputs(current_price=30, competitor_low=40, floor=25, ceiling=20))
    assert d.new_price == 25.0
    assert d.floored is True


def test_ai_target_still_clamped_to_floor():
    d = compute_price(PricingInputs(current_price=30, competitor_low=28, floor=20, ai_target=5.0))
    assert d.new_price == 20.0
    assert d.floored is True


# ---- compute_streak_days — the dashboard's "consecutive days protected" badge ----

TODAY = date(2026, 8, 18)


def test_streak_counts_consecutive_days_ending_today():
    active = {TODAY, TODAY - timedelta(days=1), TODAY - timedelta(days=2)}
    assert compute_streak_days(active, TODAY) == 3


def test_streak_does_not_break_if_today_has_no_activity_yet():
    # yesterday and the day before were active, today's cron hasn't run yet —
    # the streak should still read 2, not reset to 0 mid-day.
    active = {TODAY - timedelta(days=1), TODAY - timedelta(days=2)}
    assert compute_streak_days(active, TODAY) == 2


def test_streak_breaks_on_a_missed_day():
    # active 3 days ago, then a gap, then active yesterday+today: the streak
    # is 2, not 4 — the gap must actually break it.
    active = {TODAY, TODAY - timedelta(days=1), TODAY - timedelta(days=3)}
    assert compute_streak_days(active, TODAY) == 2


def test_streak_zero_when_no_recent_activity():
    active = {TODAY - timedelta(days=5)}
    assert compute_streak_days(active, TODAY) == 0


def test_streak_zero_when_never_active():
    assert compute_streak_days(set(), TODAY) == 0


def test_streak_single_active_day_is_one():
    assert compute_streak_days({TODAY}, TODAY) == 1
