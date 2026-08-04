"""Founder metrics dashboard — internal aggregate business stats (read-only).

Protected by the UNDERCUT_API_KEY via the `X-Admin-Key` header (same secret the
scheduled cron uses). No PII beyond masked emails is returned.
"""
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import User, Store, RepricerListing, PriceChange, CompetitorSnapshot, Lead, RepriceRun
from ..services import auth, billing
from ..utils.settings import settings
from ..utils.keys import key_ok

router = APIRouter(prefix="/api/admin", tags=["admin"])
public_router = APIRouter(prefix="/api/admin", tags=["admin-public"])

# starter/pro/scale -> monthly price (for MRR); trial/free contribute 0
PLAN_PRICE = {pid: p["price"] for pid, p in billing.PLANS.items()}


def _require_admin(x_admin_key: str | None):
    # Accept a dedicated ADMIN_KEY (preferred, single-sourced in the env group) or
    # fall back to UNDERCUT_API_KEY for backward compatibility. Constant-time compare.
    if not key_ok(x_admin_key, getattr(settings, "ADMIN_KEY", None), settings.UNDERCUT_API_KEY):
        raise HTTPException(status_code=403, detail="invalid admin key")


def _mask(email: str | None) -> str:
    if not email or "@" not in email:
        return email or ""
    user, domain = email.split("@", 1)
    return (user[:2] + "***") + "@" + domain


@router.get("/ebay-selftest")
async def ebay_selftest(x_admin_key: str | None = Header(default=None)):
    """Diagnostic: does the configured eBay keyset reach + have access to the
    Trading API, and are we on prod or sandbox? No seller token required."""
    _require_admin(x_admin_key)
    from ..services.ebay_store import EbayStoreClient
    return await EbayStoreClient(use_operator_token=True).trading_selftest()


@router.get("/stores")
def list_all_stores(x_admin_key: str | None = Header(default=None), db: Session = Depends(get_db)):
    """Every connected store with its import state. A bare COUNT(*) could not
    answer the question that actually matters — has a REAL seller ever connected,
    and did their listings import? — so a month of dead stores looked like traffic."""
    _require_admin(x_admin_key)
    from ..utils.crypto import decrypt_token
    rows = db.execute(select(Store, User.email).join(User, Store.user_id == User.id)).all()
    out = []
    for s, email in rows:
        local, _, domain = (email or "").partition("@")
        out.append({
            "id": str(s.id),
            "name": s.name,
            "owner": f"{local[:2]}***@{domain}",
            "is_test_account": domain in ("undercut.test", "example.com"),
            "connected_at": s.connected_at.isoformat() if s.connected_at else None,
            "has_token": bool(s.oauth_access_token),
            "token_decrypts": bool(decrypt_token(s.oauth_access_token)) if s.oauth_access_token else False,
            "token_expires_at": s.token_expires_at.isoformat() if s.token_expires_at else None,
            "listings": db.scalar(select(func.count()).select_from(RepricerListing)
                                  .where(RepricerListing.store_id == s.id)) or 0,
            "last_import_at": s.last_import_at.isoformat() if s.last_import_at else None,
            "last_import_count": s.last_import_count,
            "last_import_error": s.last_import_error,
            "last_reprice_run_at": s.last_reprice_run_at.isoformat() if s.last_reprice_run_at else None,
        })
    real = [s for s in out if not s["is_test_account"]]
    return {"stores": out, "total": len(out), "real_sellers": len(real),
            "real_sellers_with_listings": len([s for s in real if s["listings"] > 0])}


