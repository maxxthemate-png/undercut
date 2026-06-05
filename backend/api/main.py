"""
ListingArb — FastAPI Application
REST API for the dashboard and automation system.
Endpoints: listings, deals, system control, analytics, contracts.

All endpoints are backed by the real database via the services/ layer.
"""

import os
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.orm import Session

from ..utils.settings import settings
from ..utils.logging import get_logger
from ..models.database import get_db, engine
from ..models.models import (
    SystemState, Listing, PlatformListing, ListingStatus, PlatformStatus,
)
from ..services import listing_service, analytics_service
from ..services.contract_service import generate_listing_agreement
from ..services.listing_service import _uuid

logger = get_logger(__name__)

app = FastAPI(
    title="ListingArb API",
    version="1.0.0",
    description="AI-Powered Marketplace Arbitrage System",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # public API; auth is a Bearer JWT (no cookies), so wildcard origin is safe
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve generated contract PDFs (and any other static assets).
_STATIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "static")
os.makedirs(os.path.join(_STATIC_DIR, "contracts"), exist_ok=True)
app.mount("/static", StaticFiles(directory=_STATIC_DIR), name="static")

# Repricer (eBay repricing SaaS) routes
from .repricer_routes import router as repricer_router, public_router as repricer_public_router
app.include_router(repricer_router)
app.include_router(repricer_public_router)
from .auth_routes import router as auth_router
app.include_router(auth_router)
from .billing_routes import router as billing_router, public_router as billing_public_router
app.include_router(billing_router)
app.include_router(billing_public_router)


# ─── Request models ───────────────────────────────────────────────────────────
class ApproveDMRequest(BaseModel):
    dm_text: Optional[str] = None  # Optional override of the generated text


class SystemPauseRequest(BaseModel):
    reason: str
    paused_by: str = "operator"


class AutonomyLevelRequest(BaseModel):
    level: int


class CloseDealRequest(BaseModel):
    buyer_price: float


class PostToPlatformsRequest(BaseModel):
    platforms: list[str]


# ─── Helpers ──────────────────────────────────────────────────────────────────
def _system_state(db: Session) -> SystemState:
    st = db.get(SystemState, 1)
    if not st:
        st = SystemState(id=1, autonomy_level=int(settings.AUTONOMY_LEVEL))
        db.add(st)
        db.commit()
        db.refresh(st)
    return st


def _state_dict(st: SystemState) -> dict:
    return {
        "is_paused": st.is_paused,
        "autonomy_level": st.autonomy_level,
        "pause_reason": st.pause_reason,
        "paused_at": st.paused_at.isoformat() if st.paused_at else None,
        "paused_by": st.paused_by,
        "total_dms_sent": st.total_dms_sent,
        "total_deals_closed": st.total_deals_closed,
        "total_revenue": st.total_revenue,
    }


# ─── System control ─────────────────────────────────────────────────────────
@app.post("/api/system/pause")
async def pause_system(request: SystemPauseRequest, db: Session = Depends(get_db)):
    """Emergency pause — workers check this flag and exit early."""
    st = _system_state(db)
    st.is_paused = True
    st.pause_reason = request.reason
    st.paused_at = datetime.utcnow()
    st.paused_by = request.paused_by
    db.commit()
    logger.warning("SYSTEM PAUSED", reason=request.reason, by=request.paused_by)
    return {"paused": True, **_state_dict(st)}


@app.post("/api/system/resume")
async def resume_system(db: Session = Depends(get_db)):
    st = _system_state(db)
    st.is_paused = False
    st.pause_reason = None
    db.commit()
    logger.info("System resumed")
    return {"paused": False, **_state_dict(st)}


