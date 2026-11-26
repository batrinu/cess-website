import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const tones = {
  alabaster: 'bg-alabaster text-ink',
  vellum: 'bg-vellum text-ink',
  navy: 'bg-navy text-on-dark',
} as const

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: keyof typeof tones
}

/**
 * Institutional page section with surface tone, text contrast, and focus-surface metadata.
 */
export default function Section({ className, tone = 'alabaster', ...props }: SectionProps) {
  return (
    <section
      data-surface={tone === 'navy' ? 'dark' : 'light'}
      className={cn('section-padding', tones[tone], className)}
      {...props}
    />
  )
}
