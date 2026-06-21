import Nav from './Nav'
import Footer from './Footer'

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <article className="max-w-2xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        <p className="text-sm text-muted mt-2 mb-8">Last updated: {updated}</p>
        <div className="space-y-6 text-[15px] leading-relaxed text-muted [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-cut">
          {children}
        </div>
      </article>
      <Footer />
    </div>
  )
}
