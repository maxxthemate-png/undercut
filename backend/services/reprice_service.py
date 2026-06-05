"""The repricing run — orchestrates the whole loop per listing:

  competitor low (eBay Browse) -> optional AI advisor -> compute price (engine,
  clamped to floor/ceiling) -> if changed, push to eBay + log PriceChange.

Multi-tenant: each Store reprices with its own OAuth token.
"""
import uuid as _uuid
from datetime import datetime, timedelta
from collections import defaultdict

from sqlalchemy import select

from ..models.database import SessionLocal
from ..models.repricer_models import Store, RepricerListing, PriceChange, CompetitorSnapshot
from ..services.repricer import PricingInputs, compute_price
from ..services.ebay_store import EbayStoreClient
from ..services import ebay_oauth
from ..agents.pricing_advisor import recommend_price
from ..utils.logging import get_logger

logger = get_logger(__name__)


async def reprice_listing(client: EbayStoreClient, db, listing: RepricerListing,
                          store_ai_enabled: bool) -> dict:
    """Reprice one listing. Returns a result dict."""
    if not listing.floor_price:
        return {"item": listing.ebay_item_id, "changed": False, "error": "no floor set"}

    comp = await client.get_competitor_low(listing.title or "")
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
        db.add(PriceChange(listing_id=listing.id, old_price=listing.current_price,
                           new_price=decision.new_price, competitor_low=low,
                           source=source, reason=decision.reason))
        listing.current_price = decision.new_price
        listing.last_repriced_at = datetime.utcnow()
        db.commit()
        logger.info("repriced", item=listing.ebay_item_id, new_price=decision.new_price, source=source)
        return {"item": listing.ebay_item_id, "changed": True,
                "new_price": decision.new_price, "source": source, "reason": decision.reason}
    db.commit()
    return {"item": listing.ebay_item_id, "changed": False, "error": res.get("error")}



async def _ensure_fresh_token(db, store) -> None:
    """Refresh a store's eBay OAuth access token if it has expired."""
    exp = store.token_expires_at
    if store.oauth_refresh_token and exp and exp <= datetime.utcnow():
        tok = await ebay_oauth.refresh(store.oauth_refresh_token)
        if tok.get("access_token"):
            store.oauth_access_token = tok["access_token"]
            store.token_expires_at = datetime.utcnow() + timedelta(seconds=int(tok.get("expires_in", 7200)))
            db.commit()
            logger.info("refreshed eBay token", store=str(store.id))


async def reprice_all() -> dict:
    """Reprice every enabled listing across all stores."""
    db = SessionLocal()
    try:
        listings = db.scalars(
            select(RepricerListing).where(RepricerListing.repricing_enabled.is_(True))
        ).all()
        by_store: dict = defaultdict(list)
        for l in listings:
            by_store[l.store_id].append(l)

        results = []
        for store_id, group in by_store.items():
            store = db.get(Store, store_id)
            if store:
                await _ensure_fresh_token(db, store)
            token = store.oauth_access_token if (store and store.oauth_access_token) else None
            client = EbayStoreClient(user_token=token)
            ai_enabled = store.ai_enabled if store else True
            for l in group:
                try:
                    results.append(await reprice_listing(client, db, l, ai_enabled))
                except Exception as e:
                    logger.error("reprice failed", item=l.ebay_item_id, error=str(e))
                    results.append({"item": l.ebay_item_id, "changed": False, "error": str(e)})
        return {"checked": len(results),
                "repriced": sum(1 for r in results if r.get("changed")),
                "results": results}
    finally:
        db.close()
