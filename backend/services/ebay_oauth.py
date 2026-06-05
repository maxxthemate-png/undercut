"""eBay OAuth (user consent) for multi-tenant store onboarding.

Flow: build_consent_url() -> seller approves on eBay -> eBay redirects to your
RuName with ?code= -> exchange_code() -> access + refresh tokens stored per Store.
refresh() renews the access token when it expires.
"""
import base64
import urllib.parse

import httpx

from ..utils.settings import settings
from ..utils.logging import get_logger

logger = get_logger(__name__)

_AUTH = {"prod": "https://auth.ebay.com/oauth2/authorize",
         "sbx": "https://auth.sandbox.ebay.com/oauth2/authorize"}
_TOKEN = {"prod": "https://api.ebay.com/identity/v1/oauth2/token",
          "sbx": "https://api.sandbox.ebay.com/identity/v1/oauth2/token"}


def _env() -> str:
    return "sbx" if settings.EBAY_SANDBOX else "prod"


def is_configured() -> bool:
    ru = settings.EBAY_RU_NAME or ""
    return bool(ru) and "..." not in ru and "your-" not in ru.lower()


def build_consent_url(state: str = "") -> str:
    params = {
        "client_id": settings.EBAY_APP_ID,
        "redirect_uri": settings.EBAY_RU_NAME,
        "response_type": "code",
        "scope": settings.EBAY_OAUTH_SCOPES,
    }
    if state:
        params["state"] = state
    return _AUTH[_env()] + "?" + urllib.parse.urlencode(params)


def _basic_auth() -> str:
    return base64.b64encode(f"{settings.EBAY_APP_ID}:{settings.EBAY_CERT_ID}".encode()).decode()


async def exchange_code(code: str) -> dict:
    """Exchange an authorization code for access + refresh tokens."""
    async with httpx.AsyncClient(timeout=20) as c:
        r = await c.post(
            _TOKEN[_env()],
            headers={"Authorization": f"Basic {_basic_auth()}",
                     "Content-Type": "application/x-www-form-urlencoded"},
            data={"grant_type": "authorization_code", "code": code,
                  "redirect_uri": settings.EBAY_RU_NAME},
        )
    return r.json()


async def refresh(refresh_token: str) -> dict:
    """Renew an access token from a refresh token."""
    async with httpx.AsyncClient(timeout=20) as c:
        r = await c.post(
            _TOKEN[_env()],
            headers={"Authorization": f"Basic {_basic_auth()}",
                     "Content-Type": "application/x-www-form-urlencoded"},
            data={"grant_type": "refresh_token", "refresh_token": refresh_token,
                  "scope": settings.EBAY_OAUTH_SCOPES},
        )
    return r.json()
