'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { api } from '../lib/api'
import { track, trackConversion } from '../lib/track'

type Item = { title?: string; price: number; condition?: string; url?: string }
type Result = {
  query?: string
  item?: Item | null   // present when a specific listing was resolved by URL
  lowest: number | null
  count: number
  items: Item[]
}

const money = (v: number | null | undefined) =>
  typeof v === 'number' && isFinite(v) ? `$${v.toFixed(2)}` : '—'

// A pasted eBay URL or a bare item id → exact-listing lookup; anything else → keyword search.
const looksLikeListing = (s: string) => /ebay\.[a-z.]+\/|\/itm\/|^\d{9,15}$/i.test(s.trim())

export default function Checker() {
  const [q, setQ] = useState('')
  const [submittedQ, setSubmittedQ] = useState('')
  const [wasListing, setWasListing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [res, setRes] = useState<Result | null>(null)
  const [floor, setFloor] = useState<string>('')
  const [floorFired, setFloorFired] = useState(false)
  const [shareEmail, setShareEmail] = useState('')
  const [shareBusy, setShareBusy] = useState(false)
  const [shareDone, setShareDone] = useState(false)

  async function runCheck(raw: string) {
    if (raw.length < 3 || busy) return
    setBusy(true); setErr(''); setRes(null); setShareDone(false)
    const listing = looksLikeListing(raw)
    const path = listing
      ? `/api/tools/listing-check?url=${encodeURIComponent(raw)}`
      : `/api/tools/price-check?q=${encodeURIComponent(raw)}`
    try {
      const r = await api(path)
      if (!r.ok) {
        const d = await r.json().catch(() => ({}))
        setErr(d.detail || 'Something went wrong — try again.')
      } else {
        const data: Result = await r.json()
        if (listing && !(data.item && data.item.title)) {
          setErr("Couldn't read that exact listing — paste the full link (the one with /itm/…), or just search the product name instead.")
        } else {
          setRes(data)
          setSubmittedQ(raw)
          setWasListing(listing)
          track('demo_use', { mode: listing ? 'listing' : 'keyword', lowest: data.lowest ?? 0, listings: data.count })
          trackConversion(process.env.NEXT_PUBLIC_GADS_DEMO_LABEL, { mode: listing ? 'listing' : 'keyword' })
        }
      }
    } catch {
      setErr('Something went wrong — try again.')
    } finally {
      setBusy(false)
    }
  }

  function check(e: React.FormEvent) {
    e.preventDefault()
    runCheck(q.trim())
  }

  // Auto-run from a shared/deep link (?q=…&floor=…) so a shared result reconstructs itself.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const sp = new URLSearchParams(window.location.search)
    const qp = (sp.get('q') || '').trim()
    const fp = sp.get('floor')
    if (fp) setFloor(fp)
    if (qp.length >= 3) { setQ(qp); runCheck(qp) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the URL in sync with the current result + floor → every result is a shareable permalink.
  useEffect(() => {
    if (typeof window === 'undefined' || !res || !submittedQ) return
    const sp = new URLSearchParams()
    sp.set('q', submittedQ)
    if (floor.trim() !== '') sp.set('floor', floor.trim())
    window.history.replaceState(null, '', '?' + sp.toString())
  }, [res, submittedQ, floor])

  const item = res?.item ?? null
  const lowest = res?.lowest ?? null
  const pennyUnder = lowest != null ? Math.max(lowest - 0.01, 0) : null
  const floorNum = floor.trim() === '' ? null : Number(floor)
  const floorValid = floorNum != null && isFinite(floorNum) && floorNum > 0
  const wins = floorValid && pennyUnder != null && pennyUnder >= (floorNum as number)
  const margin = wins ? (pennyUnder as number) - (floorNum as number) : 0
  const looseMatch = res != null && !wasListing

  function onFloorChange(v: string) {
    setFloor(v)
    if (!floorFired && v.trim() !== '') {
      track('demo_floor', { mode: item ? 'listing' : 'keyword' })
      setFloorFired(true)
    }
  }

  const signupHref = res
    ? `/signup?from=demo&q=${encodeURIComponent(submittedQ)}` +
      (pennyUnder != null ? `&win=${pennyUnder.toFixed(2)}` : '') +
      (floorValid ? `&floor=${(floorNum as number).toFixed(2)}` : '')
    : '/signup'

  async function shareByEmail(e: React.FormEvent) {
    e.preventDefault()
    const email = shareEmail.trim()
    if (!email || shareBusy) return
    setShareBusy(true)
    const label = (item?.title || submittedQ || 'a listing').slice(0, 120)
    const note =
      `Checked: ${label} · lowest ${money(lowest)}` +
      (pennyUnder != null ? ` · Undercut would price at ${money(pennyUnder)}` : '') +
      (floorValid ? ` (floor ${money(floorNum)})` : '')
    try {
      await api('/api/leads', { method: 'POST', body: JSON.stringify({ email, source: 'demo_share', note }) })
      track('demo_share', { mode: wasListing ? 'listing' : 'keyword' })
      setShareDone(true)
    } catch {
      setShareDone(true)
    } finally {
      setShareBusy(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={check} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Paste your eBay listing link (the /itm/… URL) for an exact check"
          className="flex-1 rounded border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted outline-none focus:border-cut transition"
          maxLength={400}
        />
        <button
          type="submit"
          disabled={busy || q.trim().length < 3}
          className="inline-flex items-center justify-center rounded bg-cut-strong text-white font-medium px-6 py-3 transition hover:opacity-90 disabled:opacity-50"
        >
          {busy ? 'Checking…' : 'Check it'}
        </button>
      </form>
      <p className="text-xs text-muted mt-2">Paste a full listing link (the one with <span className="tabular">/itm/…</span>) for an exact, like-for-like check. A plain product search also works, but matches loosely — see the note on those results.</p>
      {err && (
        <div className="mt-4 rounded-lg border border-cut bg-cut-tint p-4">
          <p className="text-cut font-semibold">⚠️ Couldn&apos;t check that one</p>
          <p className="text-sm text-cut mt-1">{err}</p>
        </div>
      )}

      {res && (
        <div className="mt-8 space-y-4">
          {looseMatch && (
            <div className="rounded-lg border border-guard bg-guard-tint p-4">
              <p className="text-guard font-semibold">Keyword search — approximate match</p>
              <p className="text-sm text-guard mt-1">
                This searched eBay by keyword, so it can include accessories, parts, or different variants — the number below is a rough guide, not an exact like-for-like price. <b>For the real number on your item, paste its listing link (the <span className="tabular">/itm/…</span> URL) above.</b>
              </p>
            </div>
          )}

          {item && (
            <div className="rounded-lg border border-line bg-surface p-6">
              <p className="text-sm text-muted">Your listing</p>
              <p className="font-semibold leading-snug mt-1 text-ink">
                {item.url ? <a href={item.url} target="_blank" rel="nofollow noopener noreferrer" className="hover:text-cut transition">{item.title}</a> : item.title}
                {item.condition ? <span className="text-muted font-normal"> · {item.condition}</span> : null}
              </p>
              {item.price != null && <p className="text-sm text-muted mt-1">Your current price: <b className="tabular text-ink">{money(item.price)}</b></p>}
            </div>
          )}

          {lowest != null ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className={`${looseMatch ? 'bg-ink' : 'bg-cut-strong'} text-white rounded-lg p-6`}>
                <p className="text-sm text-white/75">{item ? 'Lowest competitor right now' : looseMatch ? 'Lowest of matching listings (approx.)' : 'Lowest live price right now'}</p>
                <p className="text-4xl font-extrabold mt-1 tabular">{money(lowest)}</p>
                <p className="text-sm text-white/75 mt-2">across {res.count} {item ? 'competing' : 'matching'} listing{res.count === 1 ? '' : 's'}{!item && res.query ? ` for “${res.query}”` : ''}</p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="text-sm text-muted">To win this sale you&apos;d price at</p>
                <p className="text-4xl font-extrabold mt-1 tabular text-floor">{money(pennyUnder)}</p>
                <p className="text-sm text-muted mt-2">a penny under the lowest{looseMatch ? ' matching' : ' competitor'}.</p>
              </div>
            </div>
          ) : item ? (
            <div className="rounded-lg border border-floor bg-floor-tint p-6">
              <p className="text-floor font-semibold">No other live listings of this exact item right now.</p>
              <p className="text-sm text-floor mt-1">You set the price. Undercut starts defending your floor the moment a competitor appears — so you never get undercut while you&apos;re not looking.</p>
            </div>
          ) : null}

          {/* Instant demo: enter your floor → see THE FLOOR LINE */}
          {lowest != null && (
            <div className="rounded-lg border border-line bg-surface p-6">
              <p className="text-sm font-semibold text-ink">Now see what Undercut would actually do to your listing</p>
              <p className="text-sm text-muted mt-1 mb-3">Enter your cost or break-even floor — the lowest price you&apos;d ever accept on this item.</p>
              <div className="flex items-center gap-2 max-w-xs">
                <span className="text-muted">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={floor}
                  onChange={(e) => onFloorChange(e.target.value)}
                  placeholder="Your floor (e.g. 48.00)"
                  className="flex-1 rounded border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted outline-none focus:border-cut transition tabular"
                  min="0"
                  step="0.01"
                />
              </div>

              {floorValid && pennyUnder != null && (
                <>
                  {/* ── THE FLOOR LINE (signature) — your price resting above the line you set ── */}
                  <div className="mt-5 border-l-2 border-line pl-5 space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="flex items-center gap-2 text-sm text-muted"><i className="w-2 h-2 rounded-[1px] bg-muted" />Lowest competitor</span>
                      <span className="tabular font-semibold text-ink">{money(lowest)}</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="flex items-center gap-2 text-sm font-medium text-cut"><i className="w-2 h-2 rounded-[1px] bg-cut" />Undercut lists you at</span>
                      <span className="tabular font-bold text-cut cut-rule">{money(pennyUnder)}</span>
                    </div>
                    {wins && (
                      <p className="text-xs text-floor pl-4">↕ <span className="tabular font-semibold">{money(margin)}</span> protected margin</p>
                    )}
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="flex items-center gap-2 text-sm text-floor"><i className="w-2 h-2 rounded-[1px] bg-floor" />Your floor — never crossed</span>
                      <span className="tabular font-semibold text-floor">{money(floorNum)}</span>
                    </div>
                  </div>

                  {wins ? (
                    <div className="mt-4 rounded-lg border border-floor bg-floor-tint p-4">
                      <p className="text-floor font-semibold">✅ Undercut lists you at <span className="tabular">{money(pennyUnder)}</span> and wins the sale.</p>
                      <p className="text-sm text-floor mt-1">
                        That&apos;s a penny under the lowest competitor and <b><span className="tabular">{money(margin)}</span> above your <span className="tabular">{money(floorNum)}</span> floor</b> — you take the sale and keep the margin. Undercut re-checks and holds that edge 24/7.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-lg border border-guard bg-guard-tint p-4">
                      <p className="text-guard font-semibold">🛡️ The market is already below your <span className="tabular">{money(floorNum)}</span> floor.</p>
                      <p className="text-sm text-guard mt-1">
                        A &ldquo;just undercut everyone&rdquo; rule would drag you to <span className="tabular">{money(pennyUnder)}</span> and lose money on every sale. Undercut <b>holds at <span className="tabular">{money(floorNum)}</span> and waits</b> — you never sell at a loss chasing the bottom. The moment competitors rise above your floor, it starts winning again automatically.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {res.items.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-6">
              <p className="text-sm font-semibold mb-3 text-ink">Cheapest {item ? 'competing ' : ''}live listings</p>
              <ul className="space-y-2 text-sm">
                {res.items.map((it, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4">
                    <span className="text-muted truncate">
                      {it.url ? (
                        <a href={it.url} target="_blank" rel="nofollow noopener noreferrer" className="hover:text-cut transition">{it.title}</a>
                      ) : it.title}
                      {it.condition ? <span className="text-muted"> · {it.condition}</span> : null}
                    </span>
                    <b className="whitespace-nowrap tabular text-ink">{money(it.price)}</b>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lowest != null && (
            shareDone ? (
              <div className="rounded-lg border border-floor bg-floor-tint p-5 text-center">
                <p className="text-floor font-semibold">Sent — check your inbox. 📬</p>
                <p className="text-sm text-floor mt-1">We&apos;ll show you how to put your whole store on autopilot. No card needed.</p>
              </div>
            ) : (
              <form onSubmit={shareByEmail} className="rounded-lg border border-line bg-wash p-5">
                <p className="text-sm font-semibold text-ink">Want this on every listing in your store, automatically?</p>
                <p className="text-sm text-muted mt-1 mb-3">Email yourself this result and I&apos;ll show you how — no card.</p>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    placeholder="you@yourstore.com"
                    className="flex-1 rounded border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted outline-none focus:border-cut transition"
                    required
                  />
                  <button type="submit" disabled={shareBusy} className="inline-flex items-center justify-center rounded bg-ink text-white text-sm font-medium px-4 py-2 transition hover:opacity-90 disabled:opacity-50 whitespace-nowrap">
                    {shareBusy ? 'Sending…' : 'Email me this'}
                  </button>
                </div>
              </form>
            )
          )}

          <div className="rounded-lg bg-ink text-white p-6 text-center">
            <p className="font-semibold">That&apos;s one listing. Undercut does this for your whole store.</p>
            <p className="text-sm text-white/75 mt-1 mb-4">It watches the lowest competitor on every listing, reprices you to win 24/7, and never crosses the floor you set. Set it and forget it.</p>
            <Link href={signupHref} className="inline-flex items-center justify-center rounded bg-cut-strong text-white font-medium px-6 py-3 transition hover:opacity-90">Start free — 14-day trial, no card</Link>
            <p className="text-xs text-white/60 mt-3">Connecting only imports your listings — nothing reprices until you set a floor and turn it on, one listing at a time.</p>
          </div>
        </div>
      )}
    </div>
  )
}
