import { CatLogo } from '../CatLogo'
import styles from './CornerPet.module.css'

export const CornerPet = () => (
  <div className={styles.container} aria-hidden="true">
    <div className={styles.rainbow} />
    <CatLogo size="sm" />
  </div>
)
