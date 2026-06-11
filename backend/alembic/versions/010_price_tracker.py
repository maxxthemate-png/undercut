"""Daily price snapshots for the public eBay price tracker pages.

Revision ID: 010_price_tracker
Revises: 009_dunning
"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import UUID

revision = "010_price_tracker"
down_revision = "009_dunning"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "product_price_snapshots",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("slug", sa.String(80), index=True),
        sa.Column("lowest", sa.Float()),
        sa.Column("listing_count", sa.Integer()),
        sa.Column("captured_at", sa.DateTime(), index=True),
    )


def downgrade():
    op.drop_table("product_price_snapshots")
