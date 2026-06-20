"""The repricing run — orchestrates the whole loop per listing:

  competitor low (eBay Browse) -> optional AI advisor -> compute price (engine,
  clamped to floor/ceiling) -> if changed, push to eBay + log PriceChange.

Multi-tenant: each Store reprices with its own OAuth token.
"""
import time as _time
import uuid as _uuid
from datetime import datetime, timedelta
from collections import defaultdict

from sqlalchemy import select

from ..models.database import SessionLocal
from ..models.repricer_models import Store, RepricerListing, PriceChange, CompetitorSnapshot, User
from ..services.repricer import PricingInputs, compute_price
from ..services.ebay_store import EbayStoreClient
from ..services import ebay_oauth, billing
from ..utils.settings import settings
from ..utils.crypto import encrypt_token, decrypt_token
from ..agents.pricing_advisor import recommend_price
from ..utils.logging import get_logger

logger = get_logger(__name__)

# Operator-alert cooldown so a bad run can't spam the inbox (in-process; single instance).
_ALERT_COOLDOWN_S = 6 * 3600
_last_alert_at = 0.0


def _alert_ok() -> bool:
    global _last_alert_at
    if _time.time() - _last_alert_at < _ALERT_COOLDOWN_S:
        return False
    _last_alert_at = _time.time()
    return True


def _record_failure(db, listing: RepricerListing, error: str) -> None:
    listing.consecutive_failures = (listing.consecutive_failures or 0) + 1
    listing.last_error = (error or "")[:500]
    listing.last_error_at = datetime.utcnow()
    db.commit()


async def reprice_listing(client: EbayStoreClient, db, listing: RepricerListing,
                          store_ai_enabled: bool) -> dict:
    """Reprice one listing. Returns a result dict."""
    if not listing.floor_price:
        return {"item": listing.ebay_item_id, "changed": False, "error": "no floor set"}

    # Pass the listing's known category so the lookup compares apples to apples
    # (a $1 accessory sharing keywords can't drag a real listing toward its floor).
    comp = await client.get_competitor_low(listing.title or "", category_id=listing.category_id)
    low = comp.get("lowest")
    db.add(CompetitorSnapshot(listing_id=listing.id, lowest_price=low,
                              listing_count=comp.get("count", 0)))
    listing.last_competitor_low = low

    ai_target, source = None, "rule"
    if listing.ai_enabled and store_ai_enabled:
        rec = await recommend_price(
            title=listing.title or "", current_price=listing.current_price or 0,
            competitor_low=low, competitor_count=comp.get("count", 0),
            floor=listing.floor_price, ceiling=listing.ceiling_price)
        if rec.get("recommended_price"):
            ai_target = float(rec["recommended_price"])
            source = "ai"

    decision = compute_price(PricingInputs(
        current_price=listing.current_price or 0, competitor_low=low,
        floor=listing.floor_price, ceiling=listing.ceiling_price,
        undercut_value=listing.undercut_value or 0.01,
        undercut_type=listing.undercut_type or "amount", ai_target=ai_target))

    if not decision.changed:
        db.commit()
        return {"item": listing.ebay_item_id, "changed": False, "reason": decision.reason}

    res = await client.update_price(listing.ebay_item_id, decision.new_price, sku=listing.sku)
    if res.get("success"):
        # Value stamp — the dollar proof, from data already in hand (no extra call).
        margin = round((decision.new_price or 0) - (listing.floor_price or 0), 2)
        db.add(PriceChange(listing_id=listing.id, old_price=listing.current_price,
                           new_price=decision.new_price, competitor_low=low,
                           source=source, reason=decision.reason,
                           margin_protected=max(margin, 0.0),
                           floored=bool(decision.floored),
                           is_win=bool(not decision.floored and low is not None)))
        listing.current_price = decision.new_price
        listing.last_repriced_at = datetime.utcnow()
        listing.consecutive_failures = 0
        listing.last_error = None
        db.commit()
        logger.info("repriced", item=listing.ebay_item_id, new_price=decision.new_price, source=source)
        return {"item": listing.ebay_item_id, "changed": True,
                "new_price": decision.new_price, "source": source, "reason": decision.reason}
    _record_failure(db, listing, res.get("error") or "price update failed")
    return {"item": listing.ebay_item_id, "changed": False, "error": res.get("error")}



