import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '../../_components/Nav'
import Footer from '../../_components/Footer'
import LeadForm from '../../lead-form'
import { TRACKED_PRODUCTS } from '../../_content/tracked-products'
import { pageMeta } from '../../_content/shared'

export const dynamicParams = false
export const revalidate = 21600 // refresh live data every 6h

const API = process.env.API_URL || 'https://undercut-api.onrender.com'

export function generateStaticParams() {
  return TRACKED_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = TRACKED_PRODUCTS.find((x) => x.slug === params.slug)
  if (!p) return {}
  return pageMeta(
    `${p.name} — Lowest Price on eBay Right Now (Live Tracker)`,
    `Live lowest eBay price for ${p.name}, updated daily with price history and competition count. Free tracker — see what it actually sells for before you buy or list.`,
    `/ebay-price-tracker/${p.slug}`
  )
}

async function getLive(query: string) {
  try {
    const r = await fetch(`${API}/api/tools/price-check?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) return null
    return await r.json()
  } catch {
    return null
  }
}

async function getHistory(slug: string) {
  try {
    const r = await fetch(`${API}/api/tools/price-history?slug=${slug}`, {
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(5000),
    })
    if (!r.ok) return []
    return (await r.json()).history || []
  } catch {
    return []
  }
}

function Sparkline({ history }: { history: { date: string; lowest: number | null }[] }) {
  const pts = history.filter((h) => h.lowest != null) as { date: string; lowest: number }[]
  if (pts.length < 2) return null
  const w = 560, h = 120, pad = 8
  const min = Math.min(...pts.map((p) => p.lowest))
  const max = Math.max(...pts.map((p) => p.lowest))
  const span = max - min || 1
  const x = (i: number) => pad + (i / (pts.length - 1)) * (w - pad * 2)
  const y = (v: number) => h - pad - ((v - min) / span) * (h - pad * 2)
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.lowest).toFixed(1)}`).join(' ')
  return (
    <div className="bg-surface border border-line rounded-lg p-5">
      <p className="text-sm font-semibold mb-1">Lowest-price history ({pts.length} days)</p>
      <p className="text-xs text-muted mb-3 tabular">range ${min.toFixed(2)} – ${max.toFixed(2)}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto text-cut">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = TRACKED_PRODUCTS.find((x) => x.slug === params.slug)
  if (!product) notFound()
  const [live, history] = await Promise.all([getLive(product.query), getHistory(product.slug)])
  const siblings = TRACKED_PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 6)

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-3xl mx-auto px-6 pt-14 pb-8 text-center">
        <p className="text-sm font-semibold text-cut uppercase tracking-wide">Live eBay price tracker · updated daily</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">{product.name}: lowest price on eBay</h1>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-10 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-ink text-white rounded-lg p-6">
            <p className="text-sm text-white/75">Lowest live price right now</p>
            <p className="text-4xl font-extrabold mt-1 tabular">
              {live?.lowest != null ? `$${Number(live.lowest).toFixed(2)}` : 'checking…'}
            </p>
            <p className="text-sm text-white/75 mt-2">
              {live?.count ? `across ${live.count} live listings` : 'live data refreshes every few hours'}
            </p>
          </div>
          <div className="bg-surface border border-line rounded-lg p-6">
            <p className="text-sm text-muted">Selling one? To win the sale you&apos;d price at</p>
            <p className="text-3xl font-extrabold mt-1 text-floor tabular">
              {live?.lowest != null ? `$${Math.max(Number(live.lowest) - 0.01, 0).toFixed(2)}` : '—'}
            </p>
            <p className="text-sm text-muted mt-2">
              a penny under — <i>if</i> that clears your <Link href="/ebay-fee-calculator" className="text-cut">break-even floor</Link>.
            </p>
          </div>
        </div>
        <Sparkline history={history} />
        {live?.items?.length > 0 && (
          <div className="bg-surface border border-line rounded-lg p-5">
            <p className="text-sm font-semibold mb-2">Cheapest live listings</p>
            <ul className="space-y-1.5 text-sm">
              {live.items.slice(0, 5).map((it: any, i: number) => (
                <li key={i} className="flex justify-between gap-3">
                  <span className="truncate text-muted">
                    {it.url ? <a href={it.url} target="_blank" rel="nofollow noopener noreferrer" className="hover:text-cut transition">{it.title}</a> : it.title}
                  </span>
                  <b className="whitespace-nowrap tabular">${Number(it.price).toFixed(2)}</b>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-line">
        <div className="space-y-4 text-muted text-[15px] leading-relaxed">
          <p>
            This page tracks the lowest live eBay price for <b>{product.name}</b> (search: &ldquo;{product.query}&rdquo;) using
            eBay&apos;s public Browse API, with a snapshot saved every day. Sellers use this number two ways:
            buyers check it before paying too much, and resellers check it before listing — because on eBay,
            the lowest credible price wins most of the sales.
          </p>
          <p>
            If you <b>sell</b> {product.category}, this exact lookup is what <Link href="/" className="text-cut font-medium">Undercut</Link> runs
            on every one of your listings around the clock: it reprices you a penny under the lowest competitor and
            never below the <Link href="/guides/ebay-price-floor" className="text-cut font-medium">floor you set</Link>. Check any other product
            with the <Link href="/ebay-price-checker" className="text-cut font-medium">price checker</Link>.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl font-bold">Sell {product.category} on eBay?</h2>
        <p className="text-muted mt-2 mb-5">Undercut watches this number for every listing you have and reprices you to win — floor-protected. Free for 25 listings, no card.</p>
        <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — no card</Link>
        <p className="text-sm text-muted mt-8 mb-3">Or get early access + founding pricing by email:</p>
        <LeadForm source={`tracker-${product.slug}`} />
      </section>

      {siblings.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <h2 className="text-lg font-bold mb-3 capitalize">More {product.category}</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link href={`/ebay-price-tracker/${s.slug}`} className="text-cut hover:opacity-90 transition">{s.name} price tracker</Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm"><Link href="/ebay-price-tracker" className="text-muted hover:text-ink transition">← All tracked products</Link></p>
        </section>
      )}
      <Footer />
    </div>
  )
}
