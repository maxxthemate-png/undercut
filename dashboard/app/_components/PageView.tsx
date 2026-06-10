import Link from 'next/link'
import type { PageContent } from '../_content/types'
import { pagesIn } from '../_content/registry'
import Nav from './Nav'
import Footer from './Footer'
import Hero from './Hero'
import CtaBanner from './CtaBanner'
import Prose from './Prose'
import ComparisonTable from './ComparisonTable'
import Faq from './Faq'
import InternalLinks from './InternalLinks'
import JsonLd from './JsonLd'
import LeadForm from '../lead-form'
import { DEFAULT_CTA, BASE_URL } from '../_content/shared'

export default function PageView({ page }: { page: PageContent }) {
  const cta = page.cta || DEFAULT_CTA
  const siblings = pagesIn(page.collection).filter((p) => p.slug !== page.slug).slice(0, 6)
  const url = `${BASE_URL}/${page.collection}/${page.slug}`
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: page.collection, item: `${BASE_URL}/${page.collection}` },
      { '@type': 'ListItem', position: 3, name: page.h1, item: url },
    ],
  }
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <Hero eyebrow={page.eyebrow} h1={page.h1} intro={page.intro} />
      {page.comparison && (
        <ComparisonTable
          competitor={page.comparison.competitor}
          rows={page.comparison.rows}
          disclaimer={page.comparison.disclaimer}
        />
      )}
      <Prose sections={page.sections} />
      <CtaBanner heading={cta.heading} sub={cta.sub} />
      {page.leadForm !== false && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-2xl mx-auto px-6 py-14 text-center">
            <h2 className="text-2xl font-bold">Not ready to connect your store yet?</h2>
            <p className="text-gray-600 mt-2 mb-6">Drop your email — we&apos;ll send early access and founding pricing.</p>
            <LeadForm source={page.slug} />
          </div>
        </section>
      )}
      <Faq items={page.faq} />
      <section className="max-w-3xl mx-auto px-6 pb-4">
        <h2 className="text-lg font-bold mb-3">Free tools</h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {[['Fee calculator', '/ebay-fee-calculator'], ['Price checker', '/ebay-price-checker'], ['Profit calculator', '/ebay-profit-calculator']].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="inline-block px-3 py-1.5 rounded-full border border-gray-200 text-blue-600 hover:bg-gray-50">{label}</Link>
            </li>
          ))}
        </ul>
      </section>
      <InternalLinks links={page.internalLinks} />
      {siblings.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <h2 className="text-lg font-bold mb-3">More {page.collection}</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.collection}/${s.slug}`} className="text-blue-600 hover:text-blue-700">{s.h1}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Footer />
      <JsonLd data={breadcrumb} />
    </div>
  )
}
