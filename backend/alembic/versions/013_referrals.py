"""Referral program: per-user share code, who-referred-whom attribution, and a
one-shot credited stamp so a conversion can never grant the credit twice.

Revision ID: 013_referrals
Revises: 012_pricechange_value
"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import UUID

revision = "013_referrals"
down_revision = "012_pricechange_value"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("referral_code", sa.String(16), nullable=True))
    op.create_index("ix_users_referral_code", "users", ["referral_code"], unique=True)
    op.add_column("users", sa.Column("referred_by_user_id", UUID(as_uuid=True),
                                     sa.ForeignKey("users.id"), nullable=True))
    op.add_column("users", sa.Column("referral_credited_at", sa.DateTime(), nullable=True))


def downgrade():
    op.drop_column("users", "referral_credited_at")
    op.drop_column("users", "referred_by_user_id")
    op.drop_index("ix_users_referral_code", table_name="users")
    op.drop_column("users", "referral_code")
