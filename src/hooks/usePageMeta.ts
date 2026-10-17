import { useEffect } from 'react'
import { SITE_NAME } from '../config'

export function usePageMeta (title?: string, description?: string): void {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
