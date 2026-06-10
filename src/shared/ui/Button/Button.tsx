import { clsx } from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
}

export const Button = ({
  variant = 'primary',
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(styles.button, styles[variant], className)}
    disabled={disabled || loading}
    aria-busy={loading}
    {...props}
  >
    {loading ? <span className={styles.spinner} aria-hidden="true" /> : children}
  </button>
)
