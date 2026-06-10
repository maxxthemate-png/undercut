"""Email unsubscribe flags (CAN-SPAM) on users + leads.

Revision ID: 007_unsubscribe
Revises: 006_lifecycle
"""
import sqlalchemy as sa
from alembic import op

revision = "007_unsubscribe"
down_revision = "006_lifecycle"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("email_unsubscribed", sa.Boolean(), server_default="false"))
    op.add_column("leads", sa.Column("email_unsubscribed", sa.Boolean(), server_default="false"))


def downgrade():
    op.drop_column("leads", "email_unsubscribed")
    op.drop_column("users", "email_unsubscribed")
