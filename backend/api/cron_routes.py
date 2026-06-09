"""Key-protected cron endpoints (driven by GitHub Actions schedulers).
Same auth convention as the reprice cron: header X-Cron-Key == UNDERCUT_API_KEY."""
from fastapi import APIRouter, HTTPException, Header

from ..utils.settings import settings

public_router = APIRouter(prefix="/api/cron", tags=["cron"])


@public_router.post("/lifecycle-emails")
async def cron_lifecycle_emails(x_cron_key: str = Header(default=None)):
    if not settings.UNDERCUT_API_KEY or x_cron_key != settings.UNDERCUT_API_KEY:
        raise HTTPException(status_code=403, detail="invalid cron key")
    from ..services.lifecycle_emails import run_lifecycle_emails
    return run_lifecycle_emails()
