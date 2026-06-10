import CollectionIndex from '../_components/CollectionIndex'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'eBay Repricer Alternatives & Comparisons — Undercut',
  "Side-by-side comparisons of eBay repricing tools: features, pricing, and where the floor-first approach wins (and where it doesn't).",
  '/alternatives'
)

export default function Page() {
  return <CollectionIndex collection="alternatives" h1='Repricer Comparisons & Alternatives' intro='How Undercut compares to StreetPricer, RepricerExpress, Informed.co and other repricing tools — honestly, line by line.' />
}
