import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/**
 * Editorial section header with optional eyebrow label, serif display title, and constrained intro copy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  as = 'h2',
  className,
}: SectionHeadingProps) {
  const Tag = as
  const isDark = tone === 'dark'

  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow ? (
        <p className={cn('editorial-eyebrow mb-4', isDark ? 'text-copper-light' : 'text-copper-ink')}>
          {eyebrow}
        </p>
      ) : null}
      <Tag className={cn('display-2', isDark ? 'text-on-dark' : 'text-ink')}>{title}</Tag>
      {description ? (
        <p
          className={cn(
            'mt-5 max-w-[64ch] text-base leading-7 md:text-lg md:leading-8',
            isDark ? 'text-on-dark-muted' : 'text-ink-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