@app.get("/api/system/status")
async def get_system_status(db: Session = Depends(get_db)):
    st = _system_state(db)
    return {
        **_state_dict(st),
        "environment": settings.ENVIRONMENT,
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.put("/api/system/autonomy")
async def set_autonomy_level(request: AutonomyLevelRequest, db: Session = Depends(get_db)):
    if request.level not in (1, 2, 3):
        raise HTTPException(status_code=400, detail="Level must be 1, 2, or 3")
    st = _system_state(db)
    st.autonomy_level = request.level
    db.commit()
    logger.info("Autonomy level changed", level=request.level)
    return {"autonomy_level": st.autonomy_level}


# ─── Launch readiness (go / no-go for revenue) ────────────────────────────────
_PLACEHOLDER_MARKERS = ("...", "your-", "your_", "change-me", "[", "xxxx", "@email.com", "yourdomain")


def _configured(*vals) -> bool:
    """True only if every value is a real (non-placeholder) setting."""
    for v in vals:
        if not v:
            return False
        s = str(v).strip().lower()
        if not s or any(m in s for m in _PLACEHOLDER_MARKERS):
            return False
    return True


@app.get("/api/system/readiness")
async def readiness():
    """What's configured and what's still blocking revenue. The go/no-go check."""
    integrations = {
        "anthropic_ai (scoring, DM + listing copy)": _configured(settings.ANTHROPIC_API_KEY),
        "facebook_account (scrape + DM sellers)": _configured(settings.FB_EMAIL, settings.FB_PASSWORD),
        "ebay_api (cross-post = captures the spread)": _configured(
            settings.EBAY_APP_ID, settings.EBAY_CERT_ID, settings.EBAY_DEV_ID, settings.EBAY_USER_TOKEN),
        "twilio_sms (operator alerts)": _configured(
            settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN, settings.TWILIO_FROM_NUMBER, settings.OPERATOR_PHONE),
        "sendgrid_email (operator alerts)": _configured(settings.SENDGRID_API_KEY, settings.OPERATOR_EMAIL),
    }
    db_ok = redis_ok = False
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        db_ok = True
    except Exception:
        pass
    try:
        import redis as _redis
        _redis.from_url(settings.REDIS_URL, socket_connect_timeout=2).ping()
        redis_ok = True
    except Exception:
        pass
    revenue_critical = [
        "anthropic_ai (scoring, DM + listing copy)",
        "facebook_account (scrape + DM sellers)",
        "ebay_api (cross-post = captures the spread)",
    ]
    blocking = [k for k in revenue_critical if not integrations[k]]
    return {
        "infrastructure": {"database": db_ok, "redis": redis_ok},
        "integrations": integrations,
        "revenue_ready": db_ok and not blocking,  # redis optional: free-tier deploy reprices via scheduled GitHub Action, not Celery
        "blocking_revenue": blocking,
        "next_step": ("All set — POST /api/system/run-scan to start the pipeline."
                      if not blocking else
                      "Add the blocking keys to .env, restart the backend, then POST /api/system/run-scan."),
    }


@app.post("/api/system/run-scan")
async def run_scan_now():
    """Manually kick off a marketplace scan (start the money pipeline on demand)."""
    try:
        from ..tasks.worker import run_marketplace_scan
        task = run_marketplace_scan.delay()
        return {"queued": True, "task_id": str(task.id)}
    except Exception as e:
        logger.warning("Could not enqueue scan", error=str(e))
        return {"queued": False, "error": str(e)}


# ─── Listings ─────────────────────────────────────────────────────────────────
@app.get("/api/listings")
async def get_listings(
    status: Optional[str] = None,
    min_score: Optional[float] = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    return listing_service.query_listings(db, status=status, min_score=min_score,
                                          limit=limit, offset=offset)


@app.get("/api/listings/{listing_id}")
async def get_listing(listing_id: str, db: Session = Depends(get_db)):
    result = listing_service.get_listing_detail(db, listing_id)
    if not result:
        raise HTTPException(status_code=404, detail="Listing not found")
    return result


@app.post("/api/listings/{listing_id}/approve-dm")
async def approve_and_send_dm(listing_id: str, request: ApproveDMRequest,
                              db: Session = Depends(get_db)):
    """Operator approves outreach (Level 1). Queues the listing and kicks the worker."""
    listing = db.get(Listing, _uuid(listing_id))
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    listing.status = ListingStatus.QUEUED_OUTREACH
    db.commit()

    task_enqueued = False
    try:
        from ..tasks.worker import send_queued_dms
        send_queued_dms.delay()
        task_enqueued = True
    except Exception as e:  # broker down or worker import issue — non-fatal
        logger.warning("Could not enqueue DM task", error=str(e))
    return {"listing_id": listing_id, "approved": True, "task_enqueued": task_enqueued}


@app.post("/api/listings/{listing_id}/skip")
async def skip_listing(listing_id: str, db: Session = Depends(get_db)):
    result = listing_service.skip_listing(db, listing_id)
    if not result:
        raise HTTPException(status_code=404, detail="Listing not found")
    return {"listing_id": listing_id, "status": result["status"]}


@app.post("/api/listings/{listing_id}/post-to-platforms")
async def post_to_platforms(listing_id: str, request: PostToPlatformsRequest,
                            db: Session = Depends(get_db)):
    """Record intent to cross-post a listing to the given platforms (PENDING rows)."""
    listing = db.get(Listing, _uuid(listing_id))
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    created = []
    for platform in request.platforms:
        db.add(PlatformListing(
            listing_id=listing.id,
            platform=platform,
            status=PlatformStatus.PENDING,
            listed_price=listing.estimated_market_value or listing.price,
        ))
        created.append(platform)
    listing.status = ListingStatus.POSTED
    db.commit()
    try:
        from ..tasks.worker import process_platform_postings
        process_platform_postings.delay()
    except Exception as e:
        logger.warning("Could not enqueue platform posting", error=str(e))
    return {"listing_id": listing_id, "queued_platforms": created}


@app.post("/api/listings/{listing_id}/generate-contract")
async def generate_contract(listing_id: str, db: Session = Depends(get_db)):
    """Generate the listing-agreement PDF and return a downloadable URL."""
    if not listing_service.get_listing_detail(db, listing_id):
        raise HTTPException(status_code=404, detail="Listing not found")
    pdf_url = await generate_listing_agreement(listing_id)
    return {"pdf_url": pdf_url}


@app.post("/api/listings/{listing_id}/create-deal")
async def create_deal_for_listing(listing_id: str, db: Session = Depends(get_db)):
    """Turn an agreed listing into a tracked Deal (the record close_deal settles)."""
    result = listing_service.create_deal(db, listing_id)
    if not result:
        raise HTTPException(status_code=404, detail="Listing not found")
    return result


# ─── Deals ────────────────────────────────────────────────────────────────────
@app.get("/api/deals")
async def get_deals(status: Optional[str] = None, limit: int = 20,
                    db: Session = Depends(get_db)):
    return listing_service.query_deals(db, status=status, limit=limit)


@app.get("/api/deals/{deal_id}")
async def get_deal(deal_id: str, db: Session = Depends(get_db)):
    result = listing_service.get_deal_detail(db, deal_id)
    if not result:
        raise HTTPException(status_code=404, detail="Deal not found")
    return result


@app.post("/api/deals/{deal_id}/close")
async def close_deal(deal_id: str, request: CloseDealRequest,
                     db: Session = Depends(get_db)):
    result = listing_service.close_deal(db, deal_id, request.buyer_price)
    if not result:
        raise HTTPException(status_code=404, detail="Deal not found")
    return {"deal_id": deal_id, "closed": True, "our_fee": result["our_fee"],
            "total_revenue": result["total_revenue"]}


# ─── Analytics ────────────────────────────────────────────────────────────────
@app.get("/api/analytics/summary")
async def get_analytics_summary(db: Session = Depends(get_db)):
    return analytics_service.get_summary(db)


@app.get("/api/analytics/revenue-by-month")
async def get_revenue_by_month(db: Session = Depends(get_db)):
    return analytics_service.get_revenue_by_month(db)


# ─── Health ───────────────────────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    db_ok = True
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception:
        db_ok = False
    return {"status": "ok", "database": "up" if db_ok else "down",
            "timestamp": datetime.utcnow().isoformat()}
