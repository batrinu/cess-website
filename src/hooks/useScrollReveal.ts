import { useEffect, useRef, useState } from 'react'

/**
 * Observe an element once as it enters the viewport for scroll reveal transitions.
 * Immediately returns visible when reduced motion is enabled or IntersectionObserver is unavailable.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    )
  })

  useEffect(() => {
    if (isVisible) return

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
