"""Lead nurture + lifecycle email tracking

Revision ID: 006_lifecycle
Revises: 005_leads
Create Date: 2026-06-09
"""
from alembic import op
import sqlalchemy as sa

revision = '006_lifecycle'
down_revision = '005_leads'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('leads', sa.Column('nurture_stage', sa.Integer(), server_default='0'))
    op.add_column('leads', sa.Column('last_emailed_at', sa.DateTime()))
    op.add_column('users', sa.Column('last_lifecycle_email', sa.DateTime()))
    op.add_column('users', sa.Column('last_lifecycle_stage', sa.String(length=30)))


def downgrade() -> None:
    op.drop_column('users', 'last_lifecycle_stage')
    op.drop_column('users', 'last_lifecycle_email')
    op.drop_column('leads', 'last_emailed_at')
    op.drop_column('leads', 'nurture_stage')
