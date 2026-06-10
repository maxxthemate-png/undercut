import CollectionIndex from '../_components/CollectionIndex'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'eBay Repricing Guides — Undercut',
  'Every Undercut guide to eBay repricing: price floors, fees, strategy by category, and how to compete on price without losing margin.',
  '/guides'
)

export default function Page() {
  return <CollectionIndex collection="guides" h1='eBay Repricing Guides' intro='Practical, no-fluff guides to repricing, price floors, fees, and winning the sale on eBay without racing to the bottom.' />
}
