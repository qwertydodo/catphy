import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Link.module.css'

type LinkVariant = 'text' | 'unstyled'
type LinkSize = 'sm' | 'body'

type NavLinkClassName = (state: {
  isActive: boolean
  isPending: boolean
  isTransitioning: boolean
}) => string

type CommonProps = {
  children: ReactNode
  variant?: LinkVariant
  size?: LinkSize
  'aria-label'?: string
}

type InternalLinkProps = CommonProps & {
  to: string
  href?: never
  end?: boolean
  className?: string | NavLinkClassName
  target?: never
  rel?: never
}

type ExternalLinkProps = CommonProps & {
  to?: never
  href: string
  end?: never
  className?: string
  target?: string
  rel?: string
}

type LinkProps = InternalLinkProps | ExternalLinkProps

const isExternalHref = (href: string) => /^(https?:|mailto:)/.test(href)

export const Link = ({
  variant = 'text',
  size = 'body',
  className,
  children,
  to,
  href,
  end,
  target,
  rel,
  'aria-label': ariaLabel,
}: LinkProps) => {
  const variantClass =
    variant === 'text' ? clsx(styles.text, size === 'sm' && styles.sm) : undefined

  if (to !== undefined) {
    return (
      <NavLink
        to={to}
        end={end}
        aria-label={ariaLabel}
        className={(state) =>
          clsx(variantClass, typeof className === 'function' ? className(state) : className)
        }
      >
        {children}
      </NavLink>
    )
  }

  const resolvedTarget = target ?? (href && isExternalHref(href) ? '_blank' : undefined)
  const resolvedRel = rel ?? (href && isExternalHref(href) ? 'noreferrer' : undefined)

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      aria-label={ariaLabel}
      className={clsx(variantClass, className as string | undefined)}
    >
      {children}
    </a>
  )
}
