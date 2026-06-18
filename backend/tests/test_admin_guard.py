"""The seed/wipe safety guard — the `wipe` path hard-deletes a user + all data,
so the email guard must NEVER admit a real account. We tightened it from
(endswith('.test') OR 'demo' in email) to a strict '@undercut.test' domain.

These tests exercise the reject + auth paths (which short-circuit before any DB
work). The full seed/create happy path needs a seeded DB and is out of scope here.
"""


def test_wipe_rejects_real_gmail_with_demo_substring(client):
    # The exact foot-gun the fix closes: a real account whose email contains "demo".
    r = client.post("/api/admin/seed-demo",
                    json={"email": "demo.store@gmail.com", "wipe": True},
                    headers={"X-Admin-Key": "test-admin-key"})
    assert r.status_code == 400


def test_wipe_rejects_substring_demo_outlook(client):
    r = client.post("/api/admin/seed-demo",
                    json={"email": "bigdemo@outlook.com", "wipe": True},
                    headers={"X-Admin-Key": "test-admin-key"})
    assert r.status_code == 400


def test_seed_demo_requires_admin_key(client):
    # No key → 403 before anything else runs.
    r = client.post("/api/admin/seed-demo", json={"email": "demo@undercut.test"})
    assert r.status_code == 403


def test_seed_demo_rejects_wrong_admin_key(client):
    r = client.post("/api/admin/seed-demo",
                    json={"email": "demo@undercut.test"},
                    headers={"X-Admin-Key": "not-the-key"})
    assert r.status_code == 403
