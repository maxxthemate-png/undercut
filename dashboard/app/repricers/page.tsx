import CollectionIndex from '../_components/CollectionIndex'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'eBay Repricers by Category — Undercut',
  'Category-specific eBay repricing playbooks: trading cards, sneakers, auto parts, video games, books, and electronics.',
  '/repricers'
)

export default function Page() {
  return <CollectionIndex collection="repricers" h1='Repricing by Category' intro='What automated repricing looks like for your niche — trading cards, sneakers, electronics, books, and more.' />
}
