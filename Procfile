web: uvicorn backend.api.main:app --host 0.0.0.0 --port ${PORT:-8000}
release: cd backend && python -m alembic upgrade head
