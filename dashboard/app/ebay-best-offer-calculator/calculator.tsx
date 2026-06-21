'use client'
import { useState } from 'react'
import Link from 'next/link'

const num = (v: string) => (v.trim() === '' ? NaN : Number(v))
const money = (v: number) => (isFinite(v) ? `$${v.toFixed(2)}` : '—')

export default function Calculator() {
  const [cost, setCost] = useState('12')
  const [ship, setShip] = useState('4')
  const [fee, setFee] = useState('13.6')
  const [margin, setMargin] = useState('15')
  const [list, setList] = useState('29.99')

  const c = num(cost), s = num(ship), f = num(fee) / 100, m = num(margin) / 100, lp = num(list)
  const fixed = 0.4
  // minimum acceptable offer: price where (price)(1-f) - fixed - c - s = m * price
  const minOffer = (c + s + fixed) / (1 - f - m)
  const breakEven = (c + s + fixed) / (1 - f)
  const autoDecline = isFinite(minOffer) ? minOffer * 0.93 : NaN // a hair under min — catches lowballs
  const discount = isFinite(lp) && isFinite(minOffer) && lp > 0 ? (1 - minOffer / lp) * 100 : NaN

  const wrap = 'mt-1 flex items-center border border-line rounded px-3 bg-surface focus-within:border-cut transition'
  const inp = 'w-full py-2 px-2 text-sm bg-transparent text-ink'

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
      <div className="space-y-4 bg-surface border border-line rounded-lg p-6">
        <label className="block"><span className="text-sm text-muted">Item cost</span>
          <div className={wrap}><span className="text-muted text-sm">$</span><input type="number" value={cost} onChange={e => setCost(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">Your shipping cost</span>
          <div className={wrap}><span className="text-muted text-sm">$</span><input type="number" value={ship} onChange={e => setShip(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">eBay final value fee</span>
          <div className={wrap}><input type="number" value={fee} onChange={e => setFee(e.target.value)} className={inp} /><span className="text-muted text-sm">%</span></div></label>
        <label className="block"><span className="text-sm text-muted">Minimum margin you&apos;ll accept</span>
          <div className={wrap}><input type="number" value={margin} onChange={e => setMargin(e.target.value)} className={inp} /><span className="text-muted text-sm">%</span></div></label>
        <label className="block"><span className="text-sm text-muted">Your list price (optional)</span>
          <div className={wrap}><span className="text-muted text-sm">$</span><input type="number" value={list} onChange={e => setList(e.target.value)} className={inp} /></div></label>
      </div>
      <div className="space-y-4">
        <div className="bg-ink text-white rounded-lg p-6">
          <p className="text-sm text-white/75">Minimum offer worth accepting</p>
          <p className="text-4xl font-extrabold mt-1 tabular">{money(minOffer)}</p>
          <p className="text-sm text-white/75 mt-2">
            keeps your {isFinite(m) ? (m * 100).toFixed(0) : '—'}% margin after fees
            {isFinite(discount) && discount > 0 ? ` — that’s ${discount.toFixed(0)}% off your list price` : ''}
          </p>
        </div>
        <div className="bg-surface border border-line rounded-lg p-6 space-y-3 text-sm">
          <p><b>Set auto-accept at:</b> <span className="tabular">{money(minOffer)}</span> or higher — never think about good offers again.</p>
          <p><b>Set auto-decline below:</b> <span className="tabular">{money(autoDecline)}</span> — lowballs disappear silently.</p>
          <p className="text-muted">Absolute break-even (0% margin): <b className="tabular">{money(breakEven)}</b> — accepting anything below this loses money. This is the same <Link href="/guides/ebay-price-floor" className="text-cut">floor</Link> a repricer should never cross.</p>
        </div>
      </div>
    </div>
  )
}
