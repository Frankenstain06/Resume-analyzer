"""Alembic environment configuration."""
from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

from app.core.database import Base
from app.models import *  # noqa: F401,F403

target_metadata = Base.metadata
