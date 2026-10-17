import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

function ScrollManager () {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

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
