"""Alembic migration environment for Undercut.

Scaffolded to run the hand-written migrations in alembic/versions/.
The database URL is loaded from the project's .env (DATABASE_URL), so this
works whether you point at local Postgres or Supabase. Run from backend/:

    python -m alembic upgrade head
"""
import os
import sys
from logging.config import fileConfig

from sqlalchemy import create_engine, pool
from alembic import context

# ─── Paths ────────────────────────────────────────────────────────────────────
HERE = os.path.dirname(os.path.abspath(__file__))   # backend/alembic
BACKEND_DIR = os.path.dirname(HERE)                  # backend
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)          # project root (holds .env)

# Make `models` importable so target_metadata can be wired for --autogenerate.
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# ─── Load DATABASE_URL from the project-root .env ───────────────────────────────
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(PROJECT_ROOT, ".env"))
except Exception:
    pass

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set — add it to .env at the project root.")

# Migrations run synchronously; coerce any async driver to a sync one.
DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1).replace("+asyncpg", "+psycopg2")

# ─── Alembic config + logging ───────────────────────────────────────────────────
config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Only needed for --autogenerate; the shipped migrations are hand-written, so
# this is best-effort and falls back to None if models can't be imported.
try:
    # Importing repricer_models registers every live table on Base.metadata.
    from models.repricer_models import Base
    target_metadata = Base.metadata
except Exception:
    target_metadata = None


def run_migrations_offline() -> None:
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = create_engine(DATABASE_URL, poolclass=pool.NullPool)
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
