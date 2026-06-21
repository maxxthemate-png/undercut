'use client'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, tok } from '../lib/api'

function ResetForm() {
  const router = useRouter()
  const token = useSearchParams().get('token') || ''
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  if (!token) {
    return (
      <div className="bg-surface border border-line rounded-lg p-8 w-full max-w-sm space-y-3 text-center">
        <h1 className="text-xl font-bold text-ink">Invalid reset link</h1>
        <p className="text-sm text-muted">This link is missing or expired.</p>
        <Link href="/forgot-password" className="text-sm text-cut">Request a new one</Link>
      </div>
    )
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (pw !== pw2) { setErr('Passwords don’t match.'); return }
    setErr(''); setBusy(true)
    try {
      const res = await api('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, password: pw }) })
      const d = await res.json().catch(() => ({}))
      if (res.ok) {
        if (d.token) tok.set(d.token)
        setDone(true)
        setTimeout(() => router.push(d.token ? '/dashboard' : '/login'), 1200)
      } else setErr(d.detail || 'This reset link is invalid or expired.')
    } catch {
      setErr('Something went wrong — try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-surface border border-line rounded-lg p-8 w-full max-w-sm space-y-4">
      <h1 className="text-xl font-bold text-ink">Choose a new password</h1>
      {done ? (
        <p className="text-sm text-floor bg-floor-tint border border-floor rounded-lg p-3">Password updated — taking you in…</p>
      ) : (
        <>
          <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" type="password" placeholder="New password (8+ chars)"
                 value={pw} onChange={e => setPw(e.target.value)} required minLength={8} />
          <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" type="password" placeholder="Confirm new password"
                 value={pw2} onChange={e => setPw2(e.target.value)} required minLength={8} />
          {err && <p className="text-sm text-cut">{err}</p>}
          <button disabled={busy} className="inline-flex items-center justify-center gap-2 w-full rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 disabled:opacity-50">
            {busy ? 'Saving…' : 'Set new password'}
          </button>
        </>
      )}
    </form>
  )
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <ResetForm />
      </Suspense>
    </div>
  )
}
