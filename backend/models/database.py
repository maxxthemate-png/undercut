"""SQLAlchemy engine + session management for ListingArb.

Provides the database plumbing the rest of the app imports:

  - ``engine``        : synchronous SQLAlchemy Engine built from settings.DATABASE_URL
  - ``SessionLocal``  : configured sessionmaker
  - ``Base``          : declarative base (re-exported from models.models)
  - ``get_db()``      : FastAPI dependency — yields a Session, always closes it
  - ``get_db_sync()`` : same generator for use OUTSIDE a request (Celery workers,
                        scripts): ``db = next(get_db_sync())``
  - ``init_db()``     : create all tables (dev convenience; prod uses Alembic)

The app uses synchronous sessions (psycopg2). If DATABASE_URL specifies the
async ``+asyncpg`` driver, it is coerced to the sync psycopg2 driver here.
"""
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from ..utils.settings import settings
from .models import Base  # re-exported: `from models.database import Base`

# This module uses a synchronous engine; coerce any async driver to psycopg2.
_DB_URL = settings.DATABASE_URL.replace("postgres://", "postgresql://", 1).replace("+asyncpg", "+psycopg2")

engine = create_engine(
    _DB_URL,
    pool_pre_ping=True,   # transparently recover from dropped connections
    future=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency: yield a DB session and guarantee it is closed."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Alias for non-request callers (Celery worker uses ``next(get_db_sync())``).
get_db_sync = get_db


def init_db() -> None:
    """Create all tables. Dev convenience only — production uses Alembic migrations."""
    Base.metadata.create_all(bind=engine)
