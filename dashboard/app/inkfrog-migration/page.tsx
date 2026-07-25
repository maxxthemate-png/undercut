/** SEO hub — informational intent: "inkFrog shutting down what to do" /
 *  "inkFrog migration checklist". A genuinely useful, honest migration resource
 *  for displaced inkFrog sellers: what to save, what breaks, and how to rebuild
 *  each function — including the parts Undercut does NOT do. The repricing step
 *  is where Undercut earns the pitch. Complements /inkfrog-alternative (which
 *  targets the commercial "alternative" keyword). */
import Link from 'next/link'
import Faq from '../_components/Faq'
import TrustBadges from '../_components/TrustBadges'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'inkFrog Shut Down: Migration Checklist for eBay Sellers — Undercut',
  'inkFrog shut down in June 2026. A practical migration checklist: what you kept, what broke, and how to rebuild listing management and repricing.',
  '/inkfrog-migration'
)

const STEPS: { title: string; body: string }[] = [
  {
    title: '1. Recover what you can — and check what you already exported',
    body: 'inkFrog closed in June 2026, so if you did not export your listing templates and descriptions beforehand, assume they are gone — support requests to a shut-down service go unanswered. Check any old downloads folder or email receipts for a backup you may have taken. Going forward, keep your own copy of templates outside whatever tool you pick; this is the lesson the shutdown teaches.',
  },
  {
    title: '2. Confirm your listings live on eBay, not in the tool',
    body: 'Your active eBay listings belong to eBay, not inkFrog — they did not disappear when inkFrog closed. What you lost is the management layer on top: template-based editing, bulk workflows, and any automation you had configured. Log into eBay Seller Hub and verify your active listings, then note which ones depended on inkFrog automation so you know what stopped updating.',
  },
  {
    title: '3. Rebuild listing management first (the free option is fine)',
    body: 'For creating and editing listings, eBay’s own Seller Hub covers the basics for free, and its bulk listing tools handle most day-to-day edits. Many former inkFrog sellers find they don’t need a paid listing manager at all anymore — start with Seller Hub and only add a paid tool if you hit a real wall (e.g. heavy cross-listing to other marketplaces).',
  },
  {
    title: '4. Rebuild pricing automation second — this is the part that silently costs you money',
    body: 'If competitors undercut you and nothing responds, you drop in Best Match placement and lose sales while you’re not looking. This is the job Undercut does: it reprices each listing to beat the lowest competitor automatically, but never below a hard per-item floor you set (your cost + fees + minimum margin), so automation can’t gut your margins. You can connect eBay in one click and evaluate it on a free 14-day trial with no card.',
  },
  {
    title: '5. Set your floors before you switch anything on',
    body: 'Whatever repricer you pick, compute a real floor per listing before enabling automation: item cost + eBay final value fee + shipping + the smallest profit you’ll accept. Our free fee calculator does the math for 2026 fee rates. A repricer without floors is how sellers wake up to items sold at a loss.',
  },
  {
    title: '6. Watch the first full cycle',
    body: 'After switching on any new automation, check the first day’s price changes against your expectations: every change should be explainable (a competitor moved) and every price should sit at or above your floor. In Undercut, the dashboard logs every reprice with the reason, so this audit takes minutes.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Did my eBay listings disappear when inkFrog shut down?',
    a: 'No. Active listings live on eBay itself and survived the shutdown. What stopped working is inkFrog’s management layer — templates, bulk edits, and any automation running through it. Anything stored only inside inkFrog (templates, saved descriptions) is what was lost unless you exported it first.',
  },
  {
    q: 'Do I need to replace inkFrog with one tool or several?',
    a: 'inkFrog bundled listing management with seller workflows. Most sellers rebuild it as two pieces: eBay Seller Hub (free) for creating and editing listings, plus a dedicated repricer for pricing automation. That split is often cheaper than what a bundled tool cost.',
  },
  {
    q: 'Is Undercut a full inkFrog replacement?',
    a: 'No, and we say that plainly: Undercut does not do listing creation or templates. It does one job — automatically repricing your eBay listings to beat the lowest competitor without ever crossing the hard floor you set. If competitive pricing was part of what you relied on, it covers that job well; pair it with Seller Hub for the rest.',
  },
  {
    q: 'How long does the switch take?',
    a: 'For the pricing half: connecting eBay is one click (OAuth), your active listings import automatically, and setting floors on your top listings takes a few minutes. There is no data migration from inkFrog needed, because repricing works from your live eBay listings, not from inkFrog’s data.',
  },
  {
    q: 'What does it cost to try?',
    a: 'Nothing up front: every account starts with a 14-day Starter-level trial with no card, and after that there’s a free plan covering 25 listings. Paid plans start at $29/mo for 100 listings.',
  },
]

export default function InkFrogMigration() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <nav className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg"><img src="/logo-mark.svg" alt="" className="h-7 w-7" />under<span className="text-cut">cut</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/inkfrog-alternative" className="text-muted hover:text-ink transition">inkFrog alternative</Link>
            <Link href="/login" className="text-muted hover:text-ink transition">Log in</Link>
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-4 py-2 transition hover:opacity-90">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-10">
        <p className="text-sm font-semibold text-cut">inkFrog shutdown · migration checklist</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">inkFrog shut down. Here’s exactly what to do now.</h1>
        <p className="mt-5 text-lg text-muted">
          A practical checklist for eBay sellers who lost inkFrog when it closed in June 2026: what you
          still have, what actually broke, and how to rebuild each piece — including the parts Undercut doesn’t do.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-8">
        <div className="space-y-8">
          {STEPS.map((s) => (
            <div key={s.title} className="border-l-2 border-cut pl-5">
              <h2 className="text-lg font-bold">{s.title}</h2>
              <p className="text-sm text-muted mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3 flex-wrap">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded bg-cut-strong text-white font-medium px-5 py-2.5 transition hover:opacity-90">Start free — 14-day trial, no card</Link>
          <Link href="/ebay-fee-calculator" className="inline-flex items-center justify-center gap-2 rounded border border-line text-ink font-medium px-5 py-2.5 transition hover:border-muted">Compute your floors (free) →</Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-6 pb-2">
        <TrustBadges />
      </section>

      <Faq items={FAQ_ITEMS} />

      <section className="max-w-3xl mx-auto px-6 pb-14 text-center text-sm text-muted">
        <p>
          Related: <Link href="/inkfrog-alternative" className="text-cut hover:opacity-90">inkFrog alternative (comparison)</Link> ·{' '}
          <Link href="/guides/ebay-price-floor" className="text-cut hover:opacity-90">how to set a price floor</Link> ·{' '}
          <Link href="/compare" className="text-cut hover:opacity-90">all repricers compared</Link>
        </p>
        <p className="mt-3 text-xs">inkFrog is a trademark of its respective owner; Undercut is not affiliated with or endorsed by it.</p>
      </section>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/" className="hover:text-ink transition">Home</Link>
          <Link href="/compare" className="hover:text-ink transition">Compare</Link>
          <Link href="/signup" className="hover:text-ink transition">Start free</Link>
        </div>
        © Undercut — automated eBay repricing.
      </footer>
    </div>
  )
}
