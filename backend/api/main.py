"""
Undercut — FastAPI Application
REST API for the eBay-repricing SaaS: auth, billing, repricer, leads, admin,
cron, tools, and lifecycle email endpoints (mounted from their routers below).
"""

from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from ..utils.logging import get_logger
from ..utils.settings import settings
from ..models.database import engine

logger = get_logger(__name__)

# Fail fast in production rather than silently signing tokens with "change-me"
# or leaving the data/admin API ungated. Dormant outside production (ENVIRONMENT
# defaults to "development"), so local dev + the test suite are unaffected.
if (settings.ENVIRONMENT or "").lower() == "production":
    _bad = []
    if settings.SECRET_KEY in ("", "change-me", None):
        _bad.append("SECRET_KEY (signs every JWT / OAuth state / reset / unsubscribe token)")
    if not settings.UNDERCUT_API_KEY:
        _bad.append("UNDERCUT_API_KEY (gates admin + cron endpoints)")
    if _bad:
        raise RuntimeError(
            "Refusing to boot in production with default/unset secrets: " + "; ".join(_bad)
        )

app = FastAPI(
    title="Undercut API",
    version="2.0.0",
    description="Automated eBay repricing that beats the lowest competitor — never below your floor.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # public API; auth is a Bearer JWT (no cookies), so wildcard origin is safe
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Repricer (eBay repricing SaaS) routes
from .repricer_routes import router as repricer_router, public_router as repricer_public_router
app.include_router(repricer_router)
app.include_router(repricer_public_router)
from .auth_routes import router as auth_router
app.include_router(auth_router)
from .billing_routes import router as billing_router, public_router as billing_public_router
app.include_router(billing_router)
app.include_router(billing_public_router)
from .leads_routes import public_router as leads_public_router
app.include_router(leads_public_router)
from .admin_routes import router as admin_router, public_router as admin_public_router
app.include_router(admin_router)
app.include_router(admin_public_router)
from .cron_routes import public_router as cron_public_router
app.include_router(cron_public_router)
from .tools_routes import public_router as tools_public_router
app.include_router(tools_public_router)
from .email_routes import public_router as email_public_router
app.include_router(email_public_router)


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
