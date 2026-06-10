"""Dunning state on users (failed-payment handling).

Revision ID: 009_dunning
Revises: 008_reprice_health
"""
import sqlalchemy as sa
from alembic import op

revision = "009_dunning"
down_revision = "008_reprice_health"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("payment_status", sa.String(20), server_default="ok"))
    op.add_column("users", sa.Column("payment_failed_at", sa.DateTime()))


def downgrade():
    op.drop_column("users", "payment_failed_at")
    op.drop_column("users", "payment_status")
