import Link from 'next/link'
import type { InternalLink } from '../_content/types'

export default function InternalLinks({ links }: { links: InternalLink[] }) {
  if (!links?.length) return null
  return (
    <section className="max-w-2xl mx-auto px-6 pb-10">
      <p className="text-sm text-gray-500">
        Related:{' '}
        {links.map((l, i) => (
          <span key={i}>
            {i > 0 && ' · '}
            <Link href={l.href} className="text-blue-600 hover:text-blue-700">
              {l.label}
            </Link>
          </span>
        ))}
      </p>
    </section>
  )
}
