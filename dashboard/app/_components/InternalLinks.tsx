import Link from 'next/link'
import type { InternalLink } from '../_content/types'

export default function InternalLinks({ links }: { links: InternalLink[] }) {
  if (!links?.length) return null
  return (
    <section className="max-w-2xl mx-auto px-6 pb-10">
      <p className="text-sm text-muted">
        Related:{' '}
        {links.map((l, i) => (
          <span key={i}>
            {i > 0 && ' · '}
            <Link href={l.href} className="text-cut hover:opacity-90 transition">
              {l.label}
            </Link>
          </span>
        ))}
      </p>
    </section>
  )
}
