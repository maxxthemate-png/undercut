#!/usr/bin/env bash
# verify-live.sh — confirm Undercut's Stripe is wired for LIVE payments end-to-end.
#
# Run this AFTER you've set the 6 STRIPE_* env vars in Render (live keys + 3 live
# price IDs + live webhook secret) and the service has redeployed.
#
# Usage:
#   ./scripts/verify-live.sh
#   API=https://undercut-api.onrender.com ./scripts/verify-live.sh
#
# It signs up a throwaway test user (livecheck.<timestamp>@example.com) and asks
# the API to start a checkout — then inspects the result. No secrets needed; it
# only reads what the live API returns.

API="${API:-https://undercut-api.onrender.com}"
EMAIL="livecheck.$(date +%s)@example.com"
PW="livecheck12345"
pass=0; fail=0
ck(){ if [ "$1" = "1" ]; then echo "  ✅ $2"; pass=$((pass+1)); else echo "  ❌ $2"; fail=$((fail+1)); fi; }

echo "→ Undercut LIVE billing check against $API"

# 1) API up
H=$(curl -s -m 30 "$API/health" 2>/dev/null)
case "$H" in *'"status":"ok"'*) ck 1 "API healthy";; *) ck 0 "API healthy (got: $H)";; esac

# 2) publishable key is a LIVE key
P=$(curl -s -m 30 "$API/api/billing/plans" 2>/dev/null)
case "$P" in
  *pk_live_*) ck 1 "publishable key is pk_live";;
  *pk_test_*) ck 0 "publishable key is still pk_TEST — set STRIPE_PUBLISHABLE_KEY to pk_live";;
  *)          ck 0 "no publishable key returned (STRIPE_PUBLISHABLE_KEY unset?)";;
esac

# 3) auth token
T=$(curl -s -m 30 -X POST "$API/api/auth/signup" -H 'Content-Type: application/json' \
      -d "{\"email\":\"$EMAIL\",\"password\":\"$PW\"}" 2>/dev/null \
    | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
[ -n "$T" ] && ck 1 "auth token obtained" || ck 0 "could not get an auth token"

# 4) checkout creates a LIVE Stripe session
if [ -n "$T" ]; then
  C=$(curl -s -m 30 -X POST "$API/api/billing/checkout" -H "Authorization: Bearer $T" \
        -H 'Content-Type: application/json' -d '{"plan":"starter"}' 2>/dev/null)
  URL=$(printf '%s' "$C" | sed -n 's/.*"url":"\([^"]*\)".*/\1/p')
  case "$URL" in
    *cs_live_*) ck 1 "checkout creates a LIVE session — Stripe is go-live ready";;
    *cs_test_*) ck 0 "checkout session is cs_TEST — STRIPE_SECRET_KEY is still a test key";;
    *checkout.stripe.com*) ck 1 "checkout returned a Stripe URL ($URL)";;
    *)          ck 0 "checkout did not return a Stripe URL — response: $C";;
  esac
fi

echo ""
echo "Result: $pass passed, $fail failed."
if [ "$fail" = "0" ]; then
  echo "🟢 LIVE billing is wired correctly — you can take real payments."
else
  echo "🔴 Not fully live yet. Fix the ❌ items: set the 6 STRIPE_* env vars in Render"
  echo "   (STRIPE_SECRET_KEY=sk_live, STRIPE_WEBHOOK_SECRET=whsec, STRIPE_PUBLISHABLE_KEY=pk_live,"
  echo "    STRIPE_PRICE_STARTER/PRO/SCALE = the 3 live price IDs) and let it redeploy."
fi
