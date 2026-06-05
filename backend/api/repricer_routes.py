"""Repricer API — connect a store, import listings, set rules, run repricing."""
import uuid
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select, desc
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import Store, RepricerListing, PriceChange
from ..services.ebay_store import EbayStoreClient
from ..services import ebay_oauth
from ..utils.settings import settings
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/repricer", tags=["repricer"])


def _uuid(v):
    try:
        return uuid.UUID(str(v))
    except (ValueError, TypeError):
        return None


def _listing_dict(l: RepricerListing) -> dict:
    return {
        "id": str(l.id), "ebay_item_id": l.ebay_item_id, "title": l.title,
        "current_price": l.current_price, "floor_price": l.floor_price,
        "ceiling_price": l.ceiling_price, "undercut_value": l.undercut_value,
        "undercut_type": l.undercut_type, "ai_enabled": l.ai_enabled,
        "repricing_enabled": l.repricing_enabled, "last_competitor_low": l.last_competitor_low,
        "last_repriced_at": l.last_repriced_at.isoformat() if l.last_repriced_at else None,
    }


class StoreIn(BaseModel):
    name: str
    ebay_user_id: str | None = None
    user_token: str | None = None     # manual token for now; OAuth flow later


class RuleIn(BaseModel):
    floor_price: float | None = None
    ceiling_price: float | None = None
    undercut_value: float | None = None
    undercut_type: str | None = None
    ai_enabled: bool | None = None
    repricing_enabled: bool | None = None


@router.get("/stores")
def list_stores(db: Session = Depends(get_db)):
    rows = db.scalars(select(Store)).all()
    return {"stores": [{"id": str(s.id), "name": s.name, "ebay_user_id": s.ebay_user_id,
                        "ai_enabled": s.ai_enabled,
                        "connected_at": s.connected_at.isoformat() if s.connected_at else None}
                       for s in rows]}


@router.post("/stores")
def create_store(body: StoreIn, db: Session = Depends(get_db)):
    s = Store(name=body.name, ebay_user_id=body.ebay_user_id, oauth_access_token=body.user_token)
    db.add(s); db.commit(); db.refresh(s)
    return {"id": str(s.id), "name": s.name}


@router.post("/stores/{store_id}/import")
async def import_listings(store_id: str, db: Session = Depends(get_db)):
    s = db.get(Store, _uuid(store_id))
    if not s:
        raise HTTPException(status_code=404, detail="store not found")
    client = EbayStoreClient(user_token=s.oauth_access_token or None)
    items = await client.get_active_listings()
    created = updated = 0
    for it in items:
        existing = db.scalar(select(RepricerListing).where(
            RepricerListing.store_id == s.id, RepricerListing.ebay_item_id == it["ebay_item_id"]))
        if existing:
            existing.current_price = it["price"]; existing.title = it["title"]
            existing.quantity = it["quantity"]; updated += 1
        else:
            db.add(RepricerListing(store_id=s.id, ebay_item_id=it["ebay_item_id"], title=it["title"],
                                   sku=it["sku"], category_id=it["category_id"],
                                   current_price=it["price"], quantity=it["quantity"])); created += 1
    db.commit()
    return {"imported": created, "updated": updated, "total": len(items)}


@router.get("/listings")
def list_listings(store_id: str | None = None, db: Session = Depends(get_db)):
    q = select(RepricerListing)
    if store_id:
        q = q.where(RepricerListing.store_id == _uuid(store_id))
    rows = db.scalars(q).all()
    return {"listings": [_listing_dict(l) for l in rows], "total": len(rows)}


@router.put("/listings/{listing_id}/rule")
def set_rule(listing_id: str, body: RuleIn, db: Session = Depends(get_db)):
    l = db.get(RepricerListing, _uuid(listing_id))
    if not l:
        raise HTTPException(status_code=404, detail="listing not found")
    for field in ("floor_price", "ceiling_price", "undercut_value", "undercut_type",
                  "ai_enabled", "repricing_enabled"):
        v = getattr(body, field)
        if v is not None:
            setattr(l, field, v)
    db.commit()
    return _listing_dict(l)


@router.post("/run")
async def run_reprice():
    from ..services.reprice_service import reprice_all
    return await reprice_all()


@router.get("/price-changes")
def price_changes(limit: int = 50, db: Session = Depends(get_db)):
    rows = db.scalars(select(PriceChange).order_by(desc(PriceChange.created_at)).limit(limit)).all()
    return {"changes": [{"listing_id": str(c.listing_id), "old_price": c.old_price,
                         "new_price": c.new_price, "competitor_low": c.competitor_low,
                         "source": c.source, "reason": c.reason,
                         "at": c.created_at.isoformat() if c.created_at else None} for c in rows]}



async def _sync_store_listings(db: Session, store: Store) -> dict:
    client = EbayStoreClient(user_token=store.oauth_access_token or None)
    items = await client.get_active_listings()
    created = 0
    for it in items:
        existing = db.scalar(select(RepricerListing).where(
            RepricerListing.store_id == store.id, RepricerListing.ebay_item_id == it["ebay_item_id"]))
        if existing:
            existing.current_price = it["price"]; existing.title = it["title"]; existing.quantity = it["quantity"]
        else:
            db.add(RepricerListing(store_id=store.id, ebay_item_id=it["ebay_item_id"], title=it["title"],
                                   sku=it["sku"], category_id=it["category_id"],
                                   current_price=it["price"], quantity=it["quantity"])); created += 1
    db.commit()
    return {"imported": created, "total": len(items)}

@router.get("/oauth/login")
def oauth_login():
    if not ebay_oauth.is_configured():
        return {"configured": False, "message": "Set EBAY_RU_NAME in .env + add the redirect in your eBay developer app."}
    return {"configured": True, "url": ebay_oauth.build_consent_url()}


@router.get("/oauth/callback")
async def oauth_callback(code: str, db: Session = Depends(get_db)):
    tok = await ebay_oauth.exchange_code(code)
    if "access_token" not in tok:
        raise HTTPException(status_code=400, detail=f"token exchange failed: {tok}")
    s = Store(name="eBay Store", oauth_access_token=tok["access_token"],
              oauth_refresh_token=tok.get("refresh_token"),
              token_expires_at=datetime.utcnow() + timedelta(seconds=int(tok.get("expires_in", 7200))))
    db.add(s); db.commit(); db.refresh(s)
    imp = await _sync_store_listings(db, s)
    return {"connected": True, "store_id": str(s.id), **imp}
