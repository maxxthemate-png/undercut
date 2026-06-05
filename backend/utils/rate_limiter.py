"""
ListingArb — Rate Limiters
Controls DM send rate, scraping frequency, and API call throttling.
These limits protect FB account health. Do NOT remove them.
"""

import asyncio
from datetime import datetime, date
from typing import Optional
import redis.asyncio as aioredis
from ..utils.settings import settings


class RateLimiter:
    """General rate limiter — max N requests per time window."""

    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._requests = []

    async def wait(self):
        """Wait if necessary to respect rate limit."""
        now = datetime.utcnow().timestamp()
        # Remove old requests outside window
        self._requests = [t for t in self._requests if now - t < self.window_seconds]

        if len(self._requests) >= self.max_requests:
            # Calculate how long to wait
            oldest = self._requests[0]
            wait_time = self.window_seconds - (now - oldest) + 1
            await asyncio.sleep(max(0, wait_time))

        self._requests.append(now)


class DailyRateLimiter:
    """
    Tracks daily DM sends using Redis.
    Resets at midnight. Persists across process restarts.
    """

    def __init__(self, max_per_day: int):
        self.max_per_day = max_per_day
        self._redis: Optional[aioredis.Redis] = None

    async def _get_redis(self) -> aioredis.Redis:
        if not self._redis:
            self._redis = await aioredis.from_url(settings.REDIS_URL)
        return self._redis

    def _today_key(self) -> str:
        return f"listingarb:dm_count:{date.today().isoformat()}"

    async def can_send(self) -> bool:
        r = await self._get_redis()
        count = await r.get(self._today_key())
        current = int(count) if count else 0
        return current < self.max_per_day

    async def record_send(self):
        r = await self._get_redis()
        key = self._today_key()
        pipe = r.pipeline()
        pipe.incr(key)
        pipe.expire(key, 86400 * 2)  # Keep for 2 days
        await pipe.execute()

    async def today_count(self) -> int:
        r = await self._get_redis()
        count = await r.get(self._today_key())
        return int(count) if count else 0

    async def seconds_until_reset(self) -> int:
        """Seconds until midnight UTC (when counter resets)."""
        now = datetime.utcnow()
        midnight = datetime(now.year, now.month, now.day + 1)
        return int((midnight - now).total_seconds())
