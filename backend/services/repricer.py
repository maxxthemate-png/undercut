"""Undercut repricing engine — the core of the product.

Strategy: deterministically undercut the lowest competitor, optionally let the
AI advisor optimize the target, and ALWAYS clamp to a hard floor (never sell
below the seller's minimum) and optional ceiling. Rules guarantee safety; AI
optimizes within them.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class PricingInputs:
    current_price: float
    competitor_low: Optional[float]       # lowest competing price, if known
    floor: float                          # never price below this (cost + min margin)
    ceiling: Optional[float] = None       # never price above this
    undercut_value: float = 0.01          # how much to beat the competitor by
    undercut_type: str = "amount"         # "amount" ($) or "percent" (%)
    ai_target: Optional[float] = None     # optional AI-recommended price (pre-clamp)
    min_change: float = 0.01              # ignore sub-cent moves


@dataclass
class RepriceDecision:
    new_price: float
    changed: bool
    reason: str
    competitor_low: Optional[float]
    floored: bool                         # True if the floor was the binding constraint


def compute_price(inp: PricingInputs) -> RepriceDecision:
    """Decide the new price from competition + rules + (optional) AI target."""
    floor = round(inp.floor, 2)
    ceiling = round(inp.ceiling, 2) if inp.ceiling is not None else None

    if inp.ai_target is not None:
        target = float(inp.ai_target)
        reason = f"AI target ${target:.2f}"
    elif inp.competitor_low is not None:
        if inp.undercut_type == "percent":
            target = inp.competitor_low * (1 - inp.undercut_value / 100.0)
            reason = f"undercut competitor ${inp.competitor_low:.2f} by {inp.undercut_value:g}%"
        else:
            target = inp.competitor_low - inp.undercut_value
            reason = f"undercut competitor ${inp.competitor_low:.2f} by ${inp.undercut_value:g}"
    else:
        target = inp.current_price
        reason = "no competitor data — holding current"

    # Enforce rails — the floor is a hard guarantee (never lose money).
    floored = target < floor
    target = max(target, floor)
    if ceiling is not None:
        target = min(target, ceiling)
    target = round(target, 2)
    if floored:
        reason += f"; clamped UP to floor ${floor:.2f}"

    changed = abs(target - round(inp.current_price, 2)) >= inp.min_change
    return RepriceDecision(
        new_price=target, changed=changed, reason=reason,
        competitor_low=inp.competitor_low, floored=floored,
    )
