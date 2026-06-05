web: uvicorn backend.api.main:app --host 0.0.0.0 --port ${PORT:-8000}
worker: celery -A backend.tasks.worker:celery_app worker --loglevel=info --concurrency=2
beat: celery -A backend.tasks.worker:celery_app beat --loglevel=info
release: cd backend && python -m alembic upgrade head
