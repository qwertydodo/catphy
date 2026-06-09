import { clsx } from 'clsx'
import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = ({ label, error, className, id, ...props }: InputProps) => (
  <div className={styles.wrapper}>
    {label && (
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    )}
    <input
      id={id}
      className={clsx(styles.input, error && styles.inputError, className)}
      {...props}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
)
