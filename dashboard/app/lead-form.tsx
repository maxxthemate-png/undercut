'use client'
import { useState } from 'react'
import { api } from './lib/api'

export default function LeadForm({ source = 'landing' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(''); setBusy(true)
    try {
      const r = await api('/api/leads', { method: 'POST', body: JSON.stringify({ email, source }) })
      if (r.ok) setDone(true)
      else setErr('Something went wrong — try again.')
    } catch {
      setErr('Something went wrong — try again.')
    }
    setBusy(false)
  }

  if (done) {
    return <p className="text-green-700 font-medium">✅ You're on the list — we'll email you early access + founding pricing.</p>
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input
        type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="you@yourstore.com"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
      <button disabled={busy}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap">
        {busy ? 'Adding…' : 'Get early access'}
      </button>
      {err && <span className="text-sm text-red-600 sm:hidden">{err}</span>}
    </form>
  )
}
