import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

function ScrollManager () {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()

        // Briefly highlights the target, since :target doesn't update on client-side navigation
        target.setAttribute('data-highlight', '')
        const timeout = setTimeout(() => target.removeAttribute('data-highlight'), 1600)
        return () => {
          clearTimeout(timeout)
          target.removeAttribute('data-highlight')
        }
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return null
}

export function Layout ({ footer = true }: { footer?: boolean }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollManager />
      <Header />
      <main className="flex flex-1 flex-col">
        <Suspense fallback={<div className="flex-1" />}>
          <Outlet />
        </Suspense>
      </main>
      {footer && <Footer />}
    </div>
  )
}
