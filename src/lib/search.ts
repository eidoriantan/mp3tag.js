import { docPages } from '../pages/docs/pages'

export interface SearchItem {
  /** Route and anchor to navigate to */
  to: string
  label: string
  detail?: string
  /** Where the item lives, e.g. "Tags and Frames › tags.v2 ID3v2 Frames" */
  context: string
  /** True for code identifiers such as frame IDs and member names */
  code: boolean
  text: string
}

const index: SearchItem[] = docPages.flatMap((page) => [
  { to: page.path, label: page.title, context: 'Documentations', code: false, text: page.title },
  ...page.outline.flatMap((section) => [
    {
      to: `${page.path}#${section.id}`,
      label: section.title,
      context: page.title,
      code: false,
      text: section.title
    },
    ...section.entries.map((entry) => ({
      to: `${page.path}#${entry.id}`,
      label: entry.label,
      detail: entry.detail,
      context: `${page.title} › ${section.title}`,
      code: true,
      text: [entry.label, entry.detail, entry.keywords, section.title].filter(Boolean).join(' ')
    }))
  ])
]).map((item) => ({ ...item, text: item.text.toLowerCase() }))

/** Lower is better: exact label, label prefix, word prefix, then substring */
function rank (item: SearchItem, query: string): number {
  const label = item.label.toLowerCase()
  if (label === query || label.split('/').includes(query)) return 0
  if (label.startsWith(query)) return 1
  if (item.text.split(/[\s./-]+/).some((word) => word.startsWith(query))) return 2
  return 3
}

/** Finds items containing every word of the query, best matches first */
export function search (query: string, limit = 12): SearchItem[] {
  const normalized = query.trim().toLowerCase()
  if (normalized === '') return []

  const words = normalized.split(/\s+/)
  return index
    .filter((item) => words.every((word) => item.text.includes(word)))
    .map((item, order) => ({ item, order, rank: rank(item, normalized) }))
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
    .slice(0, limit)
    .map(({ item }) => item)
}
