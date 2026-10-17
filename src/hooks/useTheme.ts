import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const query = '(prefers-color-scheme: dark)'

function storedTheme (): Theme | null {
  try {
    const theme = localStorage.getItem('theme')
    return theme === 'light' || theme === 'dark' ? theme : null
  } catch {
    return null
  }
}

function systemTheme (): Theme {
  return matchMedia(query).matches ? 'dark' : 'light'
}

/**
 * Follows the system color scheme until the user picks a theme with the
 * toggle, which is then remembered in localStorage.
 */
export function useTheme (): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => storedTheme() ?? systemTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const media = matchMedia(query)
    const onChange = (): void => {
      if (storedTheme() === null) setTheme(systemTheme())
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem('theme', next) } catch {}
      return next
    })
  }, [])

  return [theme, toggle]
}
