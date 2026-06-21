import Link from 'next/link'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import { SUPPORT_EMAIL } from '../_content/shared'

export const metadata = {
  title: 'Unsubscribed — Undercut',
  robots: { index: false },
}

export default function Page() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">You&apos;re unsubscribed.</h1>
        <p className="mt-4 text-muted">
          We won&apos;t send you any more marketing or lifecycle emails. Transactional email (password
          resets, billing receipts) still arrives — those keep your account working.
        </p>
        <p className="mt-4 text-sm text-muted">
          Unsubscribed by mistake? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cut">{SUPPORT_EMAIL}</a> or
          just sign up again on the <Link href="/" className="text-cut">homepage</Link>.
        </p>
      </section>
      <Footer />
    </div>
  )
}
