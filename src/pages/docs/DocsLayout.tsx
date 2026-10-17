import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { Pencil } from 'lucide-react'
import { SITE_EDIT_URL } from '../../config'
import { usePageMeta } from '../../hooks/usePageMeta'
import { getPage } from '../../site'
import { OnThisPage, OnThisPageCollapsible } from './OnThisPage'
import { docPages } from './pages'

export function DocsLayout () {
  const { pathname } = useLocation()
  const normalized = pathname.replace(/\/+$/, '') || '/'
  const page = docPages.find((doc) => doc.path === normalized) ?? docPages[0]

  usePageMeta(getPage(page.path))

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row md:gap-10 md:py-12">
      <aside className="md:w-56 md:shrink-0">
        <nav className="md:sticky md:top-24" aria-label="Documentations">
          <p className="mb-3 hidden text-xs font-semibold tracking-wide text-muted uppercase md:block">Documentations</p>

          <ul className="-mx-4 flex gap-1 overflow-x-auto border-b border-border px-4 pb-3 md:mx-0 md:flex-col md:gap-0.5 md:overflow-visible md:border-0 md:p-0">
            {docPages.map((doc) => (
              <li key={doc.path} className="shrink-0">
                <NavLink
                  to={doc.path}
                  end
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-1.5 text-sm transition-colors ${isActive ? 'bg-accent-soft font-medium text-accent' : 'text-muted hover:bg-surface hover:text-fg'}`}
                >
                  {doc.title}
                </NavLink>

                {doc === page && (
                  <ul className="mt-1 mb-2 ml-3 hidden border-l border-border md:block">
                    {doc.outline.map((section) => (
                      <li key={section.id}>
                        <Link to={`${doc.path}#${section.id}`} className="-ml-px block border-l border-transparent py-1 pl-3 text-[13px] text-muted transition-colors hover:border-fg hover:text-fg">
                          {section.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <article className="min-w-0 flex-1">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
          <a href={`${SITE_EDIT_URL}/src/pages/docs/${page.file}`} className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            <Pencil className="size-3.5" aria-hidden="true" />
            Improve this page
          </a>
        </header>

        <div className="xl:hidden">
          <OnThisPageCollapsible key={page.path} page={page} />
        </div>

        <Outlet />
      </article>

      <aside className="hidden w-56 shrink-0 xl:block">
        <OnThisPage page={page} />
      </aside>
    </div>
  )
}
