"""
ListingArb — Settings
Loads all configuration from environment variables.
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
    AUTONOMY_LEVEL: int = 1
    ENVIRONMENT: str = "development"
    SECRET_KEY: str = "change-me"
    TOKEN_ENC_KEY: Optional[str] = None   # Fernet key — encrypts seller OAuth tokens at rest
    ADMIN_KEY: Optional[str] = None        # founder metrics dashboard login (separate from cron key)

    # Database
    DATABASE_URL: str
    SUPABASE_URL: Optional[str] = None
    SUPABASE_ANON_KEY: Optional[str] = None

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # AI
    ANTHROPIC_API_KEY: str
    OPENAI_API_KEY: Optional[str] = None

    # Facebook
    FB_EMAIL: Optional[str] = None      # legacy (FB arbitrage) — not used by the repricer
    FB_PASSWORD: Optional[str] = None   # legacy — Optional so UNDERCUT boots without FB creds
    FB_DAILY_DM_LIMIT: int = 15
    FB_ACCOUNT_2_EMAIL: Optional[str] = None
    FB_ACCOUNT_2_PASSWORD: Optional[str] = None

    # Legacy FB->eBay arbitrage pipeline — OFF by default. A deployed repricer must
    # never run the old Facebook scraping/DM jobs. Flip true only to run legacy.
    ENABLE_LEGACY_ARBITRAGE: bool = False

    # Gates the /api/repricer admin+data routes. Set in prod; unset locally = open.
    UNDERCUT_API_KEY: Optional[str] = None
    # Stripe billing
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None
    STRIPE_PUBLISHABLE_KEY: Optional[str] = None
    STRIPE_PRICE_STARTER: Optional[str] = None
    STRIPE_PRICE_PRO: Optional[str] = None
    STRIPE_PRICE_SCALE: Optional[str] = None
    PUBLIC_APP_URL: Optional[str] = None

    # Proxy
    PROXY_URL: Optional[str] = None
    PROXY_ENABLED: bool = False

    # Notifications
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_FROM_NUMBER: Optional[str] = None
    OPERATOR_PHONE: str = ""
    OPERATOR_EMAIL: str = ""
    SENDGRID_API_KEY: Optional[str] = None
    FROM_EMAIL: str = "alerts@listingarb.com"

    # eBay
    EBAY_APP_ID: Optional[str] = None
    EBAY_CERT_ID: Optional[str] = None
    EBAY_DEV_ID: Optional[str] = None
    EBAY_USER_TOKEN: Optional[str] = None
    EBAY_SANDBOX: bool = True          # use sandbox endpoint until you flip to production
    EBAY_ITEM_ZIP: str = "53202"       # item-location ZIP for listings (eBay requires a valid one)
    EBAY_RU_NAME: Optional[str] = None       # eBay OAuth Redirect URL name (RuName)
    EBAY_OAUTH_SCOPES: str = "https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.inventory"

    # Deal parameters
    MIN_LISTING_PRICE: float = 10000
    TARGET_LOCATIONS: str = "Milwaukee,WI"
    TARGET_CATEGORIES: str = "RV,boat,trailer,classic car,heavy equipment"

    # Rate limiting
    DM_COOLDOWN_HOURS: int = 24
    MAX_ACTIVE_DEALS: int = 50

    # Contract
    OPERATOR_LEGAL_NAME: str = "Your Company LLC"
    OPERATOR_ADDRESS: str = "Your Address"

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # tolerate undeclared keys present in .env (e.g. DOCUSIGN_*)


settings = Settings()
