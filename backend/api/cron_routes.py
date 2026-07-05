"""Key-protected cron endpoints (driven by GitHub Actions schedulers).
Same auth convention as the reprice cron: header X-Cron-Key == UNDERCUT_API_KEY."""
from fastapi import APIRouter, HTTPException, Header
from fastapi.concurrency import run_in_threadpool

from ..utils.settings import settings
from ..utils.keys import key_ok

public_router = APIRouter(prefix="/api/cron", tags=["cron"])


@public_router.post("/lifecycle-emails")
async def cron_lifecycle_emails(x_cron_key: str = Header(default=None)):
    if not key_ok(x_cron_key, settings.UNDERCUT_API_KEY):
        raise HTTPException(status_code=403, detail="invalid cron key")
    from ..services.lifecycle_emails import run_lifecycle_emails
    # Threadpool: the run is sync (DB scans + one blocking SendGrid call per
    # email) and would otherwise freeze the event loop for the whole batch.
    result = await run_in_threadpool(run_lifecycle_emails)
    try:
        # Piggyback daily retention: CompetitorSnapshot is written every reprice
        # cycle and read by nothing downstream — unpruned it fills the 1GB
        # Postgres tier in weeks at one Pro-sized customer.
        from datetime import datetime, timedelta
        from sqlalchemy import delete
        from ..models.database import SessionLocal
        from ..models.repricer_models import CompetitorSnapshot
        s = SessionLocal()
        cutoff = datetime.utcnow() - timedelta(days=30)
        n = s.execute(delete(CompetitorSnapshot).where(CompetitorSnapshot.fetched_at < cutoff)).rowcount
        s.commit(); s.close()
        result["snapshots_pruned"] = int(n or 0)
    except Exception:
        pass
    return result


@public_router.post("/ops-digest")
async def cron_ops_digest(x_cron_key: str = Header(default=None)):
    if not key_ok(x_cron_key, settings.UNDERCUT_API_KEY):
        raise HTTPException(status_code=403, detail="invalid cron key")
    from ..services.ops_digest import run_ops_digest
    return await run_in_threadpool(run_ops_digest)


@public_router.post("/snapshot-prices")
async def cron_snapshot_prices(x_cron_key: str = Header(default=None)):
    """Daily: capture the lowest live price for every tracked product (price-tracker pages)."""
    if not key_ok(x_cron_key, settings.UNDERCUT_API_KEY):
        raise HTTPException(status_code=403, detail="invalid cron key")
    from ..utils.tracked_products import TRACKED_PRODUCTS
    from ..services.ebay_store import EbayStoreClient
    from ..models.database import SessionLocal
    from ..models.repricer_models import ProductPriceSnapshot

    client = EbayStoreClient()
    db = SessionLocal()
    captured, errors = 0, 0
    try:
        for slug, query in TRACKED_PRODUCTS.items():
            try:
                res = await client.get_competitor_low(query)
                lowest = res.get("lowest")
                db.add(ProductPriceSnapshot(slug=slug, lowest=lowest,
                                            listing_count=res.get("count", 0)))
                if lowest is None:
                    # get_competitor_low never raises — a None here IS the failure
                    # signal (API drift/outage); count it or the errors field lies.
                    errors += 1
                else:
                    captured += 1
            except Exception:
                errors += 1
        db.commit()
    finally:
        db.close()
    return {"captured": captured, "errors": errors, "tracked": len(TRACKED_PRODUCTS)}
