'use client'
import { useState } from 'react'
import Link from 'next/link'
import { api } from '../lib/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setBusy(true)
    try {
      await api('/api/auth/request-password-reset', { method: 'POST', body: JSON.stringify({ email }) })
      setDone(true) // always neutral — no account enumeration
    } catch {
      setErr('Something went wrong — try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-surface border border-line rounded-lg p-8 w-full max-w-sm space-y-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Reset your password</h1>
          <p className="text-sm text-muted">Enter your account email and we&apos;ll send a reset link.</p>
        </div>
        {done ? (
          <p className="text-sm text-floor bg-floor-tint border border-floor rounded-lg p-3">
            If an account exists for that address, we&apos;ve emailed a reset link. Check your inbox (and spam).
          </p>
        ) : (
          <>
            <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-cut transition" type="email" placeholder="Email"
                   value={email} onChange={e => setEmail(e.target.value)} required />
            {err && <p className="text-sm text-cut">{err}</p>}
            <button disabled={busy} className="inline-flex items-center justify-center gap-2 w-full rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90 disabled:opacity-50">
              {busy ? 'Sending…' : 'Send reset link'}
            </button>
          </>
        )}
        <p className="text-xs text-muted text-center"><Link href="/login" className="text-cut">Back to log in</Link></p>
      </form>
    </div>
  )
}
