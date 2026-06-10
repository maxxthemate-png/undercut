import Link from 'next/link'
import Nav from './Nav'
import Footer from './Footer'
import CtaBanner from './CtaBanner'
import { pagesIn } from '../_content/registry'
import type { Collection } from '../_content/types'
import { DEFAULT_CTA } from '../_content/shared'

export default function CollectionIndex({
  collection,
  h1,
  intro,
}: {
  collection: Collection
  h1: string
  intro: string
}) {
  const pages = pagesIn(collection)
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{h1}</h1>
        <p className="mt-4 text-gray-600">{intro}</p>
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <ul className="space-y-3">
          {pages.map((p) => (
            <li key={p.slug} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50">
              <Link href={`/${collection}/${p.slug}`} className="block">
                <p className="font-semibold text-blue-600">{p.h1}</p>
                <p className="text-sm text-gray-500 mt-1">{p.metaDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBanner heading={DEFAULT_CTA.heading} sub={DEFAULT_CTA.sub} />
      <Footer />
    </div>
  )
}
