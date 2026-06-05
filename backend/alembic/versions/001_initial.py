"""Initial schema

Revision ID: 001_initial
Create Date: 2025-01-01
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# Revision identifiers, used by Alembic.
revision = '001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # sellers
    op.create_table('sellers',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('fb_profile_url', sa.String(500)),
        sa.Column('fb_user_id', sa.String(100)),
        sa.Column('name', sa.String(200)),
        sa.Column('location', sa.String(200)),
        sa.Column('member_since', sa.String(50)),
        sa.Column('dm_thread_url', sa.Text()),
        sa.Column('last_dm_sent_at', sa.DateTime()),
        sa.Column('dm_count', sa.Integer(), default=0),
        sa.Column('response_type', sa.String(50)),
        sa.Column('last_response_at', sa.DateTime()),
        sa.Column('agreement_sent_at', sa.DateTime()),
        sa.Column('agreement_signed_at', sa.DateTime()),
        sa.Column('agreement_pdf_url', sa.Text()),
        sa.Column('deals_completed', sa.Integer(), default=0),
        sa.Column('is_blocked', sa.Boolean(), default=False),
        sa.Column('notes', sa.Text()),
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('fb_profile_url'),
    )

    # listings
    op.create_table('listings',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('external_id', sa.String(255), nullable=False),
        sa.Column('source_platform', sa.String(50), nullable=False),
        sa.Column('source_url', sa.Text(), nullable=False),
        sa.Column('title', sa.String(500), nullable=False),
        sa.Column('description', sa.Text()),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('category', sa.String(100)),
        sa.Column('condition', sa.String(50)),
        sa.Column('year', sa.Integer()),
        sa.Column('make', sa.String(100)),
        sa.Column('model', sa.String(100)),
        sa.Column('mileage', sa.Integer()),
        sa.Column('location_city', sa.String(100)),
        sa.Column('location_state', sa.String(50)),
        sa.Column('photos', postgresql.JSON()),
        sa.Column('deal_score', sa.Float()),
        sa.Column('estimated_market_value', sa.Float()),
        sa.Column('estimated_upside', sa.Float()),
        sa.Column('score_reasoning', sa.Text()),
        sa.Column('status', sa.String(50), default='new'),
        sa.Column('seller_id', postgresql.UUID(as_uuid=True)),
        sa.Column('discovered_at', sa.DateTime()),
        sa.Column('listed_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.ForeignKeyConstraint(['seller_id'], ['sellers.id']),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('external_id'),
    )

    # outreach_attempts
    op.create_table('outreach_attempts',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('listing_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('dm_text', sa.Text(), nullable=False),
        sa.Column('sent_at', sa.DateTime()),
        sa.Column('sent_successfully', sa.Boolean()),
        sa.Column('error_message', sa.Text()),
        sa.Column('response_text', sa.Text()),
        sa.Column('response_at', sa.DateTime()),
        sa.Column('response_classification', sa.String(50)),
        sa.Column('auto_replied', sa.Boolean(), default=False),
        sa.Column('auto_reply_text', sa.Text()),
        sa.ForeignKeyConstraint(['listing_id'], ['listings.id']),
        sa.PrimaryKeyConstraint('id'),
    )

    # platform_listings
    op.create_table('platform_listings',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('listing_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('platform', sa.String(100), nullable=False),
        sa.Column('platform_listing_id', sa.String(255)),
        sa.Column('platform_url', sa.Text()),
        sa.Column('listed_price', sa.Float()),
        sa.Column('status', sa.String(50), default='pending'),
        sa.Column('posted_at', sa.DateTime()),
        sa.Column('expires_at', sa.DateTime()),
        sa.Column('views', sa.Integer(), default=0),
        sa.Column('inquiries', sa.Integer(), default=0),
        sa.Column('error_message', sa.Text()),
        sa.ForeignKeyConstraint(['listing_id'], ['listings.id']),
        sa.PrimaryKeyConstraint('id'),
    )

    # deals
    op.create_table('deals',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('listing_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('seller_asking_price', sa.Float(), nullable=False),
        sa.Column('buyer_offer_price', sa.Float()),
        sa.Column('our_fee', sa.Float()),
        sa.Column('buyer_name', sa.String(200)),
        sa.Column('buyer_contact', sa.String(200)),
        sa.Column('buyer_found_via', sa.String(100)),
        sa.Column('buyer_inquiry_at', sa.DateTime()),
        sa.Column('offer_made_at', sa.DateTime()),
        sa.Column('deal_agreed_at', sa.DateTime()),
        sa.Column('deal_closed_at', sa.DateTime()),
        sa.Column('photo_package_sold', sa.Boolean(), default=False),
        sa.Column('photo_package_fee', sa.Float(), default=0),
        sa.Column('total_revenue', sa.Float()),
        sa.Column('notes', sa.Text()),
        sa.Column('created_at', sa.DateTime()),
        sa.ForeignKeyConstraint(['listing_id'], ['listings.id']),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('listing_id'),
    )

    # audit_log
    op.create_table('audit_log',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('timestamp', sa.DateTime()),
        sa.Column('entity_type', sa.String(50)),
        sa.Column('entity_id', sa.String(100)),
        sa.Column('action', sa.String(200), nullable=False),
        sa.Column('actor', sa.String(50), default='system'),
        sa.Column('details', postgresql.JSON()),
        sa.Column('success', sa.Boolean(), default=True),
        sa.Column('error', sa.Text()),
        sa.PrimaryKeyConstraint('id'),
    )

    # system_state
    op.create_table('system_state',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('is_paused', sa.Boolean(), default=False),
        sa.Column('autonomy_level', sa.Integer(), default=1),
        sa.Column('pause_reason', sa.Text()),
        sa.Column('paused_at', sa.DateTime()),
        sa.Column('paused_by', sa.String(100)),
        sa.Column('last_scrape_at', sa.DateTime()),
        sa.Column('total_dms_sent', sa.Integer(), default=0),
        sa.Column('total_deals_closed', sa.Integer(), default=0),
        sa.Column('total_revenue', sa.Float(), default=0.0),
        sa.Column('updated_at', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
    )

    # Seed system state row
    op.execute("INSERT INTO system_state (id, is_paused, autonomy_level, total_dms_sent, total_deals_closed, total_revenue) VALUES (1, false, 1, 0, 0, 0.0)")


def downgrade() -> None:
    op.drop_table('deals')
    op.drop_table('platform_listings')
    op.drop_table('outreach_attempts')
    op.drop_table('listings')
    op.drop_table('sellers')
    op.drop_table('audit_log')
    op.drop_table('system_state')
