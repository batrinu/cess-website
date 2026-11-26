import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/lib/utils'

export type ActionVariant = 'primary' | 'secondary' | 'light' | 'light-outline'

const variantStyles: Record<ActionVariant, string> = {
  primary: 'border-navy bg-navy text-on-dark hover:bg-navy-elevated hover:border-navy-elevated',
  secondary: 'border-navy bg-transparent text-navy hover:bg-navy hover:text-on-dark',
  light: 'border-on-dark bg-on-dark text-navy hover:bg-vellum hover:border-vellum',
  'light-outline': 'border-on-dark/55 bg-transparent text-on-dark hover:bg-on-dark hover:text-navy',
}

/**
 * Shared button/link styles for institutional primary and secondary calls to action.
 */
export function actionClasses(variant: ActionVariant = 'primary', className?: string) {
  return cn(
    'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[2px] border px-7 py-3.5 text-center font-body text-[0.8125rem] font-semibold uppercase leading-5 tracking-[0.08em] transition-colors duration-200',
    variantStyles[variant],
    className,
  )
}

type BaseActionProps = {
  variant?: ActionVariant
  className?: string
  children: ReactNode
}

type InternalActionProps = BaseActionProps &
  Omit<LinkProps, keyof BaseActionProps | 'to'> & {
    to: string
    href?: never
  }

type ExternalActionProps = BaseActionProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseActionProps | 'href'> & {
    href: string
    to?: never
    target?: string
    rel?: string
  }

export type ActionLinkProps = InternalActionProps | ExternalActionProps

/**
 * Navigation call-to-action rendering either a React Router Link (`to`) or an anchor (`href`).
 */
export default function ActionLink(props: ActionLinkProps) {
  if ('href' in props && props.href !== undefined) {
    const { variant = 'primary', className, children, href, target, rel, ...anchorProps } = props
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={actionClasses(variant, className)}
        {...anchorProps}
      >
        {children}
      </a>
    )
  }

  const { variant = 'primary', className, children, to, ...linkProps } = props
  return (
    <Link to={to} className={actionClasses(variant, className)} {...linkProps}>
      {children}
    </Link>
  )
}
