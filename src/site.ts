// Page metadata shared by the app and the build-time SEO plugin
// (plugins/seo.ts), so this file must stay free of DOM and JSX code.

import { SITE_NAME } from './config.ts'

export const SITE_URL = 'https://mp3tag.js.org'

const BASE_KEYWORDS = 'mp3, id3, audio, tag, edit, write'

export interface PageMeta {
  /** Route path in the app */
  path: string
  /** Omitted for the home page, which is titled with the site name only */
  title?: string
  description: string
  keywords: string
  /** Files whose last commit date is used as the page's sitemap <lastmod> */
  sources: string[]
}

export const pages: PageMeta[] = [
  {
    path: '/',
    description: 'mp3tag.js is an open-source JavaScript library used to edit the metadata of audio files.',
    keywords: BASE_KEYWORDS,
    sources: ['src/pages/Home.tsx']
  },
  {
    path: '/docs',
    title: 'Installation',
    description: 'JavaScript library documentations page. How to install the library',
    keywords: `${BASE_KEYWORDS}, documentations, docs, install, installation`,
    sources: ['src/pages/docs/Installation.tsx']
  },
  {
    path: '/docs/usage',
    title: 'Usage',
    description: 'JavaScript library documentations page. How to use the library',
    keywords: `${BASE_KEYWORDS}, documentations, docs, usage`,
    sources: ['src/pages/docs/Usage.tsx']
  },
  {
    path: '/docs/mp3tag',
    title: 'MP3Tag',
    description: 'JavaScript library documentations page. mp3tag.js exported class documentation',
    keywords: `${BASE_KEYWORDS}, documentations, docs, mp3tag`,
    sources: ['src/pages/docs/MP3TagClass.tsx', 'src/pages/docs/data/mp3tag.tsx']
  },
  {
    path: '/docs/frames',
    title: 'Tags and Frames',
    description: 'JavaScript library documentations page. Learn more about the frames objects in this library',
    keywords: `${BASE_KEYWORDS}, documentations, docs, tags, frames`,
    sources: ['src/pages/docs/Frames.tsx', 'src/pages/docs/data/frames.tsx']
  },
  {
    path: '/downloads',
    title: 'Downloads',
    description: 'JavaScript library download page',
    keywords: `${BASE_KEYWORDS}, downloads`,
    sources: ['src/pages/Downloads.tsx']
  },
  {
    path: '/editor',
    title: 'Editor',
    description: 'Edit your audio files easily with this mp3tagger!',
    keywords: `${BASE_KEYWORDS}, editor, demo, online`,
    sources: ['src/pages/Editor.tsx']
  }
]

export function getPage (path: string): PageMeta {
  const normalized = path.replace(/\/+$/, '') || '/'
  const page = pages.find((page) => page.path === normalized)
  if (page === undefined) throw new Error(`No page metadata for ${path}`)
  return page
}

export function documentTitle (title?: string): string {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}

/**
 * Where a page's HTML is written in dist/ and its canonical URL path.
 *
 * GitHub Pages serves `docs/usage.html` at `/docs/usage`, but a path that is
 * also a folder (`/docs`, which holds the other doc pages) is redirected to
 * `/docs/` and served from `docs/index.html`.
 */
export function pageOutput (path: string): { file: string, url: string } {
  if (path === '/') return { file: 'index.html', url: '/' }

  const folder = pages.some((page) => page.path.startsWith(`${path}/`))
  return folder
    ? { file: `${path.slice(1)}/index.html`, url: `${path}/` }
    : { file: `${path.slice(1)}.html`, url: path }
}
