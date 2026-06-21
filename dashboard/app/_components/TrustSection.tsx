import { SUPPORT_EMAIL, FOUNDER, TRUST_BADGES } from '../_content/shared'

// Honest trust: a real founder note + factual badges. Live stats render ONLY
// above thresholds, so nothing inflated ever shows. Fetch must never block the
// page — Render cold starts can be slow.
const API = process.env.API_URL || 'https://undercut-api.onrender.com'

async function liveStats(): Promise<{ reprices: number; sellers: number; listings_managed: number } | null> {
  try {
    const r = await fetch(`${API}/api/admin/public-stats`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(2500),
    })
    if (!r.ok) return null
    return await r.json()
  } catch {
    return null
  }
}

export default async function TrustSection() {
  const stats = await liveStats()
  const statItems: [string, string][] = []
  if (stats) {
    if (stats.reprices >= 100) statItems.push([stats.reprices.toLocaleString(), 'price updates executed'])
    if (stats.listings_managed >= 50) statItems.push([stats.listings_managed.toLocaleString(), 'listings managed'])
    if (stats.sellers >= 5) statItems.push([stats.sellers.toLocaleString(), 'founding sellers'])
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-14">
      <div className="rounded-lg border border-line bg-wash p-6">
        <p className="text-[15px] leading-relaxed text-muted">
          &ldquo;I&apos;m building Undercut in the open, as a solo founder. Every seller who signs up
          right now is a <b>founding user</b>: you get my email, your feedback shapes the roadmap, and
          your founding pricing is locked in. No fake testimonials on this page — the product earns
          your trust or it doesn&apos;t.&rdquo;
        </p>
        <p className="mt-3 text-sm font-semibold text-ink">
          — {FOUNDER}, founder · <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cut font-medium">{SUPPORT_EMAIL}</a>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-muted">
        {TRUST_BADGES.map((t) => (
          <span key={t} className="px-3 py-1.5 rounded-full border border-line bg-surface">{t}</span>
        ))}
      </div>

      {statItems.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {statItems.map(([n, label]) => (
            <div key={label}>
              <p className="text-2xl font-extrabold">{n}</p>
              <p className="text-xs text-muted">{label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
