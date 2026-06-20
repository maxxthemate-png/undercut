"""Key-protected cron endpoints (driven by GitHub Actions schedulers).
Same auth convention as the reprice cron: header X-Cron-Key == UNDERCUT_API_KEY."""
from fastapi import APIRouter, HTTPException, Header

from ..utils.settings import settings
from ..utils.keys import key_ok

public_router = APIRouter(prefix="/api/cron", tags=["cron"])


@public_router.post("/lifecycle-emails")
async def cron_lifecycle_emails(x_cron_key: str = Header(default=None)):
    if not key_ok(x_cron_key, settings.UNDERCUT_API_KEY):
        raise HTTPException(status_code=403, detail="invalid cron key")
    from ..services.lifecycle_emails import run_lifecycle_emails
    return run_lifecycle_emails()


@public_router.post("/ops-digest")
async def cron_ops_digest(x_cron_key: str = Header(default=None)):
    if not key_ok(x_cron_key, settings.UNDERCUT_API_KEY):
        raise HTTPException(status_code=403, detail="invalid cron key")
    from ..services.ops_digest import run_ops_digest
    return run_ops_digest()


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
                db.add(ProductPriceSnapshot(slug=slug, lowest=res.get("lowest"),
                                            listing_count=res.get("count", 0)))
                captured += 1
            except Exception:
                errors += 1
        db.commit()
    finally:
        db.close()
    return {"captured": captured, "errors": errors, "tracked": len(TRACKED_PRODUCTS)}
