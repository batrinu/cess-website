import { useEffect, useRef, useState } from 'react'

/**
 * Observe an element once as it enters the viewport for scroll reveal transitions.
 * Keeps initial state hydration-safe (false) and immediately reveals on mount when
 * reduced motion is enabled or IntersectionObserver is unavailable.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isVisible, threshold])

  return { ref, isVisible }
}
