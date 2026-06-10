// Content schema for the programmatic-SEO engine.
// Every generated marketing page is a PageContent object rendered through the
// shared template (app/{guides,alternatives,glossary}/[slug]/page.tsx) + the
// presentational components in app/_components/.

export type Collection = 'guides' | 'alternatives' | 'glossary' | 'repricers'
export type Template = 'guide' | 'comparison' | 'glossary' | 'repricer'

export interface FaqItem {
  q: string
  a: string
}

export interface ContentSection {
  h2: string
  body?: string // one or more paragraphs (split on blank lines by <Prose/>)
  bullets?: string[]
}

export interface ComparisonRow {
  label: string
  undercut: string
  competitor: string
}

export interface InternalLink {
  href: string
  label: string
}

export interface PageContent {
  slug: string // kebab-case url segment, unique within its collection
  collection: Collection
  template: Template
  title: string // SEO <title> (~60 chars, ends with "— Undercut")
  metaDescription: string // 140–160 chars, unique
  h1: string // on-page headline, distinct from title
  eyebrow: string // small blue label above the h1
  intro: string // 60–120 words, unique angle
  sections: ContentSection[] // >= 3 for guides
  comparison?: {
    competitor: string
    rows: ComparisonRow[]
    disclaimer?: string
  }
  faq: FaqItem[] // >= 3, page-specific
  cta?: { heading: string; sub: string }
  internalLinks: InternalLink[] // 3–6 curated related links
  lastUpdated: string // ISO date YYYY-MM-DD
  leadForm?: boolean // render the email-capture form
  draft?: boolean // excluded from routing + sitemap when true
}
