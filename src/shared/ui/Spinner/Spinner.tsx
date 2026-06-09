import styles from './Spinner.module.css'

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
}

export const Spinner = ({ size = 'md' }: SpinnerProps) => (
  <div className={styles.wrapper} role="status" aria-label="Loading">
    <div className={styles[size]}>
      <span className={styles.nyan} aria-hidden="true">
        🐱
      </span>
      <div className={styles.rainbow} />
    </div>
  </div>
)
