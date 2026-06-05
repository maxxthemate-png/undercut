"""SaaS auth: users table + stores.user_id

Revision ID: 003_saas_auth
Revises: 002_repricer
Create Date: 2026-06-05
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '003_saas_auth'
down_revision = '002_repricer'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('password_hash', sa.String(255), nullable=False),
        sa.Column('plan', sa.String(20)),
        sa.Column('listing_limit', sa.Integer()),
        sa.Column('stripe_customer_id', sa.String(100)),
        sa.Column('stripe_subscription_id', sa.String(100)),
        sa.Column('is_active', sa.Boolean()),
        sa.Column('created_at', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
    )
    op.create_index('ix_users_email', 'users', ['email'])
    op.add_column('stores', sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.create_index('ix_stores_user_id', 'stores', ['user_id'])
    op.create_foreign_key('fk_stores_user', 'stores', 'users', ['user_id'], ['id'])


def downgrade() -> None:
    op.drop_constraint('fk_stores_user', 'stores', type_='foreignkey')
    op.drop_index('ix_stores_user_id', 'stores')
    op.drop_column('stores', 'user_id')
    op.drop_index('ix_users_email', 'users')
    op.drop_table('users')
