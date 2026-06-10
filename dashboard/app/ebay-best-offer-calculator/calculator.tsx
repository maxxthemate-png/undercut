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

  const wrap = 'mt-1 flex items-center border border-gray-300 rounded-lg px-3 bg-white'
  const inp = 'w-full py-2 px-2 text-sm outline-none bg-transparent'

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
      <div className="space-y-4 bg-white border border-gray-200 rounded-2xl p-6">
        <label className="block"><span className="text-sm text-gray-600">Item cost</span>
          <div className={wrap}><span className="text-gray-400 text-sm">$</span><input type="number" value={cost} onChange={e => setCost(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-gray-600">Your shipping cost</span>
          <div className={wrap}><span className="text-gray-400 text-sm">$</span><input type="number" value={ship} onChange={e => setShip(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-gray-600">eBay final value fee</span>
          <div className={wrap}><input type="number" value={fee} onChange={e => setFee(e.target.value)} className={inp} /><span className="text-gray-400 text-sm">%</span></div></label>
        <label className="block"><span className="text-sm text-gray-600">Minimum margin you&apos;ll accept</span>
          <div className={wrap}><input type="number" value={margin} onChange={e => setMargin(e.target.value)} className={inp} /><span className="text-gray-400 text-sm">%</span></div></label>
        <label className="block"><span className="text-sm text-gray-600">Your list price (optional)</span>
          <div className={wrap}><span className="text-gray-400 text-sm">$</span><input type="number" value={list} onChange={e => setList(e.target.value)} className={inp} /></div></label>
      </div>
      <div className="space-y-4">
        <div className="bg-blue-600 text-white rounded-2xl p-6">
          <p className="text-sm text-blue-100">Minimum offer worth accepting</p>
          <p className="text-4xl font-extrabold mt-1">{money(minOffer)}</p>
          <p className="text-sm text-blue-100 mt-2">
            keeps your {isFinite(m) ? (m * 100).toFixed(0) : '—'}% margin after fees
            {isFinite(discount) && discount > 0 ? ` — that’s ${discount.toFixed(0)}% off your list price` : ''}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3 text-sm">
          <p><b>Set auto-accept at:</b> {money(minOffer)} or higher — never think about good offers again.</p>
          <p><b>Set auto-decline below:</b> {money(autoDecline)} — lowballs disappear silently.</p>
          <p className="text-gray-500">Absolute break-even (0% margin): <b>{money(breakEven)}</b> — accepting anything below this loses money. This is the same <Link href="/guides/ebay-price-floor" className="text-blue-600">floor</Link> a repricer should never cross.</p>
        </div>
      </div>
    </div>
  )
}
