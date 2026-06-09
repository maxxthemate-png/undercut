import type { FaqItem } from '../_content/types'
import JsonLd from './JsonLd'

export default function Faq({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
      <div className="space-y-6">
        {items.map((it, i) => (
          <div key={i}>
            <p className="font-semibold">{it.q}</p>
            <p className="text-sm text-gray-600 mt-1">{it.a}</p>
          </div>
        ))}
      </div>
      <JsonLd data={ld} />
    </section>
  )
}
