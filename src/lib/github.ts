import { REPOSITORY } from '../config'

export interface ReleaseAsset {
  name: string
  browser_download_url: string
}

export interface Release {
  id: number
  name: string
  tag_name: string
  html_url: string
  zipball_url: string
  published_at: string
  assets: ReleaseAsset[]
}

const CACHE_KEY = 'releases'
const CACHE_TTL = 10 * 60 * 1000
let pending: Promise<Release[]> | null = null

function readCache (): Release[] | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached === null) return null

    const { time, releases } = JSON.parse(cached) as { time: number, releases: Release[] }
    return Date.now() - time < CACHE_TTL ? releases : null
  } catch {
    return null
  }
}

function writeCache (releases: Release[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), releases }))
  } catch {}
}

/**
 * Fetches the last 5 releases. Results are shared between callers and cached
 * per session to stay under GitHub's unauthenticated rate limit.
 */
export function fetchReleases (): Promise<Release[]> {
  const cached = readCache()
  if (cached !== null) return Promise.resolve(cached)

  pending ??= fetch(`https://api.github.com/repos/${REPOSITORY}/releases?per_page=5`, {
    headers: { Accept: 'application/vnd.github+json' }
  }).then(async (response) => {
    if (!response.ok) throw new Error(`GitHub responded with ${response.status}`)
    const releases = await response.json() as Release[]
    writeCache(releases)
    return releases
  }).finally(() => {
    pending = null
  })

  return pending
}
