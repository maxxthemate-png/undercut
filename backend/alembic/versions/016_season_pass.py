"""One-time Season Pass: a non-recurring 90-day grant of Starter-level access.

eBay selling is bursty and seasonal (Q4, back-to-school, a liquidation run), so a
meaningful share of sellers will not take a 12-month subscription for a 6-week
need. `pass_expires_at` grants access without a Stripe subscription.

Revision ID: 016_season_pass
Revises: 015_store_reconnect
"""
import sqlalchemy as sa
from alembic import op

revision = "016_season_pass"
down_revision = "015_store_reconnect"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("pass_expires_at", sa.DateTime(), nullable=True))
    op.add_column("users", sa.Column("pass_plan", sa.String(20), nullable=True))


def downgrade():
    op.drop_column("users", "pass_plan")
    op.drop_column("users", "pass_expires_at")
