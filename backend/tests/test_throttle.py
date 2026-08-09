"""Regression tests for the shared per-IP throttle.

The eviction path is the one that regressed before: it used to drop only
entries whose deque was empty, a condition that is never true, so the table
grew without bound on the public tool endpoints that SEO traffic and bot
scanners hit. These tests pin both the rate-limit behavior and the bound.
"""
import time

from backend.utils.throttle import IPThrottle


def test_limit_and_window():
    t = IPThrottle(3, 60)
    assert [t.over_limit("1.1.1.1") for _ in range(4)] == [False, False, False, True]
    # A different ip has its own window.
    assert t.over_limit("2.2.2.2") is False


def test_window_expiry_releases_the_limit():
    t = IPThrottle(2, 1)
    assert t.over_limit("3.3.3.3") is False
    assert t.over_limit("3.3.3.3") is False
    assert t.over_limit("3.3.3.3") is True
    time.sleep(1.1)
    assert t.over_limit("3.3.3.3") is False


def test_idle_ips_are_evicted_not_retained_forever():
    """A burst of one-shot ips must not stay resident once their window passes."""
    t = IPThrottle(8, 1, max_entries=200)
    for i in range(1000):
        t.over_limit(f"10.1.{i // 256}.{i % 256}")
    time.sleep(1.1)
    for i in range(50):
        t.over_limit(f"192.168.0.{i}")
    assert len(t._hits) <= 60, f"stale entries retained: {len(t._hits)}"


def test_table_stays_bounded_under_a_flood_of_active_ips():
    """Even when every ip is still inside its window, memory stays capped."""
    t = IPThrottle(8, 60, max_entries=500)
    for i in range(5000):
        t.over_limit(f"10.2.{i // 256}.{i % 256}")
    assert len(t._hits) <= 500, f"unbounded growth: {len(t._hits)}"


def test_eviction_does_not_drop_the_ip_being_checked():
    t = IPThrottle(3, 60, max_entries=100)
    for i in range(500):
        t.over_limit(f"10.3.{i // 256}.{i % 256}")
    # The most recent caller must still be counted, or eviction would hand an
    # attacker a free reset every time the table fills.
    assert t.over_limit("10.3.1.243") is False
    assert "10.3.1.243" in t._hits
