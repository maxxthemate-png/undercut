"""Lead capture (waitlist): leads table

Revision ID: 005_leads
Revises: 004_trial
Create Date: 2026-06-07
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '005_leads'
down_revision = '004_trial'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'leads',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('source', sa.String(50)),
        sa.Column('created_at', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('ix_leads_email', 'leads', ['email'])
    op.create_index('ix_leads_created_at', 'leads', ['created_at'])


def downgrade() -> None:
    op.drop_index('ix_leads_created_at', 'leads')
    op.drop_index('ix_leads_email', 'leads')
    op.drop_table('leads')
