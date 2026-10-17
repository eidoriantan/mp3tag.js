import { useEffect } from 'react'
import { SITE_URL, documentTitle, pageOutput, type PageMeta } from '../site'

/**
 * Keeps the document's title, description, and canonical URL in sync during
 * client-side navigation. The initial HTML for each route already has them,
 * written at build time by plugins/seo.ts.
 */
export function usePageMeta (page: PageMeta | { title: string }): void {
  useEffect(() => {
    document.title = documentTitle(page.title)
    if (!('path' in page)) return

    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE_URL + pageOutput(page.path).url)
  }, [page])
}
