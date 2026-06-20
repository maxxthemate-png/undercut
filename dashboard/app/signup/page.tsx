'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, tok } from '../lib/api'
import { track, trackConversion } from '../lib/track'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  // If they arrived from the instant demo, greet them with what they just checked.
  const [demo, setDemo] = useState<{ q: string; win?: string; floor?: string } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const sp = new URLSearchParams(window.location.search)
    const q = (sp.get('q') || '').trim()
    if (sp.get('from') === 'demo' && q) {
      setDemo({ q, win: sp.get('win') || undefined, floor: sp.get('floor') || undefined })
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setBusy(true)
    const res = await api('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password: pw }) })
    const d = await res.json().catch(() => ({}))
    setBusy(false)
    if (res.ok) {
      tok.set(d.token)
      // Fire the Ads conversion + a generic sign_up event (both no-op until the
      // Ads tag is configured). This is the trial-start the paid campaign optimizes for.
      track('sign_up', { method: 'email' })
      trackConversion(process.env.NEXT_PUBLIC_GADS_SIGNUP_LABEL)
      router.push('/dashboard')
    } else setErr(d.detail || 'Signup failed')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm space-y-4">
        {demo && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">You checked “{demo.q.length > 48 ? demo.q.slice(0, 48) + '…' : demo.q}”.</p>
            <p className="text-sm text-blue-800 mt-1">
              {demo.win
                ? <>Undercut would win that sale at <b>${demo.win}</b>{demo.floor ? <> — above your <b>${demo.floor}</b> floor</> : null}. </>
                : null}
              Create your account to do this across your <b>whole store</b>, automatically — floor-protected, no card.
            </p>
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-900">Start your Founding trial</h1>
          <p className="text-sm text-gray-500">14 days of Starter features (100 listings) free — no credit card.</p>
        </div>
        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" type="email" placeholder="Email"
               value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" type="password" placeholder="Password (8+ chars)"
               value={pw} onChange={e => setPw(e.target.value)} required minLength={8} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
          {busy ? 'Creating…' : 'Start free — no card'}
        </button>
        <p className="text-xs text-gray-500 text-center">Already have an account? <Link href="/login" className="text-blue-600">Log in</Link></p>
      </form>
    </div>
  )
}
