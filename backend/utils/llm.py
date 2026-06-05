"""Helpers for parsing LLM responses robustly."""
import json
import re


def extract_json(text: str) -> dict:
    """Parse JSON from a model response, tolerating ```json fences or stray prose.

    Models occasionally wrap JSON in markdown code fences or add a sentence before
    it despite instructions. This strips fences and, as a fallback, grabs the
    outermost {...} block so a stray fence never costs us a scored listing.
    """
    s = (text or "").strip()
    if s.startswith("```"):
        s = re.sub(r"^```(?:json)?\s*", "", s)
        s = re.sub(r"\s*```$", "", s).strip()
    try:
        return json.loads(s)
    except json.JSONDecodeError:
        start, end = s.find("{"), s.rfind("}")
        if start != -1 and end > start:
            return json.loads(s[start:end + 1])
        raise
