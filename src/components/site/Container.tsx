import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * Centered editorial content container constrained to the site maximum width.
 */
export default function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('site-container', className)} {...props} />
}
