"""Stamp the dollar value of every reprice onto PriceChange (the value-visibility keystone).

Revision ID: 012_pricechange_value
Revises: 011_lead_note
"""
import sqlalchemy as sa
from alembic import op

revision = "012_pricechange_value"
down_revision = "011_lead_note"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("price_changes", sa.Column("margin_protected", sa.Float(), nullable=True))
    op.add_column("price_changes", sa.Column("floored", sa.Boolean(), nullable=True))
    op.add_column("price_changes", sa.Column("is_win", sa.Boolean(), nullable=True))


def downgrade():
    op.drop_column("price_changes", "is_win")
    op.drop_column("price_changes", "floored")
    op.drop_column("price_changes", "margin_protected")
