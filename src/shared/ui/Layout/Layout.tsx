import type { ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { routes } from '../../config/routes'
import { clearApiKey } from '../../lib/storage'
import { Button } from '../Button'
import { CatLogo } from '../CatLogo'
import { CornerPet } from '../CornerPet'
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
          <Link to={routes.gallery.path} className={styles.logo}>
            <CatLogo size="sm" />
            Catphy
          </Link>
          <nav className={styles.nav}>
            <NavLink
              to={routes.gallery.path}
              end
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Gallery
            </NavLink>
            <NavLink
              to={routes.breeds.path}
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Breeds
            </NavLink>
            <NavLink
              to={routes.favorites.path}
              className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            >
              Favorites
            </NavLink>
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
