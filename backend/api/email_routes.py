"""Public email endpoints — unsubscribe (CAN-SPAM)."""
from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse, HTMLResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import User, Lead
from ..utils.email_tokens import verify_unsubscribe
from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)

public_router = APIRouter(prefix="/api/email", tags=["email-public"])


@public_router.get("/unsubscribe")
def unsubscribe(e: str, t: str, db: Session = Depends(get_db)):
    """Idempotent one-click unsubscribe. Marks BOTH the user and lead rows for
    the address; invalid tokens get a neutral page (no probing)."""
    email = (e or "").strip().lower()
    if not email or not verify_unsubscribe(email, t):
        return HTMLResponse(
            "<p style='font-family:sans-serif'>This unsubscribe link is invalid.</p>", status_code=400
        )
    for u in db.scalars(select(User).where(User.email == email)).all():
        u.email_unsubscribed = True
    for l in db.scalars(select(Lead).where(Lead.email == email)).all():
        l.email_unsubscribed = True
    db.commit()
    logger.info("unsubscribed", email=email)
    app_url = (getattr(settings, "PUBLIC_APP_URL", None) or "https://undercut-nu.vercel.app").rstrip("/")
    return RedirectResponse(f"{app_url}/unsubscribed", status_code=302)