@router.get("/paid-users")
def list_paid_users(x_admin_key: str | None = Header(default=None), db: Session = Depends(get_db)):
    """Every user on a paid plan, with enough to tell a real subscriber from the
    founder's own test checkout — masked email, domain, and whether they have a
    connected store (a real customer almost always connects eBay; the founder's
    test accounts are the known internal domains)."""
    _require_admin(x_admin_key)
    users = db.scalars(select(User).where(User.plan.in_(list(PLAN_PRICE.keys())))).all()
    out = []
    for u in users:
        local, _, domain = (u.email or "").partition("@")
        has_store = db.scalar(select(func.count()).select_from(Store)
                              .where(Store.user_id == u.id)) or 0
        out.append({
            "email": f"{local[:2]}***@{domain}",
            "domain": domain,
            "plan": u.plan,
            "stripe_customer_id": u.stripe_customer_id,
            "stripe_subscription_id": u.stripe_subscription_id,
            "has_stripe_ids": bool(u.stripe_customer_id and u.stripe_subscription_id),
            "connected_stores": has_store,
            "created_at": u.created_at.isoformat() if u.created_at else None,
            "payment_status": u.payment_status,
        })
    return {"paid_users": out}


@router.post("/cancel-subscription")
def cancel_subscription(subscription_id: str, x_admin_key: str | None = Header(default=None),
                        db: Session = Depends(get_db)):
    """Cancel one specific Stripe subscription by ID (owner-invoked, e.g. to stop
    billing the founder's own test checkout). Deliberately requires the exact
    subscription_id rather than a user id — this is a narrow, one-off tool, not a
    generic cancel-any-subscription endpoint."""
    _require_admin(x_admin_key)
    import stripe
    user = db.scalar(select(User).where(User.stripe_subscription_id == subscription_id))
    if not user:
        raise HTTPException(status_code=404, detail="No user has this subscription_id on file.")
    try:
        sub = stripe.Subscription.cancel(subscription_id)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Stripe rejected the cancellation: {e}")
    user.plan = "free"
    user.listing_limit = billing.FREE_LIMIT
    user.stripe_subscription_id = None
    db.commit()
    return {"cancelled": True, "stripe_status": sub.get("status"),
            "user_email_domain": (user.email or "").partition("@")[2],
            "user_plan_now": user.plan}


