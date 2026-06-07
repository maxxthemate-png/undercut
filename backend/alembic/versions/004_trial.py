"""Founding trial: users.trial_ends_at

Revision ID: 004_trial
Revises: 003_saas_auth
Create Date: 2026-06-07
"""
from alembic import op
import sqlalchemy as sa

revision = '004_trial'
down_revision = '003_saas_auth'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('users', sa.Column('trial_ends_at', sa.DateTime(), nullable=True))


def downgrade() -> None:
    op.drop_column('users', 'trial_ends_at')
