'use client'
import { useState } from 'react'
import Link from 'next/link'

const num = (v: string) => (v.trim() === '' ? NaN : Number(v))

export default function Calculator() {
  const [sold, setSold] = useState('12')
  const [active, setActive] = useState('60')
  const [days, setDays] = useState('30')

  const s = num(sold), a = num(active), d = num(days)
  const str = isFinite(s) && isFinite(a) && s + a > 0 ? (s / (s + a)) * 100 : NaN
  const monthly = isFinite(str) && isFinite(d) && d > 0 ? str * (30 / d) : NaN

  const verdict = !isFinite(monthly)
    ? null
    : monthly >= 80
      ? ['Excellent', 'text-floor', 'Demand outpaces your supply — you may even be priced too low. Consider raising prices or restocking faster.']
      : monthly >= 40
        ? ['Healthy', 'text-floor', 'Solid velocity for most categories. Keep prices competitive to stay here as competitors undercut you.']
        : monthly >= 15
          ? ['Sluggish', 'text-guard', 'Inventory is sitting. The usual cause: you’ve been undercut and haven’t responded. Check the lowest competitor on your slow listings.']
          : ['Stalled', 'text-cut', 'Most of this inventory isn’t moving. Reprice toward the lowest competitor (never below your floor) or re-evaluate the listings.']

  const wrap = 'mt-1 flex items-center border border-line rounded px-3 bg-surface focus-within:border-cut transition'
  const inp = 'w-full py-2 px-2 text-sm bg-transparent text-ink'

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
      <div className="space-y-4 bg-surface border border-line rounded-lg p-6">
        <label className="block"><span className="text-sm text-muted">Items sold in the period</span>
          <div className={wrap}><input type="number" value={sold} onChange={e => setSold(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">Active listings (unsold) at period end</span>
          <div className={wrap}><input type="number" value={active} onChange={e => setActive(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">Period length (days)</span>
          <div className={wrap}><input type="number" value={days} onChange={e => setDays(e.target.value)} className={inp} /></div></label>
      </div>
      <div className="space-y-4">
        <div className="bg-ink text-white rounded-lg p-6">
          <p className="text-sm text-white/75">Your sell-through rate</p>
          <p className="text-4xl font-extrabold mt-1 tabular">{isFinite(str) ? `${str.toFixed(1)}%` : '—'}</p>
          <p className="text-sm text-white/75 mt-2">{isFinite(monthly) ? `≈ ${monthly.toFixed(1)}% normalized to 30 days` : 'sold ÷ (sold + active)'}</p>
        </div>
        {verdict && (
          <div className="bg-surface border border-line rounded-lg p-6">
            <p className={`text-xl font-extrabold ${verdict[1]}`}>{verdict[0]}</p>
            <p className="text-sm text-muted mt-2">{verdict[2]}</p>
            <p className="text-sm text-muted mt-3">
              Low STR is usually a <b>price problem</b>: check the <Link href="/ebay-price-checker" className="text-cut">lowest live competitor</Link> and your <Link href="/ebay-fee-calculator" className="text-cut">break-even floor</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
