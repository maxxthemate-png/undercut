/** SEO pillar guide — "eBay price floor". Genuine educational content marketing
 *  that targets high-intent search and routes to signup. Isolated new file. */
import Link from 'next/link'

export const metadata = {
  title: 'How to Set an eBay Price Floor (and Never Race to the Bottom) — Undercut',
  description:
    'A practical guide to setting a price floor on eBay: the exact formula (cost + fees + minimum margin), worked examples, and how to automate repricing so you undercut competitors without ever selling below your minimum.',
  alternates: { canonical: '/guides/ebay-price-floor' },
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mt-12 mb-3">{children}</h2>
}

export default function PriceFloorGuide() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-[#EE2B1C]">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/compare" className="text-gray-600 hover:text-gray-900">Compare</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start free</Link>
          </div>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-sm font-semibold text-blue-600">Guide</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">How to set an eBay price floor (and never race to the bottom)</h1>
        <p className="mt-5 text-lg text-gray-600">
          Automated repricing wins the sale — until it quietly sells your inventory at a loss. A <strong>price floor</strong> is
          the one rule that prevents that: a per-item minimum your price can never drop below, no matter what competitors do.
          Here&apos;s how to calculate one and put it on autopilot.
        </p>

        <H2>What a price floor actually is</H2>
        <p className="text-gray-700">
          A price floor is the lowest price you&apos;re willing to sell an item for and still come out ahead. Above it, you can
          compete on price freely; at it, you stop. It&apos;s the single guardrail that makes hands-off repricing safe — the
          difference between &quot;undercut the competition&quot; and &quot;undercut the competition <em>until I&apos;m losing money</em>.&quot;
        </p>

        <H2>The formula</H2>
        <div className="bg-gray-50 rounded-xl p-6 my-4 text-gray-900">
          <p className="font-mono text-sm">floor = (item cost + shipping + fixed fees) ÷ (1 − fee % − minimum margin %)</p>
        </div>
        <p className="text-gray-700">
          Dividing by <code>(1 − fees − margin)</code> grosses the number up so that <em>after</em> eBay takes its cut you still
          keep the margin you wanted. Plug in your real numbers, not optimistic ones.
        </p>

        <H2>A worked example</H2>
        <p className="text-gray-700">
          Say an item costs you <strong>$8</strong>, ships for <strong>$4</strong>, eBay&apos;s final-value fee is about{' '}
          <strong>13.25% + $0.30</strong> (it varies by category — check yours), and you want a <strong>15%</strong> minimum margin:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
          <li>Fixed costs = $8 + $4 + $0.30 = <strong>$12.30</strong></li>
          <li>Divide by (1 − 0.1325 − 0.15) = 0.7175</li>
          <li>Floor ≈ <strong>$17.14</strong> — never list or reprice below this</li>
        </ul>
        <p className="text-gray-700 mt-3">
          Now you can undercut competitors all day in the band <em>above</em> $17.14 and know every sale clears your margin.
        </p>

        <H2>Floor vs. ceiling</H2>
        <p className="text-gray-700">
          A floor protects margin; an optional <strong>ceiling</strong> stops you overpricing when competitors vanish or a
          listing is briefly the only one. Most sellers need a floor on every item and a ceiling on a few.
        </p>

        <H2>Why &quot;race to the bottom&quot; is a myth (with a floor)</H2>
        <p className="text-gray-700">
          The fear is real but the cause isn&apos;t repricing — it&apos;s repricing <em>without a floor</em>. Industry data shows
          roughly half of automated reprices move prices <em>up</em>, not down. With a hard floor, the downward moves simply
          stop at your minimum. You capture the buy-now when you can win it profitably, and hold otherwise.
        </p>

        <H2>Putting it on autopilot</H2>
        <p className="text-gray-700">
          Doing this by hand across dozens or hundreds of listings is the real problem. <Link href="/" className="text-blue-600 hover:text-blue-700">Undercut</Link>{' '}
          tracks the lowest competitor on each item and reprices to win — then clamps to the floor you set. On Pro, AI tunes how
          aggressive to be so you keep margin instead of giving it away. You set the floor once; it enforces it forever.
        </p>

        <div className="rounded-2xl bg-blue-600 text-white px-8 py-10 text-center my-12">
          <h2 className="text-2xl font-extrabold">Set your floors, then let it run.</h2>
          <p className="mt-3 text-blue-100">14-day Starter trial, no card. Undercut competitors automatically — never below your minimum.</p>
          <Link href="/signup" className="inline-block mt-6 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50">Start free</Link>
        </div>

        <H2>FAQ</H2>
        <div className="space-y-5">
          <div>
            <p className="font-semibold">What if a competitor prices below my floor?</p>
            <p className="text-gray-700 text-sm mt-1">You hold at your floor and let them take the unprofitable sale. Winning every sale at a loss isn&apos;t winning.</p>
          </div>
          <div>
            <p className="font-semibold">Should the floor include eBay Store fees or promoted-listing fees?</p>
            <p className="text-gray-700 text-sm mt-1">If they materially affect an item&apos;s economics, fold them into the fee % so your floor stays honest.</p>
          </div>
          <div>
            <p className="font-semibold">Can I set one floor for everything?</p>
            <p className="text-gray-700 text-sm mt-1">You can set a default, but per-item floors are safer because cost and fees differ by product.</p>
          </div>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Related: <Link href="/compare" className="text-blue-600 hover:text-blue-700">eBay repricer comparison</Link> ·{' '}
          <Link href="/free-ebay-repricer" className="text-blue-600 hover:text-blue-700">free eBay repricer</Link>
        </p>
      </article>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/compare" className="hover:text-gray-600">Compare</Link>
          <Link href="/signup" className="hover:text-gray-600">Start free</Link>
        </div>
        © Undercut — automated eBay repricing.
      </footer>
    </div>
  )
}