async def _ensure_fresh_token(db, store) -> None:
    """Refresh a store's eBay OAuth access token if it has expired."""
    exp = store.token_expires_at
    if store.oauth_refresh_token and exp and exp <= datetime.utcnow():
        tok = await ebay_oauth.refresh(decrypt_token(store.oauth_refresh_token))
        if tok.get("access_token"):
            store.oauth_access_token = encrypt_token(tok["access_token"])
            store.token_expires_at = datetime.utcnow() + timedelta(seconds=int(tok.get("expires_in", 7200)))
            db.commit()
            logger.info("refreshed eBay token", store=str(store.id))


async def reprice_all(store_ids: list | None = None) -> dict:
    """Reprice every enabled listing (optionally limited to specific stores).

    Scheduled runs (store_ids=None) additionally honor — when the flags are on —
    plan-based frequency (REPRICER_TIER_FREQUENCY) and per-user listing budgets
    (REPRICER_ENFORCE_PLAN_LIMITS). Manual user runs are never throttled.
    Enforcement is evaluation-time only: repricing_enabled is never written, so
    flipping a flag off restores exactly the previous behavior.
    """
    is_scheduled = store_ids is None
    db = SessionLocal()
    try:
        q = select(RepricerListing).where(RepricerListing.repricing_enabled.is_(True))
        if store_ids:
            q = q.where(RepricerListing.store_id.in_(store_ids))
        listings = db.scalars(q).all()
        by_store: dict = defaultdict(list)
        for l in listings:
            by_store[l.store_id].append(l)

        results = []
        skipped_over_limit = 0
        skipped_frequency = 0
        user_cache: dict = {}
        user_budget: dict = {}
        now = datetime.utcnow()

        for store_id, group in by_store.items():
            store = db.get(Store, store_id)
            if not store:
                continue

            # --- plan/trial enforcement (per owning user) ---
            user = user_cache.get(store.user_id)
            if user is None and store.user_id is not None:
                user = db.get(User, store.user_id)
                user_cache[store.user_id] = user
            if user is not None:
                if billing.normalize_access(user):  # persist expired trial -> free
                    db.commit()
                plan, limit = billing.effective_access(user)

                if settings.REPRICER_TIER_FREQUENCY and is_scheduled:
                    if billing.freq_should_skip(plan, store.last_reprice_run_at, now):
                        skipped_frequency += len(group)
                        continue

                if settings.REPRICER_ENFORCE_PLAN_LIMITS and is_scheduled:
                    budget = user_budget.setdefault(user.id, limit)
                    take, skipped = billing.plan_budget_take(budget, len(group))
                    if skipped:
                        skipped_over_limit += skipped
                    if take < len(group):
                        if take == 0:
                            continue
                        # stalest-first so capped accounts rotate fairly across runs
                        group = sorted(group, key=lambda l: (l.last_repriced_at is not None,
                                                             l.last_repriced_at or datetime.min))[:take]
                    user_budget[user.id] = budget - take

            # Backfill the run stamp even with flags off, so flipping
            # REPRICER_TIER_FREQUENCY on later is safe immediately.
            store.last_reprice_run_at = now
            db.commit()

            await _ensure_fresh_token(db, store)
            token = decrypt_token(store.oauth_access_token) if store.oauth_access_token else None
            if store.oauth_access_token and not token and _alert_ok():
                _operator_alert("Store token unreadable",
                                f"Store {store.id} has a token that won't decrypt — repricing is dead for it.")
            client = EbayStoreClient(user_token=token)
            ai_enabled = store.ai_enabled if store else True
            for l in group:
                try:
                    results.append(await reprice_listing(client, db, l, ai_enabled))
                except Exception as e:
                    logger.error("reprice failed", item=l.ebay_item_id, error=str(e))
                    _record_failure(db, l, str(e))
                    results.append({"item": l.ebay_item_id, "changed": False, "error": str(e)})

        errors = [r for r in results if r.get("error") and r["error"] != "no floor set"]
        if len(results) >= 10 and len(errors) / len(results) >= 0.3 and _alert_ok():
            top = "\n".join(f"- {r['item']}: {r['error'][:120]}" for r in errors[:5])
            _operator_alert("Repricer error rate elevated",
                            f"{len(errors)}/{len(results)} listings failed this run.\nTop errors:\n{top}")

        return {"checked": len(results),
                "repriced": sum(1 for r in results if r.get("changed")),
                "errors": len(errors),
                "skipped_over_limit": skipped_over_limit,
                "skipped_frequency": skipped_frequency,
                "results": results}
    finally:
        db.close()


def _operator_alert(subject: str, body: str) -> None:
    try:
        from ..utils.notifications import send_email_alert
        send_email_alert(subject, body)
    except Exception:
        pass
