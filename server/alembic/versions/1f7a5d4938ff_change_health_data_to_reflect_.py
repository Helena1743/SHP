"""Change health Data to reflect prediction models more accurately

Revision ID: 1f7a5d4938ff
Revises: 1b51e10b1607
Create Date: 2025-11-09 10:05:46.676680
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '1f7a5d4938ff'
down_revision: Union[str, Sequence[str], None] = '1b51e10b1607'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add new height column
    op.add_column(
        'HealthData',
        sa.Column('HeightCentimetreMeters', sa.Numeric(precision=5, scale=2), nullable=True)
    )

    # Fix MySQL → PostgreSQL integer type conversions
    op.alter_column(
        'HealthData', 'SmokingStatus',
        type_=sa.Integer(),
        existing_nullable=True,
        postgresql_using='"SmokingStatus"::integer'
    )

    op.alter_column(
        'HealthData', 'MaritalStatus',
        type_=sa.Integer(),
        existing_nullable=True,
        postgresql_using='"MaritalStatus"::integer'
    )

    op.alter_column(
        'HealthData', 'WorkingStatus',
        type_=sa.Integer(),
        existing_nullable=True,
        postgresql_using='"WorkingStatus"::integer'
    )

    # Remove deprecated columns
    op.drop_column('HealthData', 'HeightMeters')
    op.drop_column('HealthData', 'Exercise')


def downgrade() -> None:
    """Downgrade schema."""
    # Restore old MySQL-like structure (Postgres equivalent)
    op.add_column(
        'HealthData',
        sa.Column('Exercise', sa.Integer(), nullable=True)
    )

    op.add_column(
        'HealthData',
        sa.Column('HeightMeters', sa.Numeric(precision=3, scale=2), nullable=True)
    )

    op.alter_column(
        'HealthData', 'WorkingStatus',
        type_=sa.Integer(),  # cannot restore MySQL TINYINT exactly
        existing_nullable=True
    )

    op.alter_column(
        'HealthData', 'MaritalStatus',
        type_=sa.Integer(),
        existing_nullable=True
    )

    op.alter_column(
        'HealthData', 'SmokingStatus',
        type_=sa.Integer(),
        existing_nullable=True
    )

    op.drop_column('HealthData', 'HeightCentimetreMeters')
