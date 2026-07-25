"""Public lead capture (waitlist) — turns landing/compare visitors into leads
even before they sign up or before billing is live. No auth; email only."""
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import Lead
from ..utils.notifications import send_email_alert
from ..utils.throttle import IPThrottle, client_ip

public_router = APIRouter(prefix="/api/leads", tags=["leads-public"])

_lead_throttle = IPThrottle(5, 60)


class LeadIn(BaseModel):
    email: str
    source: str | None = None
    note: str | None = None   # optional context, e.g. the demo result the visitor checked


def _valid(email: str) -> bool:
    return "@" in email and "." in email.rsplit("@", 1)[-1] and 3 < len(email) <= 254


@public_router.post("")
def capture_lead(body: LeadIn, request: Request, db: Session = Depends(get_db)):
    if _lead_throttle.over_limit(client_ip(request)):
        raise HTTPException(status_code=429, detail="Too many submissions — try again in a minute.")
    email = (body.email or "").strip().lower()
    if not _valid(email):
        raise HTTPException(status_code=400, detail="valid email required")
    src = (body.source or "landing")[:50]
    note = (body.note or "").strip()[:300] or None
    existing = db.scalar(select(Lead).where(Lead.email == email))
    if existing:
        if existing.email_unsubscribed:   # re-submitting the form = explicit re-consent
            existing.email_unsubscribed = False
        if note and not existing.note:    # keep the first context we captured; don't clobber
            existing.note = note
        db.commit()
    else:
        db.add(Lead(email=email, source=src, note=note))
        db.commit()
        try:  # deliver the promised guide IMMEDIATELY — the forms say "we'll email it"
            from ..utils.email_templates import lead_guide_email
            from ..utils.notifications import send_customer_email
            subject, html = lead_guide_email()
            send_customer_email(email, subject, html)
        except Exception:
            pass
        try:  # best-effort operator alert (speed-to-lead) — never blocks capture
            send_email_alert(subject=f"New Undercut lead: {email}",
                             body=f"New waitlist lead\n\nEmail: {email}\nSource: {src}"
                                  + (f"\nContext: {note}" if note else "")
                                  + "\n\nFollow up fast — speed-to-lead wins.")
        except Exception:
            pass
    return {"ok": True, "count": db.scalar(select(func.count()).select_from(Lead)) or 0}


@public_router.get("/count")
def lead_count(db: Session = Depends(get_db)):
    return {"count": db.scalar(select(func.count()).select_from(Lead)) or 0}
