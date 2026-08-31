'use client'
import { useState } from 'react'
import Link from 'next/link'

const num = (v: string) => (v.trim() === '' ? NaN : Number(v))
const money = (v: number) => (isFinite(v) ? `$${v.toFixed(2)}` : '—')
const hours = (v: number) => (isFinite(v) ? (v < 1 ? `${Math.round(v * 60)} min` : `${v.toFixed(1)} hr`) : '—')

export default function Calculator() {
  const [listings, setListings] = useState('40')
  const [minutes, setMinutes] = useState('1.5')
  const [perDay, setPerDay] = useState('1')
  const [rate, setRate] = useState('25')

  const l = num(listings), m = num(minutes), p = num(perDay), r = num(rate)

  // Labor cost: every manual check touches every watched listing.
  const weeklyMinutes = l * m * p * 7
  const weeklyHours = weeklyMinutes / 60
  const weeklyCost = weeklyHours * r
  const monthlyCost = weeklyCost * 4.33

  // Exposure window: the average time a listing sits at its last-checked price
  // before you look at it again. A competitor who undercuts you inside that
  // window wins every price-sensitive sale until your next manual pass.
  const exposureHours = isFinite(p) && p > 0 ? 24 / p : NaN

  // What Undercut's automated cadence would shrink that window to (worst case:
  // Free/Starter's hourly cycle; best case: Pro/Scale's 15-minute cycle).
  const hourlyExposure = 1
  const fastExposure = 0.25
  const windowCutPct = isFinite(exposureHours) && exposureHours > 0
    ? (1 - fastExposure / exposureHours) * 100 : NaN

  const wrap = 'mt-1 flex items-center border border-line rounded px-3 bg-surface focus-within:border-cut transition'
  const inp = 'w-full py-2 px-2 text-sm bg-transparent text-ink'

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
      <div className="space-y-4 bg-surface border border-line rounded-lg p-6">
        <label className="block"><span className="text-sm text-muted">Listings you manually watch &amp; reprice</span>
          <div className={wrap}><input type="number" value={listings} onChange={e => setListings(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">Minutes spent per listing, per check</span>
          <div className={wrap}><input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">Times per day you actually check &amp; reprice</span>
          <div className={wrap}><input type="number" value={perDay} onChange={e => setPerDay(e.target.value)} className={inp} /></div></label>
        <label className="block"><span className="text-sm text-muted">What your time is worth</span>
          <div className={wrap}><span className="text-muted text-sm">$</span><input type="number" value={rate} onChange={e => setRate(e.target.value)} className={inp} /><span className="text-muted text-sm">/hr</span></div></label>
      </div>
      <div className="space-y-4">
        <div className="bg-ink text-white rounded-lg p-6">
          <p className="text-sm text-white/75">Manual repricing labor cost</p>
          <p className="text-4xl font-extrabold mt-1 tabular">{money(monthlyCost)}<span className="text-lg font-medium text-white/60">/mo</span></p>
          <p className="text-sm text-white/75 mt-2">
            {isFinite(weeklyHours) ? `${weeklyHours.toFixed(1)} hours/week` : '—'} of your own time spent opening listings and typing new prices in — not selling, not sourcing.
          </p>
        </div>
        <div className="bg-surface border border-line rounded-lg p-6 space-y-3 text-sm">
          <p><b>Your price-exposure window:</b> <span className="tabular">{hours(exposureHours)}</span> — the average stretch between your checks where a competitor can undercut you and you won&apos;t know until you look again.</p>
          <p className="text-muted">
            Every price-sensitive sale that happens inside that window goes to whoever is cheapest at that moment — not necessarily you, even if you were the lowest an hour ago.
          </p>
          <p>
            Undercut re-checks and reprices automatically as often as every <b>15 minutes</b>, shrinking your exposure window by <b className="tabular">{isFinite(windowCutPct) && windowCutPct > 0 ? `${windowCutPct.toFixed(0)}%` : '—'}</b> — with a hard <Link href="/guides/ebay-price-floor" className="text-cut">floor</Link> so faster never means cheaper than you can afford.
          </p>
        </div>
      </div>
    </div>
  )
}
