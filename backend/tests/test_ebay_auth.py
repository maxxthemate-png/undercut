"""eBay Trading API auth transport.

An OAuth user token (the one the 1-click connect flow produces, format "v^1.1#…")
must travel in the X-EBAY-API-IAF-TOKEN header, NOT in the <eBayAuthToken> XML
element — that element is for legacy Auth'n'Auth tokens only. Sending an OAuth
token in the XML slot makes eBay reject every seller call (import + price write),
so the seller connects and sees nothing import. These tests lock the correct
transport for each token type.

This verifies the request SHAPE against eBay's documented requirement; a live
round-trip still needs a real seller token (not available without a seller
account).
"""
from backend.services.ebay_store import EbayStoreClient

OAUTH = "v^1.1#i^1#f^0#r^0#I^3#p^1#t^Ul41Xzk6abcd"   # eBay OAuth user token shape
LEGACY = "AgAAAA**legacy**AuthnAuthToken**EXAMPLE"      # legacy Auth'n'Auth shape


def test_oauth_token_rides_in_iaf_header_not_xml():
    c = EbayStoreClient(user_token=OAUTH)
    h = c._headers("GetMyeBaySelling")
    assert h["X-EBAY-API-IAF-TOKEN"] == OAUTH
    # The XML credentials block must be empty for OAuth — the token must NOT
    # appear in <eBayAuthToken>, or eBay rejects the call.
    creds = c._requester_credentials()
    assert creds == ""
    assert "eBayAuthToken" not in creds


def test_legacy_token_rides_in_xml_not_iaf_header():
    c = EbayStoreClient(user_token=LEGACY)
    h = c._headers("ReviseInventoryStatus")
    assert "X-EBAY-API-IAF-TOKEN" not in h
    creds = c._requester_credentials()
    assert "<eBayAuthToken>" in creds
    assert LEGACY in creds


def test_no_token_sends_neither():
    c = EbayStoreClient(user_token=OAUTH)
    c.user_token = ""  # set directly — the constructor falls back to settings
    assert "X-EBAY-API-IAF-TOKEN" not in c._headers("GetMyeBaySelling")
    assert c._requester_credentials() == ""


def test_oauth_token_classifier():
    assert EbayStoreClient(user_token=OAUTH)._is_oauth_token() is True
    assert EbayStoreClient(user_token=LEGACY)._is_oauth_token() is False
    c = EbayStoreClient(user_token=OAUTH)
    c.user_token = ""  # set directly — the constructor falls back to settings
    assert c._is_oauth_token() is False
