/** Shared product-claims ground truth + a deterministic "false claim" scanner.
 *
 * Used by:
 *   - generate-content.mjs : injected into the generation prompt (allowlist) and
 *     run as a local gate so a hallucinated page is rejected + regenerated.
 *   - lint-content.mjs     : CI backstop — fails the build if any live page makes
 *     a claim outside the allowlist (so the autonomous weekly run can't ship one).
 *   - scan-claims (ad hoc) : `node scripts/content-claims.mjs <file...>` to list hits.
 *
 * The scanner is intentionally HIGH-PRECISION (tuned to zero false positives on
 * the current corpus): it only flags phrasings that describe capabilities the
 * product does NOT have, or attribute a Pro-only feature to other tiers. It is a
 * backstop, not the primary gate — the generator's LLM self-verify is.
 */

// The closed feature allowlist, injected verbatim into the generation prompt.
export const PRODUCT_FACTS = `UNDERCUT — GROUND TRUTH (treat as a CLOSED list; anything beyond it is forbidden):
WHAT IT DOES: automatically reprices a seller's eBay listings to just beat the lowest comparable live competitor, ALWAYS clamped to a per-listing HARD FLOOR (and an OPTIONAL per-listing ceiling) so it never sells below the seller's minimum.
THE ONLY FEATURES ARE: (1) automatic repricing to beat the lowest comparable competitor; (2) a per-listing hard floor; (3) an optional per-listing ceiling; (4) a configurable undercut amount (fixed cents OR a percentage); (5) OPTIONAL per-listing Claude AI aggressiveness tuning that only adjusts how fast/how far a listing moves toward its already-set floor and NEVER overrides the floor.
PLANS (match the live pricing page exactly):
  - Free: 25 listings, hourly repricing, rule-based undercut, hard floor. NO AI.
  - Starter $29/mo: 100 listings, hourly repricing, rule-based undercut, hard floor. NO AI.
  - Pro $79/mo: 1,000 listings, 15-minute repricing, AI price optimizer (AI aggressiveness tuning).
  - Scale $199/mo: 10,000 listings, 15-minute repricing, AI price optimizer (AI aggressiveness tuning), priority support.
  - The AI price optimizer / AI aggressiveness tuning is available on BOTH Pro AND Scale (the top two tiers). When attributing it to plans, say "Pro and Scale" — never imply it is Pro-only or that Scale lacks it. Free and Starter are rule-based only (no AI).
  - REPRICING FREQUENCY: the fastest cadence is EVERY 15 MINUTES, on Pro AND Scale equally — Scale is NOT faster than Pro. Free and Starter reprice hourly. NEVER claim 5-minute, 10-minute, "real-time", or any sub-15-minute repricing, and never sell Scale on repricing SPEED — it does not exist. Scale's only advantages over Pro are capacity (10,000 listings) and priority support.
  - COMPETITOR PRICE TRACKING runs on EVERY plan (it is core to how repricing works). NEVER present it as a Pro-only or Scale-only feature, or as something a tier "unlocks".
  - New signups get a no-card 14-day trial at Starter level.
  - SEASON PASS: a $145 ONE-TIME purchase (not a subscription, nothing auto-renews) that grants 90 days of Starter-level access: 100 listings, hourly repricing, rule-based undercut, hard floor, NO AI. Buying it again extends the window. It is a billing option, not a feature tier, and it does NOT unlock anything Starter lacks. Never describe it as monthly, as recurring, as a plan with its own features, or as including AI tuning.
eBay FACTS YOU MAY USE: final value fee ~13.6% (varies by category; this is the standard rate since eBay's Feb 2025 fee update, superseding the older 13.25%), Best Match search ranking, Best Offer, Promoted Listings, Markdown Manager. eBay uses Best Match, NOT an Amazon-style formal "Buy Box".
STRICTLY FORBIDDEN (these capabilities DO NOT EXIST — never mention or imply them): bulk CSV import / bulk-import / importing or re-importing floors from a file; a tagging or labels system or rule-by-tag; a rules / segmentation engine; cohorts or "listing groups"; stored competitor price-history or trend charts inside Undercut; automatic age/time tracking of listings or time-based auto-escalation; inventory / sell-through / demand / sales-velocity awareness as AI inputs; multi-marketplace repricing (Amazon/Walmart/etc.); inventory or order management; named dashboard UI widgets you cannot verify. If a workflow would need any of these, describe it as something the SELLER does manually per listing — never as an Undercut feature.`

