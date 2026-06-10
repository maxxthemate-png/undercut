import { notFound } from 'next/navigation'
import PageView from '../../_components/PageView'
import { pagesIn, bySlug } from '../../_content/registry'
import { BASE_URL } from '../../_content/shared'

export const dynamicParams = false

export function generateStaticParams() {
  return pagesIn("repricers").map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = bySlug('repricers', params.slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/repricers/${page.slug}` },
    openGraph: { title: page.title, description: page.metaDescription, url: `${BASE_URL}/repricers/${page.slug}` },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const page = bySlug('repricers', params.slug)
  if (!page) notFound()
  return <PageView page={page} />
}
