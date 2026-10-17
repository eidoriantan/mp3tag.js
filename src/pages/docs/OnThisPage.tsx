import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { useActiveId } from '../../hooks/useActiveId'
import type { DocPage } from './pages'

function Outline ({ page, active, onNavigate }: { page: DocPage, active: string | null, onNavigate?: () => void }) {
  return (
    <ul className="space-y-3 text-[13px]">
      {page.outline.map((section) => {
        const inSection = section.id === active || section.entries.some((entry) => entry.id === active)
        return (
          <li key={section.id}>
            <Link
              to={`${page.path}#${section.id}`}
              onClick={onNavigate}
              data-active={section.id === active || undefined}
              className={`block py-0.5 font-medium transition-colors ${inSection ? 'text-fg' : 'text-muted hover:text-fg'}`}
            >
              {section.title}
            </Link>

            {section.entries.length > 0 && (
              <ul className="mt-1 border-l border-border">
                {section.entries.map((entry) => {
                  const isActive = entry.id === active
                  return (
                    <li key={entry.id}>
                      <Link
                        to={`${page.path}#${entry.id}`}
                        onClick={onNavigate}
                        data-active={isActive || undefined}
                        aria-current={isActive ? 'location' : undefined}
                        className={`-ml-px flex items-baseline gap-2 border-l py-1 pl-3 transition-colors ${isActive ? 'border-accent text-accent' : 'border-transparent text-muted hover:border-fg hover:text-fg'}`}
                      >
                        <span className="shrink-0 font-mono text-xs">{entry.label}</span>
                        {entry.detail && <span className={`truncate text-xs ${isActive ? 'text-accent/80' : 'text-muted/80'}`}>{entry.detail}</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function useOutlineIds (page: DocPage): string[] {
  return useMemo(() => page.outline.flatMap((section) => [section.id, ...section.entries.map((entry) => entry.id)]), [page])
}

/** Sticky outline shown to the right of the content on wide screens */
export function OnThisPage ({ page }: { page: DocPage }) {
  const active = useActiveId(useOutlineIds(page))
  const container = useRef<HTMLDivElement>(null)

  // Keeps the active item visible within the sidebar's own scroll area
  useEffect(() => {
    const box = container.current
    const item = box?.querySelector<HTMLElement>('[data-active]')
    if (!box || !item) return

    // The container is positioned, so offsetTop is relative to it
    const top = item.offsetTop
    if (top < box.scrollTop + 24 || top > box.scrollTop + box.clientHeight - 48) {
      box.scrollTo({ top: top - box.clientHeight / 3 })
    }
  }, [active])

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">On this page</p>
      <div ref={container} className="relative max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain pr-2 pb-4">
        <Outline page={page} active={active} />
      </div>
    </nav>
  )
}

/** Collapsible outline shown under the page title on narrower screens */
export function OnThisPageCollapsible ({ page }: { page: DocPage }) {
  const active = useActiveId(useOutlineIds(page))
  const details = useRef<HTMLDetailsElement>(null)

  return (
    <details ref={details} className="group mb-8 rounded-xl border border-border">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-sm font-medium select-none [&::-webkit-details-marker]:hidden">
        <ChevronRight className="size-4 text-muted transition-transform group-open:rotate-90" aria-hidden="true" />
        On this page
      </summary>
      <div className="max-h-[60dvh] overflow-y-auto border-t border-border px-4 py-3">
        <Outline page={page} active={active} onNavigate={() => details.current?.removeAttribute('open')} />
      </div>
    </details>
  )
}
