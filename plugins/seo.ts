import { execFileSync } from 'node:child_process'
import type { Plugin } from 'vite'
import { SITE_NAME } from '../src/config.ts'
import { SITE_URL, documentTitle, getPage, pageOutput, pages, type PageMeta } from '../src/site.ts'

/** Placeholder in index.html replaced with each page's SEO tags */
const MARKER = '<!-- seo -->'

function escape (value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderTags (page: PageMeta): string {
  const title = documentTitle(page.title)
  const url = SITE_URL + pageOutput(page.path).url
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': page.path === '/' ? 'WebSite' : 'WebPage',
    name: title,
    headline: title,
    description: page.description,
    url,
    ...(page.path === '/' ? {} : { isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` } })
  }

  return [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(page.description)}">`,
    `<meta name="keywords" content="${escape(page.keywords)}">`,
    `<link rel="canonical" href="${escape(url)}">`,
    `<meta property="og:title" content="${escape(title)}">`,
    `<meta property="og:description" content="${escape(page.description)}">`,
    `<meta property="og:url" content="${escape(url)}">`,
    `<meta name="twitter:title" content="${escape(title)}">`,
    `<meta name="twitter:description" content="${escape(page.description)}">`,
    // "<" is escaped so the JSON can never close the script tag early
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`
  ].join('\n  ')
}

/** Date of the last commit touching any of the files, or null outside git */
function lastModified (files: string[]): string | null {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], { encoding: 'utf8' }).trim()
    return date === '' ? null : date
  } catch {
    return null
  }
}

function renderSitemap (): string {
  const urls = pages.map((page) => {
    const lastmod = lastModified(page.sources)
    return [
      '  <url>',
      `    <loc>${escape(SITE_URL + pageOutput(page.path).url)}</loc>`,
      ...(lastmod === null ? [] : [`    <lastmod>${lastmod}</lastmod>`]),
      '  </url>'
    ].join('\n')
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    ''
  ].join('\n')
}

function renderRobots (): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
}

/**
 * Writes an HTML file per route with that page's title, description,
 * canonical URL, and social tags, so crawlers and link previews get the
 * right metadata (and a 200 status) without running JavaScript. Also writes
 * sitemap.xml and robots.txt from the same page list in src/site.ts.
 */
export function seo (): Plugin {
  let building = false

  return {
    name: 'mp3tag-seo',
    enforce: 'post',

    configResolved (config) {
      building = config.command === 'build'
    },

    transformIndexHtml (html, context) {
      if (!html.includes(MARKER)) throw new Error(`index.html is missing the ${MARKER} marker`)

      // Builds keep the marker so generateBundle can render every page from it
      if (building) return html

      let page: PageMeta
      try {
        page = getPage(new URL(context.originalUrl ?? context.path, SITE_URL).pathname)
      } catch {
        page = getPage('/')
      }
      return html.replace(MARKER, renderTags(page))
    },

    generateBundle (_, bundle) {
      const index = bundle['index.html']
      if (index?.type !== 'asset') return this.error('index.html was not found in the bundle')

      const template = String(index.source)
      for (const page of pages) {
        const html = template.replace(MARKER, renderTags(page))
        const { file } = pageOutput(page.path)

        if (file === 'index.html') index.source = html
        else this.emitFile({ type: 'asset', fileName: file, source: html })
      }

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() })
    }
  }
}
