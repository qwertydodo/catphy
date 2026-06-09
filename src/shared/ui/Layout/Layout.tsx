import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CornerPet } from '../CornerPet'
import styles from './Layout.module.css'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.root}>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.logo}>
          🐱 Catphy
        </Link>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/breeds"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Breeds
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
    <main className={styles.main}>
      <div className={styles.container}>{children}</div>
    </main>
    <CornerPet />
  </div>
)
