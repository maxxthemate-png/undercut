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
  - Pro $79/mo: 1,000 listings, 15-minute repricing, AI price optimizer (AI aggressiveness tuning), competitor tracking.
  - Scale $199/mo: 10,000 listings, 5-minute repricing, AI price optimizer (AI aggressiveness tuning), priority support.
  - The AI price optimizer / AI aggressiveness tuning is available on BOTH Pro AND Scale (the top two tiers). When attributing it to plans, say "Pro and Scale" — never imply it is Pro-only or that Scale lacks it. Free and Starter are rule-based only (no AI).
  - New signups get a no-card 14-day trial at Starter level.
eBay FACTS YOU MAY USE: final value fee ~13.25% (varies by category), Best Match search ranking, Best Offer, Promoted Listings, Markdown Manager. eBay uses Best Match, NOT an Amazon-style formal "Buy Box".
STRICTLY FORBIDDEN (these capabilities DO NOT EXIST — never mention or imply them): bulk CSV import / bulk-import / importing or re-importing floors from a file; a tagging or labels system or rule-by-tag; a rules / segmentation engine; cohorts or "listing groups"; stored competitor price-history or trend charts inside Undercut; automatic age/time tracking of listings or time-based auto-escalation; inventory / sell-through / demand / sales-velocity awareness as AI inputs; multi-marketplace repricing (Amazon/Walmart/etc.); inventory or order management; named dashboard UI widgets you cannot verify. If a workflow would need any of these, describe it as something the SELLER does manually per listing — never as an Undercut feature.`

// High-precision patterns. Each: { id, re, why }. `re` must use the global flag.
const PATTERNS = [
  // AI price optimizer is a Pro AND Scale feature (matches the live pricing page).
  // Flag only the inaccurate cases: AI attributed to Free/Starter, or stated as Pro-EXCLUSIVE.
  { id: 'ai-on-wrong-tier', why: 'AI price optimizer is Pro AND Scale only — not Free/Starter, and not Pro-exclusive',
    re: /\b(free|starter)\b[^.]{0,60}(ai aggressiv|ai price optimi|ai tuning|ai-powered)|(ai aggressiv|ai price optimi|ai tuning|ai-powered)[^.]{0,60}\b(free|starter)\b|(ai (aggressiv\w*|tuning|price optimi\w*)[^.]{0,40}\b(only on pro|pro only|pro plan only|exclusive to pro)\b)/gi },
  { id: 'bulk-import', why: 'no bulk/CSV import of floors exists', re: /bulk[- ]?import|\bcsv\b|re-import/gi },
  { id: 'tagging-feature', why: 'no tagging / rule-by-tag system exists',
    re: /\b(set rules by tag|rules by tag|by tag\b|tag it by|tag listings|tag parts|tag inventory|tag condition|tag your inventory|tagging your inventory)\b/gi },
  { id: 'rules-engine', why: 'no rules/segmentation engine exists', re: /rules do the rest|rules engine|segmentation engine/gi },
  { id: 'listing-groups', why: 'no listing-group / cohort segmentation exists', re: /per listing group|listing group|by listing group/gi },
  { id: 'invented-ai-inputs', why: 'AI tuning does not read demand/velocity/sell-through/pattern signals',
    re: /(reads? competitor pricing patterns|pricing patterns)|demand signals|sales velocity|(aggressiv[^.]{0,60}(sell-through|sales velocity|demand|inventory level))/gi },
  { id: 'default-floor-feature', why: 'no account/catalog/site-wide default floor or per-item floor override exists — floors are per-listing (the only account-level default is the undercut amount)',
    re: /default floor|per-item (floor )?override|per-listing override|two-layer system/gi },
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
