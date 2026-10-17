import { useEffect, useState } from 'react'

/** Height of the sticky header plus some breathing room, in pixels */
const OFFSET = 96

/**
 * Returns the id of the last element in `ids` that has scrolled past the top
 * of the viewport, i.e. the one the reader is currently looking at.
 */
export function useActiveId (ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(' ')

  useEffect(() => {
    let frame = 0
    const update = (): void => {
      frame = 0
      let current: string | null = null
      for (const id of key.split(' ')) {
        const element = document.getElementById(id)
        if (element === null) continue
        if (element.getBoundingClientRect().top - OFFSET > 1) break
        current = id
      }

      // At the very bottom, the last entries may never reach the top
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (bottom) {
        const visible = key.split(' ').filter((id) => {
          const top = document.getElementById(id)?.getBoundingClientRect().top
          return top !== undefined && top < window.innerHeight
        })
        current = visible.at(-1) ?? current
      }

      setActive(current)
    }

    const schedule = (): void => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [key])

  return active
}
