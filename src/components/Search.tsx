import { forwardRef, useId, useMemo, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router'
import { Search as SearchIcon } from 'lucide-react'
import { search, type SearchItem } from '../lib/search'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
const SHORTCUT_LABEL = isMac ? '⌘K' : 'Ctrl K'

interface SearchProps {
  className?: string
  autoFocus?: boolean
  /** Called after navigating to a result or pressing Escape */
  onDone?: () => void
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search ({ className = '', autoFocus = false, onDone }, ref) {
  const navigate = useNavigate()
  const listId = useId()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(0)

  const results = useMemo(() => search(query), [query])
  const open = focused && query.trim() !== ''

  function go (item: SearchItem): void {
    navigate(item.to)
    setQuery('')
    ;(document.activeElement as HTMLElement | null)?.blur()
    onDone?.()
  }

  function onKeyDown (event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (results.length === 0) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive((current) => (current + step + results.length) % results.length)
    } else if (event.key === 'Enter') {
      const item = results[active]
      if (item) go(item)
    } else if (event.key === 'Escape') {
      setQuery('')
      event.currentTarget.blur()
      onDone?.()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        ref={ref}
        type="search"
        value={query}
        autoFocus={autoFocus}
        onChange={(event) => { setQuery(event.target.value); setActive(0) }}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); onDone?.() }}
        onKeyDown={onKeyDown}
        placeholder="Search docs..."
        aria-label="Search documentations"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
        className="h-8 w-full rounded-lg border border-border bg-surface pr-14 pl-9 text-sm text-fg transition-colors placeholder:text-muted focus:border-accent focus:bg-bg focus:ring-3 focus:ring-accent/15 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {query === '' && (
        <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border border-border bg-bg px-1.5 font-sans text-[11px] text-muted">
          {SHORTCUT_LABEL}
        </kbd>
      )}

      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-full min-w-80 overflow-hidden rounded-xl border border-border bg-bg shadow-xl shadow-black/5 dark:shadow-black/40">
          {results.length === 0
            ? <p className="px-4 py-6 text-center text-sm text-muted">No results for "{query.trim()}"</p>
            : (
              <ul id={listId} role="listbox" aria-label="Search results" className="max-h-96 overflow-y-auto p-1.5">
                {results.map((item, index) => (
                  <li
                    key={item.to}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={index === active}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseMove={() => setActive(index)}
                    onClick={() => go(item)}
                    className={`cursor-pointer rounded-lg px-3 py-2 ${index === active ? 'bg-accent-soft' : ''}`}
                  >
                    <div className="flex items-baseline gap-2 text-sm">
                      <span className={`${item.code ? 'font-mono font-medium' : 'font-medium'} ${index === active ? 'text-accent' : 'text-fg'}`}>{item.label}</span>
                      {item.detail && <span className="truncate text-muted">{item.detail}</span>}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted">{item.context}</div>
                  </li>
                ))}
              </ul>
              )}
        </div>
      )}
    </div>
  )
})
