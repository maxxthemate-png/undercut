"""Repricer API — per-user (multi-tenant). Every store/listing is scoped to the
logged-in user (JWT). The eBay OAuth callback ties the connected store to the
user who started the flow (via the `state` param). Plan listing-limit enforced.
"""
import uuid
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import BaseModel
from sqlalchemy import select, desc, func
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import Store, RepricerListing, PriceChange, User
from ..services.ebay_store import EbayStoreClient
from ..services import ebay_oauth
from ..services.auth import current_user, make_oauth_state, verify_oauth_state
from ..services import billing
from ..utils.crypto import encrypt_token, decrypt_token

router = APIRouter(prefix="/api/repricer", tags=["repricer"])
# Public: only the eBay OAuth callback (eBay redirects here; can't send our auth header).
public_router = APIRouter(prefix="/api/repricer", tags=["repricer-public"])


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


def _own_store(db: Session, user: User, store_id: str) -> Store:
    s = db.get(Store, _uuid(store_id))
    if not s or s.user_id != user.id:
        raise HTTPException(status_code=404, detail="store not found")
    return s


def _listing_count(db: Session, user: User) -> int:
    return db.scalar(
        select(func.count()).select_from(RepricerListing)
        .join(Store, RepricerListing.store_id == Store.id)
        .where(Store.user_id == user.id)) or 0


async def _sync_store_listings(db: Session, store: Store, remaining: int) -> dict:
    """Import a store's eBay listings, creating up to `remaining` new ones (plan cap)."""
    client = EbayStoreClient(user_token=decrypt_token(store.oauth_access_token) or None)
    items = await client.get_active_listings()
    created = updated = skipped = 0
    for it in items:
        existing = db.scalar(select(RepricerListing).where(
            RepricerListing.store_id == store.id, RepricerListing.ebay_item_id == it["ebay_item_id"]))
        if existing:
            existing.current_price = it["price"]; existing.title = it["title"]
            existing.quantity = it["quantity"]; updated += 1
        elif remaining > 0:
            db.add(RepricerListing(store_id=store.id, ebay_item_id=it["ebay_item_id"], title=it["title"],
                                   sku=it["sku"], category_id=it["category_id"],
                                   current_price=it["price"], quantity=it["quantity"])); created += 1; remaining -= 1
        else:
            skipped += 1
    db.commit()
    return {"imported": created, "updated": updated, "skipped_over_plan_limit": skipped, "total": len(items)}


class StoreIn(BaseModel):
    name: str
    ebay_user_id: str | None = None
    user_token: str | None = None     # manual token (OAuth is the primary path)


class RuleIn(BaseModel):
    floor_price: float | None = None
    ceiling_price: float | None = None
    undercut_value: float | None = None
    undercut_type: str | None = None
    ai_enabled: bool | None = None
    repricing_enabled: bool | None = None


