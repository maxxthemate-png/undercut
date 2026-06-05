# ListingArb — AI-Powered Marketplace Arbitrage System

## What It Does
Monitors Facebook Marketplace for high-ticket items ($10k+), auto-outreaches sellers with a zero-risk pitch, cross-posts agreements to 10-15 platforms, and coordinates deals — capturing the upside as your fee.

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker + Docker Compose
- Supabase account (free tier works)
- Redis (via Docker)
- Twilio account (SMS alerts)
- Anthropic API key

### 1. Clone and configure
```bash
git clone <your-repo>
cd listingarb
cp .env.example .env
# Fill in all values in .env
```

### 2. Start infrastructure
```bash
docker-compose up -d redis
```

### 3. Install Python dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
playwright install chromium
```

### 4. Run database migrations
```bash
python -m alembic upgrade head
```

### 5. Start the backend
```bash
# Terminal 1: FastAPI server
uvicorn api.main:app --reload --port 8000

# Terminal 2: Celery worker
celery -A tasks.worker worker --loglevel=info

# Terminal 3: Celery beat (scheduler)
celery -A tasks.worker beat --loglevel=info
```

### 6. Start the dashboard
```bash
cd dashboard
npm install
npm run dev
# Visit http://localhost:3000
```

## Autonomy Levels
Set `AUTONOMY_LEVEL` in `.env`:
- `1` — Monitors + suggests + drafts DMs (you approve/send)
- `2` — Auto-sends DMs + handles conversation until agreement
- `3` — Full autonomy: listing creation + posting after seller agreement

**Start at Level 1. Prove the model. Then escalate.**

## Emergency Pause
```bash
# Halt all agents immediately
curl -X POST http://localhost:8000/api/system/pause

# Or from the dashboard: click the red "Emergency Pause" button
```

## Project Structure
```
listingarb/
├── backend/
│   ├── agents/          # AI agent logic (scorer, dm_gen, response_classifier)
│   ├── scrapers/        # Marketplace scrapers (Facebook, Craigslist)
│   ├── automation/      # Playwright automation (DM sender, platform poster)
│   ├── services/        # Core business logic services
│   ├── api/             # FastAPI routes
│   ├── models/          # SQLAlchemy models
│   ├── tasks/           # Celery tasks + scheduler
│   └── utils/           # Helpers: logging, rate limiter, notifications
├── dashboard/           # Next.js operator dashboard
├── contracts/           # Contract template + generator
├── docker/              # Dockerfiles
├── n8n/                 # n8n workflow exports
└── scripts/             # Setup and utility scripts
```
