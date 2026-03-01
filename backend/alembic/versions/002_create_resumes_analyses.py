"""create resumes and analyses tables

Revision ID: 002_create_resumes_analyses
Revises: 001_create_users
Create Date: 2026-03-01
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "002_create_resumes_analyses"
down_revision = "001_create_users"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "resumes",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("filename", sa.String(), nullable=False),
        sa.Column("file_path", sa.String(), nullable=False),
        sa.Column("raw_text", sa.Text(), nullable=True),
        sa.Column("status", sa.String(), server_default="uploaded"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
    )
    op.create_index("ix_resumes_user_id", "resumes", ["user_id"])

    op.create_table(
        "analyses",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("resume_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("resumes.id"), nullable=False),
        sa.Column("overall_score", sa.Float(), nullable=True),
        sa.Column("sections", postgresql.JSON(), nullable=True),
        sa.Column("suggestions", postgresql.JSON(), nullable=True),
        sa.Column("keywords", postgresql.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
    )
    op.create_index("ix_analyses_resume_id", "analyses", ["resume_id"])


def downgrade() -> None:
    op.drop_index("ix_analyses_resume_id", table_name="analyses")
    op.drop_table("analyses")
    op.drop_index("ix_resumes_user_id", table_name="resumes")
    op.drop_table("resumes")
