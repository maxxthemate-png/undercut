'use client'
import { useState } from 'react'

const num = (v: string) => (v.trim() === '' ? NaN : Number(v))
const money = (v: number) => (isFinite(v) ? `$${v.toFixed(2)}` : '—')

export default function Calculator() {
  const [cost, setCost] = useState('12')
  const [ship, setShip] = useState('4')
  const [fee, setFee] = useState('13.25')
  const [comp, setComp] = useState('24.99')

  const c = num(cost), s = num(ship), f = num(fee) / 100, k = num(comp)
  const floor = (c + s) / (1 - f)                 // break-even price (net = 0)
  const target = k - 0.01                          // a penny under the lowest competitor
  const belowFloor = isFinite(target) && isFinite(floor) && target < floor
  const pricedAt = isFinite(target) && isFinite(floor) ? Math.max(target, floor) : NaN
  const net = isFinite(pricedAt) ? pricedAt * (1 - f) - c - s : NaN
  const margin = isFinite(net) && pricedAt > 0 ? (net / pricedAt) * 100 : NaN

  const wrap = 'mt-1 flex items-center border border-gray-300 rounded-lg px-3 bg-white'
  const inp = 'w-full py-2 px-2 text-sm outline-none bg-transparent'

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-4 bg-white border border-gray-200 rounded-2xl p-6">
        <label className="block"><span className="text-sm text-gray-600">Item cost</span>
          <div className={wrap}><span className="text-gray-400 text-sm">$</span>
            <input type="number" value={cost} onChange={e => setCost(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-gray-600">Shipping cost</span>
          <div className={wrap}><span className="text-gray-400 text-sm">$</span>
            <input type="number" value={ship} onChange={e => setShip(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-gray-600">eBay + payment fees</span>
          <div className={wrap}><input type="number" value={fee} onChange={e => setFee(e.target.value)} className={inp} /><span className="text-gray-400 text-sm">%</span></div></label>
        <label className="block"><span className="text-sm text-gray-600">Lowest competitor price</span>
          <div className={wrap}><span className="text-gray-400 text-sm">$</span>
            <input type="number" value={comp} onChange={e => setComp(e.target.value)} className={inp} /></div></label>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-600 text-white rounded-2xl p-6">
          <p className="text-sm text-blue-100">Your break-even floor</p>
          <p className="text-4xl font-extrabold mt-1">{money(floor)}</p>
          <p className="text-sm text-blue-100 mt-2">Sell below this and you lose money — Undercut never prices under your floor.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          {belowFloor ? (
            <p className="text-sm text-gray-700">⚠️ The lowest competitor (<b>{money(k)}</b>) is <b>below your floor</b>. Undercut would <b>hold at {money(floor)}</b> and skip the race to the bottom — protecting your margin instead of selling at a loss.</p>
          ) : (
            <>
              <p className="text-sm text-gray-600">Undercut would price you at</p>
              <p className="text-3xl font-extrabold">{money(pricedAt)}</p>
              <p className="text-sm text-gray-600 mt-1">— a penny under the {money(k)} competitor — and you'd still net <b className="text-green-700">{money(net)}</b>{isFinite(margin) ? ` (${margin.toFixed(0)}% margin)` : ''} per sale.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