// High-precision patterns. Each: { id, re, why }. `re` must use the global flag.
const PATTERNS = [
  // AI price optimizer is a Pro AND Scale feature (matches the live pricing page).
  // Flag only the inaccurate cases: AI attributed to Free/Starter, or stated as Pro-EXCLUSIVE.
  // Only flag AI attributed TO free/starter (same clause — gap excludes clause separators
  // ) $ ; — so a frequency ladder like "(Free/Starter), 15-min (Pro and Scale) ... AI" no
  // longer matches across the paren), or AI stated as Pro-EXCLUSIVE.
  { id: 'ai-on-wrong-tier', why: 'AI price optimizer is Pro AND Scale only — not Free/Starter, and not Pro-exclusive',
    re: /\b(free|starter)\b[^.)$;—]{0,50}(ai aggressiv|ai price optimi|ai tuning|ai-powered)|(ai aggressiv|ai price optimi|ai tuning|ai-powered)[^.)$;—]{0,50}\b(free|starter)\b|(ai (aggressiv\w*|tuning|price optimi\w*)[^.]{0,40}\b(only on pro|pro only|pro plan only|exclusive to pro)\b)/gi },
  // Flags the FEATURE claim only (bulk import; csv paired with import/upload/export;
  // re-import paired with floors) — a manual "export, edit a spreadsheet, re-import"
  // workflow (which PRODUCT_FACTS allows describing) no longer trips it.
  { id: 'bulk-import', why: 'no bulk/CSV import of floors exists (manual seller spreadsheet workflows are allowed)',
    re: /bulk[- ]?import|\b(import|upload|export)\b[^.]{0,30}\bcsv\b|\bcsv\b[^.]{0,30}\b(import|upload|export)\b|re-?import\w*[^.]{0,25}\bfloors?\b|\bfloors?\b[^.]{0,25}re-?import/gi },
  { id: 'tagging-feature', why: 'no tagging / rule-by-tag system exists',
    re: /\b(set rules by tag|rules by tag|by tag\b|tag it by|tag listings|tag parts|tag inventory|tag condition|tag your inventory|tagging your inventory)\b/gi },
  { id: 'rules-engine', why: 'no rules/segmentation engine exists', re: /rules do the rest|rules engine|segmentation engine/gi },
  { id: 'listing-groups', why: 'no listing-group / cohort segmentation exists', re: /per listing group|listing group|by listing group/gi },
  // Fires only when Undercut's AI/optimizer is said to READ/USE one of these as an INPUT.
  // The negation guard (?!not|never|…) exempts honest disclaimers ("the AI does NOT read
  // sales velocity"); the AI-subject requirement exempts eBay-algorithm / market mentions
  // ("eBay looks at sales velocity", "demand problem", "whether sales velocity improves").
  { id: 'invented-ai-inputs', why: 'Undercut AI does not read demand/velocity/sell-through/inventory as inputs (mentioning them as eBay/market factors, or disclaiming them, is fine)',
    re: /\b(reads? competitor pricing patterns|competitor pricing patterns)\b|\b(ai|a\.i\.|optimi[sz]er|ai tuning|repricer|repricing engine|algorithm)\b(?:(?!\b(?:not|never|no|cannot|doesn|don|without)\b)[^.]){0,45}\b(reads?|uses?|factors?|considers?|analy[sz]es?|incorporates?|ingests?|monitors?|tracks?|looks? at|aware of|responds? to|driven by|based on|takes? into account)\b[^.]{0,25}\b(sell-?through|sales velocit\w+|demand|inventory)\b/gi },
  { id: 'default-floor-feature', why: 'no account/catalog/site-wide default floor or per-item floor override exists — floors are per-listing (the only account-level default is the undercut amount)',
    re: /default floor|per-item (floor )?override|per-listing override|two-layer system/gi },
  // 15 minutes is the hard ceiling (Pro and Scale alike). No 5/10-minute, sub-15-minute,
  // or "real-time" repricing exists, and Scale is NOT faster than Pro.
  { id: 'sub-15min-frequency', why: '15 minutes is the fastest reprice cadence (Pro and Scale equally) — no 5/10-minute, sub-15-minute, or real-time repricing exists; never sell Scale on speed',
    re: /\b(five|ten|[1-9]|1[0-4])[- ]?minute(s)?\b[^.]{0,25}(repric|cycle|interval|cadence)|\bevery\s+(five|ten|[1-9]|1[0-4])\s+minutes?\b|\breal[- ]?time\s+repric/gi },
  // Competitor price tracking runs on every plan — never a Pro/Scale-only unlock.
  { id: 'competitor-tracking-gated', why: 'competitor price tracking runs on every plan — never a Pro/Scale-only unlock',
    re: /\b(unlocks?|pro plan|scale plan|pro[- ]only|upgrade to (pro|scale)|only on (pro|scale))\b[^.]{0,40}competitor tracking|competitor tracking[^.]{0,40}\b(only|unlock|pro plan|scale plan|upgrade)\b/gi },
]

export function scanText(text) {
  const hits = []
  for (const p of PATTERNS) {
    p.re.lastIndex = 0
    let m
    while ((m = p.re.exec(text)) !== null) {
      const s = Math.max(0, m.index - 30)
      hits.push({ id: p.id, why: p.why, excerpt: text.slice(s, m.index + m[0].length + 30).replace(/\s+/g, ' ').trim() })
    }
  }
  return hits
}

// Scan a whole PageContent object's prose fields.
export function scanPage(p) {
  const parts = [p.intro || '']
  for (const s of p.sections || []) { parts.push(s.h2 || '', s.body || ''); for (const b of s.bullets || []) parts.push(b) }
  for (const f of p.faq || []) parts.push(f.q || '', f.a || '')
  if (p.cta) parts.push(p.cta.heading || '', p.cta.sub || '')
  return scanText(parts.join('\n')).map((h) => ({ slug: p.slug, ...h }))
}

// CLI: node scripts/content-claims.mjs <collection-index.ts...>
if (import.meta.url === `file://${process.argv[1]}`) {
  const { readFileSync } = await import('fs')
  let total = 0
  for (const file of process.argv.slice(2)) {
    const src = readFileSync(file, 'utf8')
    const arr = new Function(`return ${src.slice(src.indexOf('['), src.lastIndexOf(']') + 1)}`)()
    for (const p of arr) {
      for (const h of scanPage(p)) { console.log(`${file} :: ${p.slug} [${h.id}] ${h.excerpt}`); total++ }
    }
  }
  console.log(`\n${total} suspicious claim(s).`)
  process.exit(total ? 1 : 0)
}
