import type { PageContent, Collection } from './types'
import { guides } from './guides'
import { alternatives } from './alternatives'
import { glossary } from './glossary'
import { repricers } from './repricers'

const COLLECTIONS: Record<Collection, PageContent[]> = { guides, alternatives, glossary, repricers }

export function pagesIn(collection: Collection): PageContent[] {
  return (COLLECTIONS[collection] || []).filter((p) => !p.draft)
}

export function allPages(): PageContent[] {
  return Object.values(COLLECTIONS).flat().filter((p) => !p.draft)
}

export function bySlug(collection: Collection, slug: string): PageContent | undefined {
  return pagesIn(collection).find((p) => p.slug === slug)
}

export function pathFor(p: PageContent): string {
  return `/${p.collection}/${p.slug}`
}
