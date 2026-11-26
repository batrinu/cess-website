import type { HTMLAttributes } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

export interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
}

/**
 * Scroll-triggered reveal wrapper honoring reduced-motion preferences and optional transition delay.
 */
export default function Reveal({ children, className, delay = 0, style, ...props }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('reveal', isVisible && 'is-visible', className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...props}
    >
      {children}
    </div>
  )
}
