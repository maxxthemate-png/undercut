import CollectionIndex from '../_components/CollectionIndex'
import { pageMeta } from '../_content/shared'

export const metadata = pageMeta(
  'eBay Repricing Glossary — Undercut',
  'Definitions of eBay repricing terms: price floor, final value fee, sell-through rate, undercutting, and more — in plain English.',
  '/glossary'
)

export default function Page() {
  return <CollectionIndex collection="glossary" h1='eBay Repricing Glossary' intro='Plain-English definitions of the terms that matter when you price competitively on eBay.' />
}
