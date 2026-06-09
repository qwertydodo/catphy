import { clsx } from 'clsx'
import type { ElementType, HTMLAttributes } from 'react'
import styles from './Text.module.css'

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'sm' | 'caption'

const variantElement: Record<TextVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  sm: 'p',
  caption: 'span',
}

type TextProps = HTMLAttributes<HTMLElement> & {
  variant: TextVariant
  as?: ElementType
  muted?: boolean
}

export const Text = ({ variant, as, muted, className, children, ...props }: TextProps) => {
  const Tag = as ?? variantElement[variant]
  return (
    <Tag className={clsx(styles[variant], muted && styles.muted, className)} {...props}>
      {children}
    </Tag>
  )
}
