import { Code, ExternalLink, Package } from 'lucide-react'
import { REPOSITORY_URL } from '../config'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReleases } from '../hooks/useReleases'

const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' })

export default function Downloads () {
  usePageMeta('Downloads', 'JavaScript library download page')
  const releases = useReleases()

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">mp3tag.js Releases</h1>
      <p className="mt-3 leading-7 text-muted">
        Showing the last 5 releases of the project. You can visit the release page
        of each release for the changes and/or fixes.
      </p>

      <div className="mt-10 divide-y divide-border rounded-2xl border border-border">
        {releases.status === 'loading' && Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center justify-between gap-4 p-5" aria-hidden="true">
            <div className="space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-28 animate-pulse rounded bg-surface-2" />
            </div>
            <div className="h-9 w-56 animate-pulse rounded-lg bg-surface-2" />
          </div>
        ))}

        {releases.status === 'error' && (
          <div className="p-8 text-center">
            <p className="font-medium">Couldn't load the releases right now.</p>
            <p className="mt-1 text-sm text-muted">GitHub may be rate limiting requests. You can view them on GitHub instead.</p>
            <a href={`${REPOSITORY_URL}/releases`} className="btn btn-secondary mt-5">
              <ExternalLink className="size-4" aria-hidden="true" />
              View releases on GitHub
            </a>
          </div>
        )}

        {releases.status === 'success' && releases.releases.map((release, index) => {
          const asset = release.assets[0]
          return (
            <div key={release.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between" itemScope itemType="http://schema.org/DataDownload">
              <div>
                <div className="flex items-center gap-2">
                  <a href={release.html_url} className="font-medium hover:text-accent" itemProp="url">
                    <span itemProp="name">{release.name}</span>
                    <span className="hidden" itemProp="version">{release.tag_name}</span>
                  </a>
                  {index === 0 && (
                    <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent" title="Latest release">Latest</span>
                  )}
                </div>
                <div className="mt-1 text-sm text-muted">
                  Published <time dateTime={release.published_at} itemProp="uploadDate">{dateFormat.format(new Date(release.published_at))}</time>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a href={release.zipball_url} download={release.name} className="btn btn-secondary">
                  <Code className="size-4" aria-hidden="true" />
                  Source Codes
                </a>
                {asset && (
                  <a href={asset.browser_download_url} download={asset.name} className="btn btn-primary" itemProp="contentUrl">
                    <Package className="size-4" aria-hidden="true" />
                    Built Package
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
