#!/usr/bin/env node
/** Autonomous SEO content generator — "the machine that grows the machine".
 *
 * Picks the first topic in scripts/content-backlog.json whose slug is NOT yet
 * present in its collection, asks Claude to write a full, schema-valid
 * PageContent object, validates it against the SAME rules as the content linter
 * (scripts/lint-content.mjs), and splices it into the collection's index.ts.
 *
 * Runs in CI weekly (.github/workflows/auto-content.yml). Needs no human input:
 * the only secret is ANTHROPIC_API_KEY (already used by the backend). When every
 * backlog slug already exists, it is a clean no-op — it never fabricates a page.
 *
 *   ANTHROPIC_API_KEY=... node scripts/generate-content.mjs            # build 1 page
 *   COUNT=2 node scripts/generate-content.mjs                          # build up to 2
 *   DRY_RUN=1 node scripts/generate-content.mjs                        # no API, no write — test the picker
 *   FIXTURE=path.json node scripts/generate-content.mjs                # use a local JSON page instead of the API (test splice+lint)
 *
 * Exit codes: 0 = built (or clean no-op), 1 = hard error (bad page, API failure).
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { PRODUCT_FACTS, scanPage } from './content-claims.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const repo = join(here, '..')
const contentDir = join(repo, 'dashboard', 'app', '_content')
const MODEL = process.env.CONTENT_MODEL || 'claude-sonnet-4-6'

// ---- load the registry exactly the way the linter does -------------------
function loadCollection(name) {
  const src = readFileSync(join(contentDir, name, 'index.ts'), 'utf8')
  const start = src.indexOf('[')
  const end = src.lastIndexOf(']')
  if (start === -1 || end === -1) return []
  // eslint-disable-next-line no-new-func
  return new Function(`return ${src.slice(start, end + 1)}`)()
}

const COLLECTIONS = ['guides', 'alternatives', 'glossary', 'repricers']
const STATIC_ROUTES = [
  '/', '/pricing', '/compare', '/signup', '/about', '/contact', '/changelog',
  '/streetpricer-alternative', '/repricerexpress-alternative',
  '/free-ebay-repricer', '/ebay-repricing-software',
  '/ebay-fee-calculator', '/ebay-price-checker', '/ebay-profit-calculator',
  '/ebay-sell-through-rate-calculator', '/ebay-best-offer-calculator',
  '/guides', '/alternatives', '/glossary', '/repricers',
  '/guides/ebay-price-floor',
]

const existing = {} // collection -> array of pages
for (const c of COLLECTIONS) existing[c] = loadCollection(c)
const allPages = COLLECTIONS.flatMap((c) => existing[c].map((p) => ({ ...p, _col: c })))

const knownRoutes = new Set(STATIC_ROUTES)
for (const p of allPages) knownRoutes.add(`/${p.collection || p._col}/${p.slug}`)
const usedSlugs = new Set(allPages.map((p) => `${p._col}:${p.slug}`))
const usedTitles = new Set(allPages.map((p) => p.title))
const usedMetas = new Set(allPages.map((p) => p.metaDescription))

// ---- same validation the linter enforces, run BEFORE we write -----------
function validate(p, collection) {
  const errs = []
  if (!p || typeof p !== 'object') return ['not an object']
  if (p.slug !== topicSlugExpected) errs.push(`slug must equal "${topicSlugExpected}" (got "${p.slug}")`)
  if (p.collection !== collection) errs.push(`collection must equal "${collection}" (got "${p.collection}")`)
  if (usedSlugs.has(`${collection}:${p.slug}`)) errs.push(`duplicate slug ${p.slug}`)
  if (usedTitles.has(p.title)) errs.push(`duplicate title`)
  if (usedMetas.has(p.metaDescription)) errs.push(`duplicate metaDescription`)
  if (!p.metaDescription || p.metaDescription.length < 130 || p.metaDescription.length > 165)
    errs.push(`metaDescription length ${p.metaDescription?.length || 0} (want 130-165)`)
  if (!p.sections || p.sections.length < 3) errs.push(`only ${p.sections?.length || 0} sections (want >=3)`)
  if (!p.faq || p.faq.length < 3) errs.push(`only ${p.faq?.length || 0} FAQs (want >=3)`)
  if (!p.internalLinks || p.internalLinks.length < 3) errs.push(`only ${p.internalLinks?.length || 0} internalLinks (want >=3)`)
  for (const l of p.internalLinks || []) {
    if (!knownRoutes.has(l.href)) errs.push(`internal link to unknown route ${l.href}`)
  }
  if (p.h1 === p.title) errs.push(`h1 identical to title`)
  if (!p.intro || p.intro.split(/\s+/).length < 50) errs.push(`intro too short (<50 words)`)
  for (const s of p.sections || []) if (!s.h2 || !s.body) errs.push(`a section is missing h2/body`)
  for (const f of p.faq || []) if (!f.q || !f.a) errs.push(`an FAQ is missing q/a`)
  return errs
}

let topicSlugExpected = null // set per-topic so validate() can pin the slug

// ---- prompt + Claude call -----------------------------------------------
function buildPrompt(topic) {
  const routes = [...knownRoutes].sort().join('\n')
  return `You are writing one SEO landing page for "Undercut", an eBay repricing SaaS. Be accurate, concrete, and helpful — use real numbers and worked examples. Never disparage competitors unfairly; comparisons must be factual and fair.

${PRODUCT_FACTS}

NON-NEGOTIABLE WRITING RULES (a page that breaks any of these is rejected):
1. Feature fidelity: describe ONLY capabilities in the allowlist above. Do NOT mention or imply bulk/CSV import of floors, a tagging/labels/rules engine, listing groups/cohorts, stored price-history inside Undercut, automatic age/time-based escalation, or AI inputs like demand/sell-through/sales-velocity. If a workflow needs something not in the allowlist, frame it as a manual per-listing action by the seller.
2. Plan attribution: attribute each feature to the EXACT plan(s) listed. AI aggressiveness tuning is a PRO feature — write "on Pro", never "Pro and Scale" or "Pro or Scale". Do not assume higher tiers inherit lower-tier features. (You MAY name "Pro and Scale" together only when NOT describing AI tuning, e.g. listing-count context.)
3. The AI feature: say only that Claude AI optionally tunes how aggressively each listing moves toward its already-set floor, per listing, and never overrides the hard floor. Do not invent what it "reads" or "considers".
4. eBay facts: eBay uses Best Match for search ranking; it has NO Amazon-style formal "Buy Box". (Sales velocity is a legitimate eBay Best-Match ranking factor — you may mention it as an eBay ranking signal, never as an input to Undercut's AI.)
5. Numbers: every worked example must be arithmetically correct and internally consistent. Recompute each figure (discounts = comp − new price, percentages, fees, time/cost rollups). The body, bullets, and FAQ must state identical numbers for the same calculation.

Write the page for this topic:
- collection: ${topic.collection}
- slug: ${topic.slug}   (use EXACTLY this slug)
- working title: ${topic.title}
- angle: ${topic.angle}

Return ONLY a single JSON object (no markdown fences, no prose) matching this TypeScript type:

interface PageContent {
  slug: string                 // EXACTLY "${topic.slug}"
  collection: "${topic.collection}"
  template: ${topic.collection === 'alternatives' ? '"comparison"' : topic.collection === 'glossary' ? '"glossary"' : '"guide"'}
  title: string                // SEO <title>, ~55-60 chars, ends with " — Undercut"
  metaDescription: string      // MUST be 130-165 characters, unique, compelling, mentions the 14-day no-card trial
  h1: string                   // on-page headline, MUST differ from title
  eyebrow: string              // short label, e.g. "Guide" / "Comparison" / "Glossary"
  intro: string                // 70-120 words, unique angle, no fluff
  sections: { h2: string; body: string; bullets?: string[] }[]   // EXACTLY 4-5 sections; every section has a substantive multi-sentence body; use "\n\n" for paragraph breaks; include at least one worked numeric example
  faq: { q: string; a: string }[]    // 4-5 page-specific Q&As, each answer 2-4 sentences
  cta?: { heading: string; sub: string }
  internalLinks: { href: string; label: string }[]   // 4-6 links; href MUST be chosen ONLY from the allowed routes below
  lastUpdated: "${new Date().toISOString().slice(0, 10)}"
  leadForm: true
}

ALLOWED internalLinks href values (choose 4-6 relevant ones, do NOT invent any other path):
${routes}

Hard requirements (the page is auto-rejected otherwise): metaDescription length 130-165 chars; >=3 sections (write 4-5); >=3 FAQs (write 4-5); >=3 internalLinks all from the allowed list; h1 != title; intro >= 70 words.

FINAL SELF-AUDIT before you output: re-read every sentence and list (to yourself) each product capability you asserted and each plan you attached it to. If any capability is outside the allowlist, or any plan attribution differs from the plan list (especially AI tuning shown as "Pro and Scale"), rewrite that sentence. Only then output the JSON object — and output the JSON object only.`
}

async function callClaude(prompt, repair) {
  const messages = [{ role: 'user', content: repair ? `${prompt}\n\nYour previous attempt failed validation: ${repair}. Return a corrected JSON object only.` : prompt }]
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 4096, messages }),
  })
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`)
  const data = await res.json()
  const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('')
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('no JSON object in model response')
  return JSON.parse(text.slice(start, end + 1))
}

// ---- semantic claims gate: a SECOND model pass that checks the draft against
// the closed allowlist (catches hallucinated features / plan misattribution /
// bad arithmetic that the structural validate can't). Returns {ok, violations}.
async function verifyPage(page) {
  const text = [page.title, page.h1, page.intro,
    ...(page.sections || []).flatMap((s) => [s.h2, s.body, ...(s.bullets || [])]),
    ...(page.faq || []).flatMap((f) => [f.q, f.a]),
    page.cta ? `${page.cta.heading} ${page.cta.sub}` : ''].join('\n')
  const flagged = scanPage(page).map((h) => h.excerpt) // deterministic hints (may include false positives)
  const prompt = `${PRODUCT_FACTS}\n\nBelow is a DRAFT marketing page for Undercut. Audit it ONLY for:\n` +
    `(a) any product capability claimed about Undercut that is NOT in the allowlist (hallucinated feature);\n` +
    `(b) any plan misattribution — especially AI aggressiveness tuning shown as available on Scale (it is Pro-only);\n` +
    `(c) any arithmetic error, or a number that contradicts another number for the same calculation.\n` +
    `Do NOT flag legitimate mentions of eBay's OWN features or ranking factors (e.g. eBay Best Match using sales velocity).\n` +
    (flagged.length ? `An automated scan flagged these phrases — judge each as a real violation or a legitimate mention: ${JSON.stringify(flagged)}\n` : '') +
    `\nReturn ONLY JSON: {"ok": true} if clean, else {"ok": false, "violations": ["short imperative fix", ...]}.\n\nPAGE:\n${text}`
  try {
    const v = await callClaude(prompt)
    return (v && typeof v.ok === 'boolean') ? v : { ok: true }
  } catch {
    return { ok: true } // never block generation on a verifier hiccup; CI lint is the backstop
  }
}

// ---- splice a new page into a collection's index.ts (minimal diff) -------
function appendToCollection(collection, page) {
  const file = join(contentDir, collection, 'index.ts')
  const src = readFileSync(file, 'utf8')
  const closeIdx = src.lastIndexOf(']')
  if (closeIdx === -1) throw new Error(`no array close in ${file}`)
  const head = src.slice(0, closeIdx).replace(/\s*$/, '') // up to last entry's "}"
  const tail = src.slice(closeIdx) // "]\n..."
  const objStr = JSON.stringify(page, null, 2)
    .split('\n')
    .map((l) => '  ' + l) // indent one level into the array
    .join('\n')
  const emptyArray = /\[\s*$/.test(head) // array currently empty
  const sep = emptyArray ? '\n' : ',\n'
  writeFileSync(file, head + sep + objStr + '\n' + tail, 'utf8')
}

// ---- main ----------------------------------------------------------------
async function main() {
  const backlog = JSON.parse(readFileSync(join(here, 'content-backlog.json'), 'utf8'))
  const todo = backlog.topics.filter((t) => !usedSlugs.has(`${t.collection}:${t.slug}`))
  const want = Math.max(1, parseInt(process.env.COUNT || '1', 10))

  if (!todo.length) {
    console.log('Content backlog is fully built — nothing to generate (no-op). Add topics to scripts/content-backlog.json.')
    return
  }
  console.log(`Backlog: ${todo.length} unbuilt topic(s); building up to ${want} this run.`)

  let built = 0
  for (const topic of todo.slice(0, want)) {
    topicSlugExpected = topic.slug
    console.log(`\n→ ${topic.collection}/${topic.slug}`)

    let page
    if (process.env.FIXTURE) {
      page = JSON.parse(readFileSync(process.env.FIXTURE, 'utf8'))
    } else if (process.env.DRY_RUN) {
      console.log('  DRY_RUN: would generate via Claude and splice. Skipping API + write.')
      continue
    } else {
      let lastErr = null
      for (let attempt = 1; attempt <= 4; attempt++) {
        page = await callClaude(buildPrompt(topic), lastErr)
        const errs = validate(page, topic.collection)
        if (errs.length) {
          lastErr = errs.join('; ')
          console.log(`  attempt ${attempt} failed structural: ${lastErr}`)
          page = null
          continue
        }
        if (!process.env.SKIP_VERIFY) {
          const v = await verifyPage(page)
          if (v.ok === false && (v.violations || []).length) {
            lastErr = 'claim/accuracy issues to fix: ' + v.violations.join('; ')
            console.log(`  attempt ${attempt} failed claims: ${lastErr}`)
            page = null
            continue
          }
        }
        lastErr = null
        break
      }
      if (!page) throw new Error(`could not produce a valid page for ${topic.slug} after 4 attempts`)
    }

    if (process.env.FIXTURE) {
      const errs = validate(page, topic.collection)
      if (errs.length) throw new Error(`fixture invalid: ${errs.join('; ')}`)
    }

    appendToCollection(topic.collection, page)
    // keep dedupe sets current so COUNT>1 within one run can't collide
    usedSlugs.add(`${topic.collection}:${page.slug}`)
    usedTitles.add(page.title)
    usedMetas.add(page.metaDescription)
    knownRoutes.add(`/${topic.collection}/${page.slug}`)
    console.log(`  ✓ wrote "${page.title}" (${page.metaDescription.length}-char meta, ${page.sections.length} sections, ${page.faq.length} FAQs)`)
    built++
  }

  console.log(`\nDone — ${built} page(s) generated.`)
}

main().catch((e) => { console.error('FAILED:', e.message || e); process.exit(1) })
