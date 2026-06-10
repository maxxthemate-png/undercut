#!/usr/bin/env node
// Content linter for the programmatic-SEO registry — anti-thin-content gate.
// Run from dashboard/: node ../scripts/lint-content.mjs
// Checks across ALL collections: unique slugs/titles/metas, meta length 130–165,
// >=3 sections, >=3 FAQs, >=3 internalLinks pointing at known routes.
import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const here = dirname(fileURLToPath(import.meta.url))
const contentDir = join(here, '..', 'dashboard', 'app', '_content')

// Extract PageContent objects from the TS files by evaluating the array literal.
function loadCollection(name) {
  const src = readFileSync(join(contentDir, name, 'index.ts'), 'utf8')
  const start = src.indexOf('[')
  const end = src.lastIndexOf(']')
  if (start === -1 || end === -1) return []
  // The arrays are JSON-ish (double-quoted) — eval in a sandbox-ish way.
  // eslint-disable-next-line no-new-func
  return new Function(`return ${src.slice(start, end + 1)}`)()
}

const KNOWN_ROUTES = new Set([
  '/', '/pricing', '/compare', '/signup', '/about', '/contact', '/changelog',
  '/streetpricer-alternative', '/repricerexpress-alternative',
  '/free-ebay-repricer', '/ebay-repricing-software',
  '/ebay-fee-calculator', '/ebay-price-checker', '/ebay-profit-calculator',
  '/ebay-sell-through-rate-calculator', '/ebay-best-offer-calculator',
  '/guides', '/alternatives', '/glossary', '/repricers',
  '/guides/ebay-price-floor',   // bespoke page, not in the registry
])

const collections = ['guides', 'alternatives', 'glossary', 'repricers']
const all = []
for (const c of collections) {
  for (const p of loadCollection(c)) all.push({ ...p, _col: c })
}
for (const p of all) KNOWN_ROUTES.add(`/${p.collection || p._col}/${p.slug}`)

const errors = []
const seen = { slug: new Map(), title: new Map(), meta: new Map() }
for (const p of all) {
  const id = `${p._col}/${p.slug}`
  const dup = (map, key, kind) => {
    if (!key) return
    if (map.has(key)) errors.push(`${id}: duplicate ${kind} (also in ${map.get(key)})`)
    else map.set(key, id)
  }
  dup(seen.slug, `${p._col}:${p.slug}`, 'slug')
  dup(seen.title, p.title, 'title')
  dup(seen.meta, p.metaDescription, 'metaDescription')
  if (!p.metaDescription || p.metaDescription.length < 130 || p.metaDescription.length > 165)
    errors.push(`${id}: metaDescription length ${p.metaDescription?.length || 0} (want 130-165)`)
  if (!p.sections || p.sections.length < 3) errors.push(`${id}: only ${p.sections?.length || 0} sections (want >=3)`)
  if (!p.faq || p.faq.length < 3) errors.push(`${id}: only ${p.faq?.length || 0} FAQs (want >=3)`)
  if (!p.internalLinks || p.internalLinks.length < 3) errors.push(`${id}: only ${p.internalLinks?.length || 0} internalLinks (want >=3)`)
  for (const l of p.internalLinks || []) {
    if (!KNOWN_ROUTES.has(l.href)) errors.push(`${id}: internal link to unknown route ${l.href}`)
  }
  if (p.h1 === p.title) errors.push(`${id}: h1 identical to title`)
  if (!p.intro || p.intro.split(/\s+/).length < 50) errors.push(`${id}: intro too short`)
}

console.log(`Linted ${all.length} pages across ${collections.length} collections.`)
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`)
  for (const e of errors) console.error('  ✗ ' + e)
  process.exit(1)
}
console.log('All clean ✓')
