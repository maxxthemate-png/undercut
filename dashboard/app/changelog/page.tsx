import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import CtaBanner from '../_components/CtaBanner'
import { changelog } from '../_content/changelog'
import { pageMeta, DEFAULT_CTA } from '../_content/shared'

export const metadata = pageMeta(
  'Changelog — Undercut',
  'Everything shipping in Undercut, the floor-first eBay repricer: new tools, features, and improvements — updated as they go live by the founder.',
  '/changelog'
)

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <section className="max-w-2xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">Changelog</h1>
        <p className="mt-4 text-gray-600 text-center">Built in the open. Everything user-visible lands here.</p>
        <ol className="mt-10 space-y-6 border-l-2 border-gray-100 pl-6">
          {changelog.map((e, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600" />
              <p className="text-xs text-gray-400">{e.date}</p>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-gray-600 mt-1">{e.blurb}</p>
            </li>
          ))}
        </ol>
      </section>
      <CtaBanner heading={DEFAULT_CTA.heading} sub={DEFAULT_CTA.sub} />
      <Footer />
    </div>
  )
}