@router.get("/metrics")
def metrics(x_admin_key: str | None = Header(default=None), db: Session = Depends(get_db)):
    _require_admin(x_admin_key)
    now = datetime.utcnow()
    d7 = now - timedelta(days=7)

    # Users by plan + active trials
    plan_rows = db.execute(select(User.plan, func.count()).group_by(User.plan)).all()
    by_plan = {(plan or "free"): int(n) for plan, n in plan_rows}
    users_total = sum(by_plan.values())
    active_trials = db.scalar(
        select(func.count()).select_from(User)
        .where(User.plan == billing.TRIAL_PLAN, User.trial_ends_at > now)) or 0

    # MRR = paid-plan headcount × price
    mrr = sum(by_plan.get(pid, 0) * price for pid, price in PLAN_PRICE.items())

    # Leads
    leads_total = db.scalar(select(func.count()).select_from(Lead)) or 0
    leads_7d = db.scalar(select(func.count()).select_from(Lead).where(Lead.created_at >= d7)) or 0
    src_rows = db.execute(select(Lead.source, func.count()).group_by(Lead.source)).all()
    leads_by_source = {(s or "unknown"): int(n) for s, n in src_rows}

    # Stores + listings
    stores_total = db.scalar(select(func.count()).select_from(Store)) or 0
    listings_total = db.scalar(select(func.count()).select_from(RepricerListing)) or 0
    listings_active = db.scalar(
        select(func.count()).select_from(RepricerListing)
        .where(RepricerListing.repricing_enabled.is_(True))) or 0

    # Reprices (price changes)
    reprices_total = db.scalar(select(func.count()).select_from(PriceChange)) or 0
    reprices_7d = db.scalar(select(func.count()).select_from(PriceChange).where(PriceChange.created_at >= d7)) or 0

    # 14-day daily reprice series (for the chart)
    series = []
    for i in range(13, -1, -1):
        start = (now - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
        end = start + timedelta(days=1)
        c = db.scalar(select(func.count()).select_from(PriceChange)
                      .where(PriceChange.created_at >= start, PriceChange.created_at < end)) or 0
        series.append({"date": start.strftime("%m/%d"), "reprices": int(c)})

    recent_leads = db.scalars(select(Lead).order_by(Lead.created_at.desc()).limit(8)).all()
    recent_signups = db.scalars(select(User).order_by(User.created_at.desc()).limit(8)).all()

    # Funnel rates
    signed_up = db.scalar(select(func.count()).select_from(Lead).where(Lead.email.in_(select(User.email)))) or 0
    paid_total = sum(by_plan.get(pid, 0) for pid in PLAN_PRICE)
    expired_trials = db.scalar(
        select(func.count()).select_from(User)
        .where(User.trial_ends_at.isnot(None), User.trial_ends_at <= now)) or 0
    _trial_denom = paid_total + int(active_trials) + int(expired_trials)

    return {
        "generated_at": now.isoformat() + "Z",
        "mrr": mrr,
        "users": {"total": users_total, "by_plan": by_plan, "active_trials": int(active_trials)},
        "leads": {"total": int(leads_total), "last_7d": int(leads_7d), "by_source": leads_by_source},
        "stores": int(stores_total),
        "listings": {"total": int(listings_total), "repricing_enabled": int(listings_active)},
        "reprices": {"total": int(reprices_total), "last_7d": int(reprices_7d), "series": series},
        "recent_leads": [{"email": _mask(l.email), "source": l.source,
                          "at": l.created_at.isoformat() if l.created_at else None} for l in recent_leads],
        "recent_signups": [{"email": _mask(u.email), "plan": u.plan,
                            "at": u.created_at.isoformat() if u.created_at else None} for u in recent_signups],
        "funnel": {
            "leads": int(leads_total),
            "lead_to_signup": int(signed_up),
            "lead_to_signup_rate": round(signed_up / leads_total, 3) if leads_total else 0,
            "signups": int(users_total),
            "paid": int(paid_total),
            "active_trials": int(active_trials),
            "expired_trials": int(expired_trials),
            "trial_to_paid_rate": round(paid_total / _trial_denom, 3) if _trial_denom else 0,
        },
        "churn": {
            "churned_paid": int(db.scalar(
                select(func.count()).select_from(User)
                .where(User.stripe_customer_id.isnot(None), User.plan == "free")) or 0),
            "past_due": int(db.scalar(
                select(func.count()).select_from(User)
                .where(User.payment_status == "past_due")) or 0)
            if hasattr(User, "payment_status") else 0,
        },
        "cohorts": _cohorts(db, now),
        "source_funnel": _source_funnel(db),
        "email_health": {
            "users_unsubscribed": int(db.scalar(
                select(func.count()).select_from(User).where(User.email_unsubscribed.is_(True))) or 0),
            "leads_unsubscribed": int(db.scalar(
                select(func.count()).select_from(Lead).where(Lead.email_unsubscribed.is_(True))) or 0),
        },
        "repricer_health": {
            "listings_failing": int(db.scalar(
                select(func.count()).select_from(RepricerListing)
                .where(RepricerListing.consecutive_failures >= 3)) or 0),
            "last_run_at": (lambda r: r.ran_at.isoformat() if r and r.ran_at else None)(
                db.scalars(select(RepriceRun).order_by(RepriceRun.ran_at.desc()).limit(1)).first()),
        },
    }


def _cohorts(db: Session, now: datetime) -> list[dict]:
    """Last 8 ISO weeks of signups: count + how many are paid now."""
    out = []
    for w in range(7, -1, -1):
        start = (now - timedelta(weeks=w + 1))
        end = now - timedelta(weeks=w)
        users = db.scalars(select(User).where(User.created_at >= start, User.created_at < end)).all()
        paid = sum(1 for u in users if u.plan in billing.PLANS)
        out.append({"week_start": start.strftime("%m/%d"), "signups": len(users), "paid_now": paid})
    return out


def _source_funnel(db: Session) -> list[dict]:
    """Per lead source: leads → became users → became paid."""
    out = []
    for src, n in db.execute(select(Lead.source, func.count()).group_by(Lead.source)).all():
        emails = set(db.scalars(select(Lead.email).where(Lead.source == src)).all())
        if not emails:
            continue
        users = db.scalars(select(User).where(User.email.in_(emails))).all()
        out.append({"source": src or "unknown", "leads": int(n), "signups": len(users),
                    "paid": sum(1 for u in users if u.plan in billing.PLANS)})
    return sorted(out, key=lambda r: -r["leads"])


@router.get("/gating-preview")
def gating_preview(x_admin_key: str | None = Header(default=None), db: Session = Depends(get_db)):
    """Read-only preview of what plan/frequency enforcement WOULD do — check this
    against live data before flipping REPRICER_ENFORCE_PLAN_LIMITS / _TIER_FREQUENCY."""
    _require_admin(x_admin_key)
    out = []
    for u in db.scalars(select(User)).all():
        store_ids = [s.id for s in db.scalars(select(Store).where(Store.user_id == u.id)).all()]
        if not store_ids:
            continue
        enabled = int(db.scalar(
            select(func.count()).select_from(RepricerListing)
            .where(RepricerListing.store_id.in_(store_ids),
                   RepricerListing.repricing_enabled.is_(True))) or 0)
        if not enabled:
            continue
        plan, limit = billing.effective_access(u)
        out.append({
            "email": _mask(u.email),
            "stored_plan": u.plan,
            "effective_plan": plan,
            "effective_limit": limit,
            "enabled_listings": enabled,
            "would_skip_over_limit": max(0, enabled - limit),
            "frequency_interval_min": billing.PLAN_REPRICE_INTERVAL_MIN.get(plan, 55),
        })
    return {"users": out,
            "flags": {"enforce_plan_limits": settings.REPRICER_ENFORCE_PLAN_LIMITS,
                      "tier_frequency": settings.REPRICER_TIER_FREQUENCY}}


@public_router.get("/public-stats")
def public_stats(db: Session = Depends(get_db)):
    """Public, non-sensitive vanity stats for social proof (no PII, no revenue, no auth).
    Safe to surface on the marketing site, e.g. 'N prices optimized and counting'."""
    reprices = db.scalar(select(func.count()).select_from(PriceChange)) or 0
    sellers = db.scalar(select(func.count()).select_from(Store)) or 0
    listings = db.scalar(select(func.count()).select_from(RepricerListing)) or 0
    return {"reprices": int(reprices), "sellers": int(sellers), "listings_managed": int(listings)}


# --- demo seeding (internal verification tooling) --------------------------
_DEMO_TITLES = [
    "Refurbished Wireless Earbuds", "Vintage Levi's Denim Jacket", "Mechanical Keyboard 75%",
    "Pokemon Booster Box (Sealed)", "OEM Brake Caliper - Front Left", "Nintendo Switch OLED",
    "Cast Iron Dutch Oven 6Qt", "Carbon Road Bike Wheelset", "RTX Graphics Card",
    "Leather Messenger Bag", "Cordless Impact Driver Kit", "Air Jordan 1 Retro - 10.5",
    "Standing Desk Frame (Dual Motor)", "Noise-Cancelling Headphones", "Espresso Machine - Stainless",
]


class SeedDemoBody(BaseModel):
    email: str = "demo@undercut.test"
    password: str = "undercut-demo-1234"
    plan: str = "free"        # free | starter | pro | scale (sets listing_limit)
    listings: int = 40        # seed > limit to exercise the over-limit upgrade nudge
    reset: bool = True        # wipe this demo account's stores/listings first
    wipe: bool = False        # delete the demo user + all its data, then stop (no recreate)


@router.post("/seed-demo")
def seed_demo(body: SeedDemoBody, x_admin_key: str | None = Header(default=None), db: Session = Depends(get_db)):
    """Create/refresh a DEMO account with synthetic listings so the dashboard
    (limit nudge, repricing UI) can be verified end-to-end without a real eBay
    store. Key-gated. SAFETY: only touches obvious demo emails so it can never
    clobber a real customer's data."""
    _require_admin(x_admin_key)
    email = body.email.strip().lower()
    # SAFETY: only the dedicated demo domain. The `wipe` path hard-deletes the
    # user + all data, so a permissive guard (e.g. substring "demo") could nuke a
    # real account like demo.store@gmail.com. Require @undercut.test, full stop.
    if not email.endswith("@undercut.test"):
        raise HTTPException(status_code=400, detail="seed-demo only operates on @undercut.test accounts")

    def _purge_user_data(u):
        """Delete a demo user's stores/listings and dependent rows. Returns counts."""
        store_ids = [s.id for s in db.scalars(select(Store).where(Store.user_id == u.id)).all()]
        n_listings = 0
        if store_ids:
            lids = [l.id for l in db.scalars(select(RepricerListing).where(RepricerListing.store_id.in_(store_ids))).all()]
            n_listings = len(lids)
            if lids:
                db.query(PriceChange).filter(PriceChange.listing_id.in_(lids)).delete(synchronize_session=False)
                db.query(CompetitorSnapshot).filter(CompetitorSnapshot.listing_id.in_(lids)).delete(synchronize_session=False)
                db.query(RepricerListing).filter(RepricerListing.id.in_(lids)).delete(synchronize_session=False)
            db.query(Store).filter(Store.id.in_(store_ids)).delete(synchronize_session=False)
        return len(store_ids), n_listings

    # Full delete: remove the demo user + all its data, then stop (keeps prod metrics clean).
    if body.wipe:
        user = db.scalar(select(User).where(User.email == email))
        if not user:
            return {"wiped": True, "email": email, "note": "no such demo user"}
        stores_deleted, listings_deleted = _purge_user_data(user)
        db.query(User).filter(User.id == user.id).delete(synchronize_session=False)
        db.commit()
        return {"wiped": True, "email": email, "stores_deleted": stores_deleted, "listings_deleted": listings_deleted}

    n = max(1, min(int(body.listings), 500))
    plan = body.plan if body.plan in ("free", "starter", "pro", "scale") else "free"
    limit = billing.limit_for_plan(plan)

    user = db.scalar(select(User).where(User.email == email))
    if user and body.reset:
        _purge_user_data(user)
        db.commit()

    if not user:
        user = User(email=email, password_hash=auth.hash_pw(body.password))
        db.add(user)
    else:
        user.password_hash = auth.hash_pw(body.password)
    user.plan = plan
    user.listing_limit = limit
    user.trial_ends_at = None          # deterministic: no trial banner, just the plan/limit nudge
    user.is_active = True
    db.commit(); db.refresh(user)

    store = Store(user_id=user.id, name="Demo eBay Store", ebay_user_id="demo_seller", is_active=True)
    db.add(store); db.commit(); db.refresh(store)

    for i in range(n):
        base = 20 + (i * 7) % 240                      # spread prices across 20–260
        db.add(RepricerListing(
            store_id=store.id,
            ebay_item_id=f"DEMO{i:05d}", sku=f"DEMO-SKU-{i:04d}",
            title=f"{_DEMO_TITLES[i % len(_DEMO_TITLES)]} #{i + 1}",
            current_price=round(base + 9.99, 2), quantity=1,
            floor_price=round(base * 0.9 + 2, 2),
            undercut_value=0.01, undercut_type="amount",
            # repricing OFF: demo item ids are fake — if seeded in prod with it on,
            # the 15-min cron would burn real Browse quota + doomed Revise calls
            # on them forever and skew /public-stats.
            ai_enabled=True, repricing_enabled=False,
            last_competitor_low=round(base + 4.99, 2),
        ))
    db.commit()

    return {
        "email": email, "password": body.password, "plan": plan,
        "listing_limit": limit, "listings_created": n, "overflow": max(0, n - limit),
        "token": auth.make_token(user),
        "login_url": "https://undercutpricer.com/login",
    }
