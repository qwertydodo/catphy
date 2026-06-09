import { clsx } from 'clsx'
import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'
import styles from './Input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = ({ label, error, className, id, ...props }: InputProps) => {
  const generatedId = useId()
  const resolvedId = id ?? (label ? generatedId : undefined)
  const errorId = resolvedId ? `${resolvedId}-error` : undefined

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={resolvedId}>
          {label}
        </label>
      )}
      <input
        id={resolvedId}
        className={clsx(styles.input, error && styles.inputError, className)}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  )
}
