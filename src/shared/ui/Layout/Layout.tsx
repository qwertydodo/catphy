import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../config/routes'
import { clearApiKey } from '../../lib/storage'
import { Button } from '../Button'
import { CatLogo } from '../CatLogo'
import { CornerPet } from '../CornerPet'
import { Link } from '../Link'
import styles from './Layout.module.css'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearApiKey()
    navigate(routes.auth.path)
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to={routes.gallery.path} variant="unstyled" className={styles.logo}>
            <CatLogo size="sm" />
            Catphy
          </Link>
          <nav className={styles.nav}>
            <Link
              to={routes.gallery.path}
              end
              variant="unstyled"
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Gallery
            </Link>
            <Link
              to={routes.breeds.path}
              variant="unstyled"
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Breeds
            </Link>
            <Link
              to={routes.favorites.path}
              variant="unstyled"
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Favorites
            </Link>
            <Button variant="ghost" onClick={handleLogout} aria-label="Log out">
              Log out
            </Button>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <CornerPet />
    </div>
  )
}
