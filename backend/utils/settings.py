"""
Undercut — Settings
Loads all configuration from environment variables.
(Dead ListingArb-era fields — FB creds, proxies, deal params, Twilio, Supabase,
Redis, OpenAI — removed 2026-07-03; Config.extra="ignore" means leftover env
vars for them are harmless.)
"""

import os
from pydantic_settings import BaseSettings
from typing import Optional
from dotenv import load_dotenv

# The host environment (e.g. Claude for Desktop) injects an EMPTY ANTHROPIC_API_KEY
# that otherwise shadows our .env (env vars outrank the dotenv file in pydantic).
# Load the project-root .env with override=True so the file is the source of truth,
# regardless of ambient env vars or the current working directory.
load_dotenv(
    os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env"),
    override=True,
)


class Settings(BaseSettings):
    # System
    ENVIRONMENT: str = "development"
    SECRET_KEY: str = "change-me"
    TOKEN_ENC_KEY: Optional[str] = None   # Fernet key — encrypts seller OAuth tokens at rest
    ADMIN_KEY: Optional[str] = None        # founder metrics dashboard login (separate from cron key)

    # Database
    DATABASE_URL: str

    # AI
    ANTHROPIC_API_KEY: str

    # Gates the /api/repricer admin+data routes. Set in prod; unset locally = open.
    UNDERCUT_API_KEY: Optional[str] = None
    # Stripe billing
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None
    STRIPE_PUBLISHABLE_KEY: Optional[str] = None
    STRIPE_PRICE_STARTER: Optional[str] = None
    STRIPE_PRICE_PRO: Optional[str] = None
    STRIPE_PRICE_SCALE: Optional[str] = None
    STRIPE_PRICE_STARTER_ANNUAL: Optional[str] = None
    STRIPE_PRICE_PRO_ANNUAL: Optional[str] = None
    STRIPE_PRICE_SCALE_ANNUAL: Optional[str] = None
    PUBLIC_APP_URL: Optional[str] = None
    PUBLIC_API_URL: Optional[str] = None   # backend base URL (unsubscribe links)
    REPRICER_ENFORCE_PLAN_LIMITS: bool = False   # gate reprice volume by plan (ON in prod)
    REPRICER_TIER_FREQUENCY: bool = False        # plan-based reprice interval (ON in prod)
    DUNNING_GRACE_DAYS: int = 7                  # days past_due before access drops to free

    # Notifications
    OPERATOR_EMAIL: str = ""
    SENDGRID_API_KEY: Optional[str] = None
    FROM_EMAIL: str = "hello@undercutpricer.com"  # fallback only; prod sets FROM_EMAIL at the service level

    # eBay
    EBAY_APP_ID: Optional[str] = None
    EBAY_CERT_ID: Optional[str] = None
    EBAY_DEV_ID: Optional[str] = None
    EBAY_USER_TOKEN: Optional[str] = None
    EBAY_SANDBOX: bool = True          # use sandbox endpoint until you flip to production
    EBAY_RU_NAME: Optional[str] = None       # eBay OAuth Redirect URL name (RuName)
    EBAY_OAUTH_SCOPES: str = "https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.inventory"

    # CAN-SPAM footer in customer emails
    OPERATOR_LEGAL_NAME: str = "Your Company LLC"
    OPERATOR_ADDRESS: str = "Your Address"

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # tolerate undeclared keys present in .env (e.g. legacy vars)


settings = Settings()
