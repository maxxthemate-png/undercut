import Link from 'next/link'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import { pageMeta, SUPPORT_EMAIL } from '../_content/shared'

export const metadata = pageMeta(
  'About — Undercut',
  'Why Undercut exists: a floor-first eBay repricer built by a solo founder for sellers who want to win the sale without racing prices to the bottom.',
  '/about'
)

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <article className="max-w-2xl mx-auto px-6 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">About Undercut</h1>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-gray-700">
          <p>
            Undercut is built and run by a solo founder, in the open, in 2026. It exists because of a
            pattern in every conversation with eBay sellers: the tools that automate pricing are
            bloated, expensive, and — worst of all — sellers fear they&apos;ll race prices to the bottom
            while they sleep.
          </p>
          <p>
            So Undercut is built backwards from that fear. The <b>per-item hard floor</b> is the
            centerpiece, not a buried setting: the repricer beats your lowest competitor automatically,
            24/7, but it will never cross the minimum you set — cost + fees + the margin you decide.
            Win the sale. Keep the margin. Sleep.
          </p>
          <p>
            Today Undercut is live: one-click eBay connection, automatic listing import, floor-first
            repricing with AI-tuned aggressiveness on higher plans, and a log of every price change it
            makes. It&apos;s early — which is exactly why joining now is good: every signup today is a{' '}
            <b>founding user</b> with direct email access to the founder and founding pricing locked in.
          </p>
        </div>

        <h2 className="text-xl font-bold mt-10 mb-3">Principles</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700">
          <li>No fake testimonials, no inflated numbers — the product earns trust or it doesn&apos;t.</li>
          <li>No credit card to try it. The trial is real and the Free plan is real.</li>
          <li>Cancel anytime; your data is never sold.</li>
          <li>The floor is sacred. Automation that loses you money is worse than no automation.</li>
        </ul>

        <div className="mt-10 flex items-center gap-3">
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
            Start free — 14-day trial, no card
          </Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="px-6 py-3 rounded-lg border border-gray-200 font-medium hover:bg-gray-50">
            Email the founder
          </a>
        </div>
      </article>
      <Footer />
    </div>
  )
}
