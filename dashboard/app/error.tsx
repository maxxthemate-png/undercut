'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-extrabold tracking-tight">Something went wrong on our end.</h1>
        <p className="mt-3 text-muted text-sm">
          Sorry — that&apos;s on us. Try again, and if it keeps happening, email{' '}
          <a href="mailto:hello@undercutpricer.com" className="text-cut">hello@undercutpricer.com</a> and the
          founder will look at it.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => reset()} className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">
            Try again
          </button>
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded border border-line text-ink font-medium px-5 py-2.5 transition hover:border-muted">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
