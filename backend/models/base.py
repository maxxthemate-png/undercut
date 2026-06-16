"""Shared SQLAlchemy declarative base.

Every ORM model in the app (repricer_models and friends) inherits from this
single ``Base`` so they register on one ``Base.metadata``.
"""
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
