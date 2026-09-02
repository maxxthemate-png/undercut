/** Dedicated FAQ page. AEO/GEO target: decision-stage questions a real eBay
 *  seller types before trying an automated repricer ("does eBay allow this",
 *  "will I get suspended", "how fast is it", "what does it cost"). Grouped by
 *  topic for humans; a single flat FAQPage JSON-LD (matching the visible copy
 *  exactly) for AI answer engines and search. Facts sourced only from
 *  scripts/content-claims.mjs PRODUCT_FACTS + the live pricing/privacy/refund
 *  pages; nothing here is invented. */
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import CtaBanner from '../_components/CtaBanner'
import JsonLd from '../_components/JsonLd'
import { pageMeta, SUPPORT_EMAIL } from '../_content/shared'

export const metadata = pageMeta(
  'FAQ: Undercut eBay Repricer (Safety, Speed, Pricing, Comparisons)',
  'Answers to the questions eBay sellers ask before trying an automated repricer: is it allowed, will it get my account suspended, how fast does it react, what does it cost, and how it compares to StreetPricer, RepricerExpress, and Informed.co.',
  '/faq'
)

type QA = { q: string; a: string }
type Group = { title: string; items: QA[] }

const GROUPS: Group[] = [
  {
    title: 'Is automated repricing safe for my eBay account?',
    items: [
      {
        q: 'Does eBay allow automated repricing tools?',
        a: 'Yes. eBay permits third-party price automation through its own official APIs, and that’s the only way Undercut connects: a one-click eBay OAuth authorization, the same mechanism established eBay tools use. Undercut never scrapes eBay’s website or acts outside the access you explicitly grant.',
      },
      {
        q: 'Will using an automated repricer get my eBay account suspended?',
        a: 'Undercut only does what you authorize: it reads your listings and competitor prices and updates the prices you enable, through eBay’s official OAuth API. It never posts, messages, or touches anything else on your account. We can’t speak for eBay’s policies changing, but repricing through the sanctioned API, with a hard floor that stops it from ever selling at a loss, is standard, permitted seller behavior.',
      },
      {
        q: 'What eBay data does Undercut access, and is it secure?',
        a: 'Undercut reads your listing titles, current prices, and competitor low prices, and writes only the price updates you enable, nothing else. Your eBay OAuth tokens are encrypted at rest (Fernet/AES), passwords are hashed, and every API request is scoped to your own account’s data over TLS.',
      },
      {
        q: 'Does Undercut ever post, message, or change anything else on my eBay account?',
        a: 'No. The only write action Undercut ever takes is updating the price of a listing you’ve enabled for repricing, clamped to the floor and ceiling you set. It doesn’t message buyers, edit listing content, or touch anything outside price.',
      },
    ],
  },
  {
    title: 'How Undercut actually works',
    items: [
      {
        q: 'How fast does Undercut react to a competitor’s price change?',
        a: 'Hourly on the Free and Starter plans, every 15 minutes on Pro and Scale. 15 minutes is the fastest cadence on any plan; Scale doesn’t reprice faster than Pro, it adds listing capacity (10,000 vs. 1,000) and priority support instead.',
      },
      {
        q: 'What is the "hard price floor," and how does it protect my margin?',
        a: 'The floor is the minimum price you set per listing: typically cost plus fees plus the smallest margin you’ll accept. Undercut beats the lowest competitor to win the sale, but every reprice is clamped to that floor: it will never list or sell below it, no matter how aggressive the competition gets.',
      },
      {
        q: 'Does the AI ever drop my price below my floor?',
        a: 'No. On Pro and Scale, Claude AI only tunes how aggressively a listing moves toward the floor you’ve already set: it controls speed and pacing, not the floor itself. The floor is a hard clamp enforced by the repricing engine, and the AI cannot override it.',
      },
      {
        q: 'How long does setup take, and do I need technical or API skills?',
        a: 'A few minutes, no coding. Connect your eBay store with one-click OAuth, your active listings import automatically, then set floors on the listings you want repriced. That’s the whole setup.',
      },
      {
        q: 'What counts as a "listing" toward my plan limit?',
        a: 'Only the active eBay listings you choose to enable for repricing, the ones Undercut actively watches and updates. Your plan’s listing limit applies to those managed listings, not your entire store.',
      },
    ],
  },
  {
    title: 'Pricing and value',
    items: [
      {
        q: 'What does Undercut cost?',
        a: 'Free for 25 listings (no card required), Starter $29/mo for 100 listings, Pro $79/mo for 1,000 listings with AI tuning, and Scale $199/mo for 10,000 listings with AI tuning and priority support. Annual billing on any paid plan runs 10× the monthly price, about two months free.',
      },
      {
        q: 'What does that cost look like against the margin it protects?',
        a: 'Starter works out to about $0.29 per managed listing per month. Because every plan enforces your hard floor, the downside is capped by design: Undercut can win you a sale by beating a competitor, but it structurally cannot reprice you into a loss, so the plan fee is the real cost exposure, not lost margin.',
      },
      {
        q: 'Is there a free plan or free trial? Do I need a credit card?',
        a: 'Both, and no card either way. Every new account gets a 14-day trial with full Starter features (100 listings), no credit card. When the trial ends you drop to the permanent Free plan (25 listings) rather than being charged.',
      },
      {
        q: 'Is there a one-time payment option instead of a subscription?',
        a: 'Yes. The Season Pass is $145 once for 90 days of Starter-level access (100 listings, hard floor, hourly repricing), with nothing recurring. It’s built for sellers running one selling season rather than a year-round store; buying it again extends the window.',
      },
      {
        q: 'Can I cancel anytime? What’s the refund policy?',
        a: 'Monthly plans cancel anytime from the billing portal, with access continuing to the end of the paid month. Annual plans get a full refund within 30 days of purchase, no questions asked; after that you can cancel renewal and keep access through the year.',
      },
      {
        q: 'What happens when my trial ends or I downgrade below my listing count?',
        a: 'Your account, store connection, and floors are all kept; nothing is deleted. Listings beyond your new plan’s limit simply pause repricing until you upgrade or free up capacity; there’s no surprise charge because there’s no card on file until you choose to add one.',
      },
    ],
  },
  {
    title: 'Undercut vs. other repricers',
    items: [
      {
        q: 'How is Undercut different from StreetPricer, RepricerExpress, and Informed.co?',
        a: 'Undercut is eBay-only by design, starts free with no card and a 14-day trial, and treats the hard floor as the centerpiece rather than a buried setting. StreetPricer and RepricerExpress are broader multi-channel tools with paid-only tiers, and Informed.co no longer supports eBay at all as of 2026: it’s Amazon and Walmart only.',
      },
      {
        q: 'Does Undercut work with Amazon or other marketplaces?',
        a: 'Not yet. Undercut is deliberately eBay-only to stay simple, fast to set up, and cheap; that focus is a design choice, not a limitation we’re rushing to fix.',
      },
      {
        q: 'Who actually runs Undercut?',
        a: 'Undercut is built and operated by a solo founder, not a large company; you can email the founder directly at hello@undercutpricer.com. Early signups are treated as founding users with direct access and founding pricing locked in.',
      },
      {
        q: 'What if I have more than 10,000 listings?',
        a: 'Scale (10,000 listings) is the largest published plan. If you need more capacity, email hello@undercutpricer.com directly; as a solo-founder product, that’s a real inbox, not a support queue.',
      },
    ],
  },
]

export default function FaqPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GROUPS.flatMap((g) => g.items).map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-sm font-semibold text-cut uppercase tracking-wide">FAQ</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">
          Everything sellers ask before turning on automated repricing
        </h1>
        <p className="mt-4 text-muted">
          Safety, speed, cost, and how Undercut compares: straight answers, no sales call
          required. Still have a question? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cut hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-14">
        {GROUPS.map((group) => (
          <div key={group.title} className="mb-12 last:mb-0">
            <h2 className="text-xl font-bold mb-6">{group.title}</h2>
            <div className="space-y-6">
              {group.items.map((it) => (
                <div key={it.q}>
                  <p className="font-semibold">{it.q}</p>
                  <p className="text-sm text-muted mt-1">{it.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <CtaBanner
        heading="Win the sale without losing margin."
        sub="14-day Starter trial, no card. Undercut competitors automatically, never below your minimum."
      />
      <Footer />
      <JsonLd data={ld} />
    </div>
  )
}
