import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Download, Menu, Search as SearchIcon, X } from 'lucide-react'
import { REPOSITORY_URL, SITE_NAME } from '../config'
import { useReleases } from '../hooks/useReleases'
import { GithubIcon } from './GithubIcon'
import { Search } from './Search'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { to: '/docs', label: 'Documentations' },
  { to: '/editor', label: 'Editor' },
  { to: '/downloads', label: 'Downloads' }
]

function DownloadButton ({ className = '' }: { className?: string }) {
  const releases = useReleases()
  const latest = releases.status === 'success' ? releases.releases[0] : undefined
  const asset = latest?.assets[0]

  if (latest === undefined || asset === undefined) {
    return (
      <Link to="/downloads" className={`btn btn-primary h-8 px-3 ${className}`}>
        <Download className="size-4" aria-hidden="true" />
        <span>Download</span>
      </Link>
    )
  }

  return (
    <a href={asset.browser_download_url} download className={`btn btn-primary h-8 px-3 ${className}`}>
      <Download className="size-4" aria-hidden="true" />
      <span>Download {latest.tag_name}</span>
    </a>
  )
}

export function Header () {
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const wide = location.pathname.startsWith('/docs')

  useEffect(() => setOpen(false), [location.pathname])

  // Ctrl/Cmd+K or "/" focuses the search from anywhere
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      const target = event.target as HTMLElement
      const typing = target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      const shortcut = (event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)
      if (!shortcut) return

      event.preventDefault()
      const input = searchInput.current
      if (input !== null && input.offsetParent !== null) input.focus()
      else {
        setOpen(false)
        setSearching(true)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-1.5 text-sm transition-colors ${isActive ? 'text-fg font-medium' : 'text-muted hover:text-fg'}`

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className={`mx-auto flex h-14 items-center gap-2 px-4 sm:px-6 ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
        <Link to="/" className="mr-4 flex items-center gap-2.5 font-semibold tracking-tight">
          <img src="/images/logo.png" alt="" width="24" height="24" className="size-6" />
          <span>{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Main">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Search ref={searchInput} className="mr-2 hidden w-56 lg:block xl:w-64" />
          <button
            type="button"
            className="btn btn-ghost btn-icon lg:hidden"
            aria-label="Search documentations"
            aria-expanded={searching}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => { setOpen(false); setSearching(!searching) }}
          >
            <SearchIcon className="size-[18px]" />
          </button>
          <a href={REPOSITORY_URL} className="btn btn-ghost btn-icon" aria-label="GitHub repository" title="GitHub repository">
            <GithubIcon className="size-[18px]" />
          </a>
          <ThemeToggle />
          <DownloadButton className="ml-2 hidden md:inline-flex" />
          <button
            type="button"
            className="btn btn-ghost btn-icon md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => { setSearching(false); setOpen(!open) }}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {searching && (
        <div className="border-t border-border px-4 py-3 lg:hidden">
          <Search autoFocus onDone={() => setSearching(false)} />
        </div>
      )}

      {open && (
        <nav id="mobile-nav" className="border-t border-border px-4 py-3 md:hidden" aria-label="Main">
          <div className="flex flex-col">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>
            ))}
          </div>
          <DownloadButton className="mt-3 w-full" />
        </nav>
      )}
    </header>
  )
}
