"""Season Pass — one-time, non-recurring access.

Captures the properties that matter: a paid pass grants access without a Stripe
subscription, is not downgraded by trial expiry or a dunning state on a separate
subscription (it was paid for outright), extends rather than overwrites, and
expires cleanly.
"""
from datetime import datetime, timedelta

from backend.services import billing


class U:
    """Minimal user stand-in — effective_access/grant_pass are pure attribute logic."""
    def __init__(self, **kw):
        self.plan = "free"
        self.listing_limit = billing.FREE_LIMIT
        self.trial_ends_at = None
        self.payment_status = "ok"
        self.payment_failed_at = None
        self.pass_expires_at = None
        self.pass_plan = None
        self.__dict__.update(kw)


def test_pass_grants_starter_access_without_a_subscription():
    u = U()
    billing.grant_pass(u)
    plan, limit = billing.effective_access(u)
    assert plan == "starter"
    assert limit == billing.limit_for_plan("starter")
    assert u.pass_expires_at > datetime.utcnow() + timedelta(days=billing.PASS_DAYS - 1)


def test_expired_trial_does_not_downgrade_a_paid_pass():
    """The failure mode worth guarding: someone buys a pass during their trial,
    the trial lapses, and the paid access they bought silently evaporates."""
    u = U(plan=billing.TRIAL_PLAN, trial_ends_at=datetime.utcnow() - timedelta(days=1))
    billing.grant_pass(u)
    plan, limit = billing.effective_access(u)
    assert plan == "starter" and limit == billing.limit_for_plan("starter")


def test_dunning_on_a_separate_subscription_does_not_kill_the_pass():
    u = U(plan="starter", listing_limit=billing.limit_for_plan("starter"),
          payment_status="past_due",
          payment_failed_at=datetime.utcnow() - timedelta(days=365))
    billing.grant_pass(u)
    plan, _ = billing.effective_access(u)
    assert plan == "starter"


def test_expired_pass_falls_back_to_the_stored_plan():
    u = U(pass_expires_at=datetime.utcnow() - timedelta(days=1), pass_plan="starter")
    assert billing.pass_active(u) is False
    plan, limit = billing.effective_access(u)
    assert plan == "free" and limit == billing.FREE_LIMIT


def test_buying_a_second_pass_extends_rather_than_overwrites():
    u = U()
    billing.grant_pass(u)
    first = u.pass_expires_at
    billing.grant_pass(u)
    assert u.pass_expires_at > first, "a second pass must add time, not replace it"


def test_pass_never_downgrades_a_better_paid_plan():
    """A Scale subscriber who also buys a pass must keep Scale limits."""
    u = U(plan="scale", listing_limit=billing.limit_for_plan("scale"))
    billing.grant_pass(u)
    plan, limit = billing.effective_access(u)
    assert plan == "scale" and limit == billing.limit_for_plan("scale")
