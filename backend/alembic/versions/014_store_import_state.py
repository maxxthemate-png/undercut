"""Persist the outcome of every listing-import attempt on the store.

Without these, the database could not answer "did this store ever try to import,
when, and why did it fail?" — so nothing could alert, digest, or retry. Three
connected stores sat at zero listings for a month with no record of the reason.

Revision ID: 014_store_import_state
Revises: 013_referrals
"""
import sqlalchemy as sa
from alembic import op

revision = "014_store_import_state"
down_revision = "013_referrals"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("stores", sa.Column("last_import_at", sa.DateTime(), nullable=True))
    op.add_column("stores", sa.Column("last_import_count", sa.Integer(), nullable=True))
    op.add_column("stores", sa.Column("last_import_error", sa.String(500), nullable=True))


def downgrade():
    op.drop_column("stores", "last_import_error")
    op.drop_column("stores", "last_import_count")
    op.drop_column("stores", "last_import_at")
