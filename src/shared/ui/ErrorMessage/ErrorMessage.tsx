import styles from './ErrorMessage.module.css'

type ErrorMessageProps = {
  message: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className={styles.wrapper}>
    <span className={styles.message}>{message}</span>
    {onRetry && (
      <button type="button" className={styles.retry} onClick={onRetry}>
        Try again
      </button>
    )}
  </div>
)
