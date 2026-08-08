import { notFound } from 'next/navigation'
import PageView from '../../_components/PageView'
import { pagesIn, bySlug } from '../../_content/registry'
import { pageMeta } from '../../_content/shared'

export const dynamicParams = false

export function generateStaticParams() {
  return pagesIn('guides').map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = bySlug('guides', params.slug)
  if (!page) return {}
  return pageMeta(page.title, page.metaDescription, `/guides/${page.slug}`)
}

export default function Page({ params }: { params: { slug: string } }) {
  const page = bySlug('guides', params.slug)
  if (!page) notFound()
  return <PageView page={page} />
}
