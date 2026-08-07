'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PLANS } from '../_content/shared'

// Free and Starter were previously listed with the IDENTICAL three bullets, so
// $29/mo visibly bought nothing but 75 more listings. These reflect what the code
// actually enforces: listing capacity, scheduled reprice interval (billing.py
// PLAN_REPRICE_INTERVAL_MIN) and the AI optimizer (billing.AI_PLANS = pro/scale).
const FEATURES: Record<string, string[]> = {
  free: ['25 listings', 'Rule-based undercut', 'Hourly repricing', 'Hard price floor'],
  starter: ['100 listings', 'Rule-based undercut', 'Hourly repricing', 'Hard price floor', 'Email support'],
  pro: ['1,000 listings', 'AI price optimizer', '15-min repricing', 'Hard price floor', 'Email support'],
  scale: ['10,000 listings', 'AI price optimizer', 'Every-cycle repricing', 'Hard price floor', 'Priority support'],
}

export default function PricingTable() {
  const [annual, setAnnual] = useState(false)
  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setAnnual(false)}
          className={`px-4 py-2 rounded text-sm font-medium border transition ${!annual ? 'bg-ink text-white border-ink' : 'border-line text-muted hover:bg-wash'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setAnnual(true)}
          className={`px-4 py-2 rounded text-sm font-medium border transition ${annual ? 'bg-ink text-white border-ink' : 'border-line text-muted hover:bg-wash'}`}
        >
          Annual <span className={annual ? 'text-floor-tint' : 'text-floor'}>· 2 months free</span>
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-5">
        {PLANS.map((p) => {
          const highlight = p.key === 'pro'
          return (
            <div key={p.key} className={`rounded-lg border p-6 flex flex-col bg-surface ${highlight ? 'border-cut ring-1 ring-cut' : 'border-line'}`}>
              {highlight && <span className="text-xs font-semibold text-cut mb-2">MOST POPULAR</span>}
              <p className="font-semibold text-ink">{p.name}</p>
              {annual && p.annual > 0 ? (
                <>
                  <p className="text-3xl font-extrabold mt-1 text-ink"><span className="tabular">${p.annual.toLocaleString()}</span><span className="text-sm font-normal text-muted">/yr</span></p>
                  <p className="text-xs text-floor mt-1 font-medium">= <span className="tabular">${Math.round(p.annual / 12)}</span>/mo · save <span className="tabular">${p.save}</span></p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-extrabold mt-1 text-ink"><span className="tabular">${p.monthly}</span><span className="text-sm font-normal text-muted">/mo</span></p>
                  {p.monthly > 0 && <p className="text-xs text-muted mt-1">or <span className="tabular">${p.annual.toLocaleString()}</span>/yr (2 months free)</p>}
                </>
              )}
              <p className="text-sm text-muted mt-1">{p.listings}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted flex-1">
                {(FEATURES[p.key] || []).map((f) => <li key={f}>• {f}</li>)}
              </ul>
              <Link
                href="/signup"
                className={`mt-6 inline-flex items-center justify-center rounded text-sm font-medium px-4 py-2.5 transition ${highlight ? 'bg-cut-strong text-white hover:opacity-90' : 'border border-line text-ink hover:border-muted'}`}
              >
                Start free
              </Link>
            </div>
          )
        })}
      </div>

      {/* One-time option. eBay selling is bursty and seasonal (Q4, back-to-school,
          a liquidation run) — a seller with a six-week need will not take a
          12-month subscription, and a subscription-only page loses them silently. */}
      <div className="mt-8 rounded-lg border border-line bg-wash p-6 max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <p className="font-semibold text-ink">Season Pass — one-time, no subscription</p>
            <p className="text-sm text-muted mt-1">
              Selling hard for one season? Get <b>90 days of Starter</b> (100 listings, hard floor on
              every one) for a single payment. Nothing recurring, nothing to cancel.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-ink"><span className="tabular">$145</span></p>
            <p className="text-xs text-muted">one time · 90 days</p>
            <Link href="/signup"
              className="mt-3 inline-flex items-center justify-center rounded border border-line text-ink text-sm font-medium px-4 py-2.5 transition hover:border-muted">
              Start free first
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
