"""Optional context note on a captured lead (e.g. the demo result a demo_share lead checked).

Revision ID: 011_lead_note
Revises: 010_price_tracker
"""
import sqlalchemy as sa
from alembic import op

revision = "011_lead_note"
down_revision = "010_price_tracker"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("leads", sa.Column("note", sa.String(300), nullable=True))


def downgrade():
    op.drop_column("leads", "note")
