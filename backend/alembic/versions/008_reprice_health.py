"""Reprice health tracking + lifecycle email stamps + reprice_runs (ops digest).

Revision ID: 008_reprice_health
Revises: 007_unsubscribe
"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import UUID

revision = "008_reprice_health"
down_revision = "007_unsubscribe"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("repricer_listings", sa.Column("consecutive_failures", sa.Integer(), server_default="0"))
    op.add_column("repricer_listings", sa.Column("last_error", sa.Text()))
    op.add_column("repricer_listings", sa.Column("last_error_at", sa.DateTime()))
    op.add_column("stores", sa.Column("last_reprice_run_at", sa.DateTime()))
    op.add_column("users", sa.Column("first_reprice_emailed_at", sa.DateTime()))
    op.add_column("users", sa.Column("last_weekly_digest_at", sa.DateTime()))
    op.add_column("users", sa.Column("winback_emailed_at", sa.DateTime()))
    op.create_table(
        "reprice_runs",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("ran_at", sa.DateTime(), index=True),
        sa.Column("checked", sa.Integer(), server_default="0"),
        sa.Column("repriced", sa.Integer(), server_default="0"),
        sa.Column("errors", sa.Integer(), server_default="0"),
        sa.Column("error_sample", sa.Text()),
    )


def downgrade():
    op.drop_table("reprice_runs")
    op.drop_column("users", "winback_emailed_at")
    op.drop_column("users", "last_weekly_digest_at")
    op.drop_column("users", "first_reprice_emailed_at")
    op.drop_column("stores", "last_reprice_run_at")
    op.drop_column("repricer_listings", "last_error_at")
    op.drop_column("repricer_listings", "last_error")
    op.drop_column("repricer_listings", "consecutive_failures")