@router.get("/stores")
def list_stores(user: User = Depends(current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(Store).where(Store.user_id == user.id)).all()
    return {"stores": [{"id": str(s.id), "name": s.name, "ebay_user_id": s.ebay_user_id,
                        "ai_enabled": s.ai_enabled,
                        "connected_at": s.connected_at.isoformat() if s.connected_at else None}
                       for s in rows]}


@router.post("/stores")
def create_store(body: StoreIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    s = Store(name=body.name, ebay_user_id=body.ebay_user_id,
              oauth_access_token=encrypt_token(body.user_token), user_id=user.id)
    db.add(s); db.commit(); db.refresh(s)
    return {"id": str(s.id), "name": s.name}


@router.post("/stores/{store_id}/import")
async def import_listings(store_id: str, user: User = Depends(current_user), db: Session = Depends(get_db)):
    s = _own_store(db, user, store_id)
    remaining = max(0, (user.listing_limit or 0) - _listing_count(db, user))
    return await _sync_store_listings(db, s, remaining)


@router.get("/listings")
def list_listings(store_id: str | None = None, user: User = Depends(current_user), db: Session = Depends(get_db)):
    q = (select(RepricerListing).join(Store, RepricerListing.store_id == Store.id)
         .where(Store.user_id == user.id))
    if store_id:
        q = q.where(RepricerListing.store_id == _uuid(store_id))
    rows = db.scalars(q).all()
    if billing.normalize_access(user):   # expire a finished trial -> free
        db.commit()
    return {"listings": [_listing_dict(l) for l in rows], "total": len(rows),
            **billing.access_summary(user)}


def _validate_rule(l: RepricerListing, body: RuleIn) -> str | None:
    """Validate the MERGED rule state (PATCH semantics: incoming value if set,
    else current DB value) so a partial update can't create a broken rule."""
    floor = body.floor_price if body.floor_price is not None else l.floor_price
    ceiling = body.ceiling_price if body.ceiling_price is not None else l.ceiling_price
    if body.floor_price is not None and body.floor_price < 0.01:
        return "floor_price must be at least $0.01"
    if body.ceiling_price is not None and body.ceiling_price <= 0:
        return "ceiling_price must be positive"
    if floor is not None and ceiling is not None and ceiling < floor:
        return "ceiling_price cannot be below floor_price"
    if body.undercut_value is not None and body.undercut_value < 0:
        return "undercut_value cannot be negative"
    if body.undercut_type is not None and body.undercut_type not in ("amount", "percent"):
        return "undercut_type must be 'amount' or 'percent'"
    return None


@router.put("/listings/{listing_id}/rule")
def set_rule(listing_id: str, body: RuleIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    l = db.get(RepricerListing, _uuid(listing_id))
    store = db.get(Store, l.store_id) if l else None
    if not l or not store or store.user_id != user.id:
        raise HTTPException(status_code=404, detail="listing not found")
    err = _validate_rule(l, body)
    if err:
        raise HTTPException(status_code=400, detail=err)
    for field in ("floor_price", "ceiling_price", "undercut_value", "undercut_type",
                  "ai_enabled", "repricing_enabled"):
        v = getattr(body, field)
        if v is not None:
            setattr(l, field, v)
    db.commit()
    return _listing_dict(l)


@router.post("/run")
async def run_reprice(user: User = Depends(current_user), db: Session = Depends(get_db)):
    store_ids = [s.id for s in db.scalars(select(Store).where(Store.user_id == user.id)).all()]
    if not store_ids:
        return {"checked": 0, "repriced": 0, "results": []}
    from ..services.reprice_service import reprice_all
    return await reprice_all(store_ids=store_ids)


@router.get("/price-changes")
def price_changes(limit: int = 50, user: User = Depends(current_user), db: Session = Depends(get_db)):
    rows = db.scalars(
        select(PriceChange).join(RepricerListing, PriceChange.listing_id == RepricerListing.id)
        .join(Store, RepricerListing.store_id == Store.id)
        .where(Store.user_id == user.id)
        .order_by(desc(PriceChange.created_at)).limit(limit)).all()
    return {"changes": [{"listing_id": str(c.listing_id), "old_price": c.old_price,
                         "new_price": c.new_price, "competitor_low": c.competitor_low,
                         "source": c.source, "reason": c.reason,
                         "at": c.created_at.isoformat() if c.created_at else None} for c in rows]}


@router.get("/oauth/login")
def oauth_login(user: User = Depends(current_user)):
    if not ebay_oauth.is_configured():
        return {"configured": False, "message": "EBAY_RU_NAME not set — add it in env + your eBay app."}
    # state ties the connected store back to this user in the callback
    return {"configured": True, "url": ebay_oauth.build_consent_url(state=make_oauth_state(user.id))}


@public_router.get("/oauth/callback")
async def oauth_callback(code: str, state: str | None = None, db: Session = Depends(get_db)):
    # Verify the signed state BEFORE anything else — a forged/missing/expired state
    # must never attach an eBay store (+ seller token) to an account or orphan one.
    uid = verify_oauth_state(state)
    if not uid:
        raise HTTPException(status_code=400, detail="invalid or expired OAuth state")
    user = db.get(User, _uuid(uid))
    if not user:
        raise HTTPException(status_code=400, detail="unknown user for OAuth state")
    tok = await ebay_oauth.exchange_code(code)
    if "access_token" not in tok:
        raise HTTPException(status_code=400, detail=f"token exchange failed: {tok}")
    s = Store(name="eBay Store", user_id=user.id,
              oauth_access_token=encrypt_token(tok["access_token"]), oauth_refresh_token=encrypt_token(tok.get("refresh_token")),
              token_expires_at=datetime.utcnow() + timedelta(seconds=int(tok.get("expires_in", 7200))))
    db.add(s); db.commit(); db.refresh(s)
    remaining = max(0, user.listing_limit - _listing_count(db, user))
    imp = await _sync_store_listings(db, s, remaining)
    return {"connected": True, "store_id": str(s.id), **imp}


@public_router.post("/cron/reprice-all")
async def cron_reprice_all(x_cron_key: str | None = Header(default=None)):
    """Service-key-protected global repricer. Called every 15 min by the scheduled
    GitHub Action (free-tier alternative to a Celery beat worker) — reprices every store."""
    from ..utils.settings import settings
    if not settings.UNDERCUT_API_KEY or x_cron_key != settings.UNDERCUT_API_KEY:
        raise HTTPException(status_code=403, detail="invalid cron key")
    from ..services.reprice_service import reprice_all
    result = await reprice_all()
    try:  # persist a run record for the ops digest + staleness alarm — never block the run
        from ..models.database import SessionLocal
        from ..models.repricer_models import RepriceRun
        sample = "; ".join(
            f"{r.get('item')}: {r.get('error')}" for r in result.get("results", [])
            if r.get("error") and r["error"] != "no floor set")[:1000]
        s = SessionLocal()
        s.add(RepriceRun(checked=result.get("checked", 0), repriced=result.get("repriced", 0),
                         errors=result.get("errors", 0), error_sample=sample or None))
        s.commit(); s.close()
    except Exception:
        pass
    return result
