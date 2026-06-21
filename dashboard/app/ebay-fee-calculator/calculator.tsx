'use client'
import { useState } from 'react'

const num = (v: string) => (v.trim() === '' ? NaN : Number(v))
const money = (v: number) => (isFinite(v) ? `$${v.toFixed(2)}` : '—')

// Typical standard (non-store) final value fee rates, mid-2026. Presets only
// fill the editable % field — sellers with stores/discounts can override.
const CATEGORIES: [string, number][] = [
  ['Most categories', 13.6],
  ['Books, Movies & Music', 15.3],
  ['Consumer Electronics', 13.25],
  ['Clothing, Shoes & Accessories', 13.6],
  ['Trading Cards', 13.6],
  ['Jewelry', 15.0],
  ['Watches', 15.0],
  ['Guitars & Basses', 6.7],
  ['Select Business & Industrial', 3.0],
]

export default function Calculator() {
  const [price, setPrice] = useState('24.99')
  const [shipCharged, setShipCharged] = useState('0')
  const [fvf, setFvf] = useState('13.6')
  const [ad, setAd] = useState('0')
  const [cost, setCost] = useState('12')
  const [shipCost, setShipCost] = useState('4')

  const p = num(price), sc = num(shipCharged), f = num(fvf) / 100, a = num(ad) / 100
  const c = num(cost), s = num(shipCost)

  const base = p + sc // eBay charges FVF on item price + shipping (and sales tax)
  const fixed = isFinite(base) ? (base <= 10 ? 0.3 : 0.4) : NaN
  const fvfFee = base * f
  const adFee = base * a
  const totalFees = fvfFee + adFee + fixed
  const effPct = isFinite(totalFees) && base > 0 ? (totalFees / base) * 100 : NaN
  const net = base - totalFees - c - s
  const margin = isFinite(net) && base > 0 ? (net / base) * 100 : NaN
  // Item price where net = 0 (same shipping): (p+sc)(1-f-a) - fixed - c - s = 0
  const floor = (c + s + (isFinite(fixed) ? fixed : 0.4)) / (1 - f - a) - sc

  const wrap = 'mt-1 flex items-center border border-line rounded px-3 bg-surface focus-within:border-cut transition'
  const inp = 'w-full py-2 px-2 text-sm bg-transparent text-ink'

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-4 bg-surface border border-line rounded-lg p-6">
        <label className="block"><span className="text-sm text-muted">Category preset (typical rate)</span>
          <select
            className="mt-1 w-full border border-line rounded px-3 py-2 text-sm bg-surface text-ink focus:border-cut transition"
            defaultValue="13.6"
            onChange={(e) => setFvf(e.target.value)}
          >
            {CATEGORIES.map(([label, rate]) => (
              <option key={label} value={rate}>{label} — {rate}%</option>
            ))}
          </select></label>
        <label className="block"><span className="text-sm text-muted">Item sale price</span>
          <div className={wrap}><span className="text-muted text-sm">$</span>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">Shipping you charge the buyer</span>
          <div className={wrap}><span className="text-muted text-sm">$</span>
            <input type="number" value={shipCharged} onChange={e => setShipCharged(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">Final value fee (editable)</span>
          <div className={wrap}><input type="number" value={fvf} onChange={e => setFvf(e.target.value)} className={inp} /><span className="text-muted text-sm">%</span></div></label>
        <label className="block"><span className="text-sm text-muted">Promoted Listings ad rate (optional)</span>
          <div className={wrap}><input type="number" value={ad} onChange={e => setAd(e.target.value)} className={inp} /><span className="text-muted text-sm">%</span></div></label>
        <label className="block"><span className="text-sm text-muted">Your item cost</span>
          <div className={wrap}><span className="text-muted text-sm">$</span>
            <input type="number" value={cost} onChange={e => setCost(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">Your actual shipping cost</span>
          <div className={wrap}><span className="text-muted text-sm">$</span>
            <input type="number" value={shipCost} onChange={e => setShipCost(e.target.value)} className={inp} /></div></label>
      </div>

      <div className="space-y-4">
        <div className="bg-surface border border-line rounded-lg p-6">
          <p className="text-sm text-muted">Total eBay fees on this sale</p>
          <p className="text-4xl font-extrabold mt-1 tabular">{money(totalFees)}</p>
          <p className="text-sm text-muted mt-2">
            <span className="tabular">{money(fvfFee)}</span> final value fee{isFinite(adFee) && adFee > 0 ? <> + <span className="tabular">{money(adFee)}</span> promoted ads</> : ''} + <span className="tabular">{money(fixed)}</span> per-order fee
            {isFinite(effPct) ? <> — an effective <b>{effPct.toFixed(1)}%</b></> : null}
          </p>
        </div>
        <div className={`rounded-lg p-6 border ${isFinite(net) && net < 0 ? 'bg-cut-tint border-cut' : 'bg-surface border-line'}`}>
          <p className="text-sm text-muted">Your net profit after fees + costs</p>
          <p className={`text-3xl font-extrabold mt-1 tabular ${isFinite(net) && net < 0 ? 'text-cut' : 'text-floor'}`}>{money(net)}</p>
          <p className="text-sm text-muted mt-1">{isFinite(margin) ? <>{`${margin.toFixed(0)}% margin on the `}<span className="tabular">{money(base)}</span>{` the buyer pays.`}</> : 'Enter your numbers to see profit.'}</p>
        </div>
        <div className="bg-ink text-white rounded-lg p-6">
          <p className="text-sm text-white/75">Your break-even price floor</p>
          <p className="text-4xl font-extrabold mt-1 tabular">{money(floor)}</p>
          <p className="text-sm text-white/75 mt-2">Price below this and you lose money. Undercut reprices you against competitors 24/7 and <b>never crosses this floor</b>.</p>
        </div>
        <p className="text-xs text-muted">Typical standard (non-store) rates, mid-2026. eBay applies final value fees to item price + shipping + sales tax; store subscriptions, Top Rated discounts, category tiers, and the 1.65% international fee change your exact rate. Verify current rates on eBay&apos;s selling-fees page. Not affiliated with eBay.</p>
      </div>
    </div>
  )
}
