import { allPages } from '../_content/registry'
import { changelog } from '../_content/changelog'
import { BASE_URL, BRAND } from '../_content/shared'

export const dynamic = 'force-static'

// RSS feed: changelog entries + every registry page. Aggregators and readers
// discover new content automatically — zero-touch distribution.
export function GET() {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const items = [
    ...changelog.map((e) => ({
      title: e.title,
      link: `${BASE_URL}/changelog`,
      desc: e.blurb,
      date: e.date,
    })),
    ...allPages().map((p) => ({
      title: p.h1,
      link: `${BASE_URL}/${p.collection}/${p.slug}`,
      desc: p.metaDescription,
      date: p.lastUpdated,
    })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 60)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${esc(BRAND)} — eBay repricing guides &amp; updates</title>
<link>${BASE_URL}</link>
<description>Floor-first eBay repricing: guides, tools, and product updates.</description>
${items
  .map(
    (i) => `<item>
<title>${esc(i.title)}</title>
<link>${i.link}</link>
<description>${esc(i.desc)}</description>
<pubDate>${new Date(i.date + 'T12:00:00Z').toUTCString()}</pubDate>
<guid>${i.link}#${i.date}</guid>
</item>`
  )
  .join('\n')}
</channel>
</rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
