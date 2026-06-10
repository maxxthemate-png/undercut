'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-extrabold tracking-tight">Something went wrong on our end.</h1>
        <p className="mt-3 text-gray-600 text-sm">
          Sorry — that&apos;s on us. Try again, and if it keeps happening, email{' '}
          <a href="mailto:nuvent66@gmail.com" className="text-blue-600">nuvent66@gmail.com</a> and the
          founder will look at it.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => reset()} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
            Try again
          </button>
          <Link href="/" className="px-5 py-2.5 rounded-lg border border-gray-200 font-medium hover:bg-gray-50">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
