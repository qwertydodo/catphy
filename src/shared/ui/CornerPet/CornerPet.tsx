import styles from './CornerPet.module.css'

export const CornerPet = () => (
  <div className={styles.container} aria-hidden="true">
    <div className={styles.rainbow} />
    <span className={styles.cat}>🐱</span>
  </div>
)
