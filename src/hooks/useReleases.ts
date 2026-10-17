import { useEffect, useState } from 'react'
import { fetchReleases, type Release } from '../lib/github'

type ReleasesState =
  | { status: 'loading' }
  | { status: 'success', releases: Release[] }
  | { status: 'error', error: string }

export function useReleases (): ReleasesState {
  const [state, setState] = useState<ReleasesState>({ status: 'loading' })

  useEffect(() => {
    let active = true
    fetchReleases()
      .then((releases) => { if (active) setState({ status: 'success', releases }) })
      .catch((error: unknown) => {
        if (active) setState({ status: 'error', error: String(error) })
      })

    return () => { active = false }
  }, [])

  return state
}
