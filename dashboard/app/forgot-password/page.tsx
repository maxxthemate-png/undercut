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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm space-y-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reset your password</h1>
          <p className="text-sm text-gray-500">Enter your account email and we&apos;ll send a reset link.</p>
        </div>
        {done ? (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
            If an account exists for that address, we&apos;ve emailed a reset link. Check your inbox (and spam).
          </p>
        ) : (
          <>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" type="email" placeholder="Email"
                   value={email} onChange={e => setEmail(e.target.value)} required />
            {err && <p className="text-sm text-red-600">{err}</p>}
            <button disabled={busy} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {busy ? 'Sending…' : 'Send reset link'}
            </button>
          </>
        )}
        <p className="text-xs text-gray-500 text-center"><Link href="/login" className="text-blue-600">Back to log in</Link></p>
      </form>
    </div>
  )
}
