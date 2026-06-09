"""Public lead capture (waitlist) — turns landing/compare visitors into leads
even before they sign up or before billing is live. No auth; email only."""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from ..models.database import get_db
from ..models.repricer_models import Lead

public_router = APIRouter(prefix="/api/leads", tags=["leads-public"])


class LeadIn(BaseModel):
    email: str
    source: str | None = None


def _valid(email: str) -> bool:
    return "@" in email and "." in email.rsplit("@", 1)[-1] and 3 < len(email) <= 254


@public_router.post("")
def capture_lead(body: LeadIn, db: Session = Depends(get_db)):
    email = (body.email or "").strip().lower()
    if not _valid(email):
        raise HTTPException(status_code=400, detail="valid email required")
    if not db.scalar(select(Lead).where(Lead.email == email)):
        db.add(Lead(email=email, source=(body.source or "landing")[:50]))
        db.commit()
    return {"ok": True, "count": db.scalar(select(func.count()).select_from(Lead)) or 0}


@public_router.get("/count")
def lead_count(db: Session = Depends(get_db)):
    return {"count": db.scalar(select(func.count()).select_from(Lead)) or 0}
