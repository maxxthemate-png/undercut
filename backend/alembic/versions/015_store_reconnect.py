"""Track stores whose eBay auth is dead and can only be fixed by the seller
re-consenting, so we stop retrying (and alerting) forever on an unfixable state.

Revision ID: 015_store_reconnect
Revises: 014_store_import_state
"""
import sqlalchemy as sa
from alembic import op

revision = "015_store_reconnect"
down_revision = "014_store_import_state"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("stores", sa.Column("needs_reconnect", sa.Boolean(),
                                      nullable=False, server_default=sa.false()))
    op.add_column("stores", sa.Column("last_alerted_error", sa.String(500), nullable=True))


def downgrade():
    op.drop_column("stores", "last_alerted_error")
    op.drop_column("stores", "needs_reconnect")
