"""Repricer domain tables (stores, listings, price changes, competitor snapshots)

Revision ID: 002_repricer
Revises: 001_initial
Create Date: 2026-06-04
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '002_repricer'
down_revision = '001_initial'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'stores',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('name', sa.String(200)),
        sa.Column('ebay_user_id', sa.String(100)),
        sa.Column('oauth_access_token', sa.Text()),
        sa.Column('oauth_refresh_token', sa.Text()),
        sa.Column('token_expires_at', sa.DateTime()),
        sa.Column('is_active', sa.Boolean()),
        sa.Column('ai_enabled', sa.Boolean()),
        sa.Column('default_undercut_value', sa.Float()),
        sa.Column('default_undercut_type', sa.String(10)),
        sa.Column('connected_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('ix_stores_ebay_user_id', 'stores', ['ebay_user_id'])

    op.create_table(
        'repricer_listings',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('store_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('ebay_item_id', sa.String(50)),
        sa.Column('sku', sa.String(120)),
        sa.Column('title', sa.String(500)),
        sa.Column('category_id', sa.String(20)),
        sa.Column('current_price', sa.Float()),
        sa.Column('quantity', sa.Integer()),
        sa.Column('floor_price', sa.Float()),
        sa.Column('ceiling_price', sa.Float()),
        sa.Column('undercut_value', sa.Float()),
        sa.Column('undercut_type', sa.String(10)),
        sa.Column('ai_enabled', sa.Boolean()),
        sa.Column('repricing_enabled', sa.Boolean()),
        sa.Column('last_competitor_low', sa.Float()),
        sa.Column('last_repriced_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['store_id'], ['stores.id']),
    )
    op.create_index('ix_repricer_listings_store_id', 'repricer_listings', ['store_id'])
    op.create_index('ix_repricer_listings_ebay_item_id', 'repricer_listings', ['ebay_item_id'])
    op.create_index('ix_repricer_listings_repricing_enabled', 'repricer_listings', ['repricing_enabled'])

    op.create_table(
        'price_changes',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('listing_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('old_price', sa.Float()),
        sa.Column('new_price', sa.Float()),
        sa.Column('competitor_low', sa.Float()),
        sa.Column('source', sa.String(20)),
        sa.Column('reason', sa.Text()),
        sa.Column('created_at', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['listing_id'], ['repricer_listings.id']),
    )
    op.create_index('ix_price_changes_listing_id', 'price_changes', ['listing_id'])
    op.create_index('ix_price_changes_created_at', 'price_changes', ['created_at'])

    op.create_table(
        'competitor_snapshots',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('listing_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('lowest_price', sa.Float()),
        sa.Column('listing_count', sa.Integer()),
        sa.Column('fetched_at', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['listing_id'], ['repricer_listings.id']),
    )
    op.create_index('ix_competitor_snapshots_listing_id', 'competitor_snapshots', ['listing_id'])
    op.create_index('ix_competitor_snapshots_fetched_at', 'competitor_snapshots', ['fetched_at'])


def downgrade() -> None:
    op.drop_table('competitor_snapshots')
    op.drop_table('price_changes')
    op.drop_table('repricer_listings')
    op.drop_table('stores')
