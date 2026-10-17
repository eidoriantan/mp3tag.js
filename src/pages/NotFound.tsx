import { Link } from 'react-router'
import { House } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound () {
  usePageMeta('404 Not Found')

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">404 Not Found</h1>
      <p className="mt-4 text-muted">Sorry, an error has occured. Requested page was not found!</p>
      <Link to="/" className="btn btn-primary mt-8">
        <House className="size-4" aria-hidden="true" />
        Home
      </Link>
    </div>
  )
}
