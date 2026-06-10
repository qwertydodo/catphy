import { useEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { routes } from '../../shared/config/routes'
import { Button } from '../../shared/ui/Button'
import { CatLogo } from '../../shared/ui/CatLogo'
import { PageMeta } from '../../shared/ui/PageMeta'
import { Text } from '../../shared/ui/Typography'
import styles from './ErrorPage.module.css'

export const ErrorPage = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404

  useEffect(() => {
    if (isNotFound) return
    console.error(error)
  }, [error, isNotFound])

  if (isNotFound) {
    return (
      <div className={styles.page}>
        <PageMeta title="Page Not Found | Catphy" description="We couldn't find that page." />
        <div className={styles.card}>
          <CatLogo size="xl" />
          <Text variant="h2">Cat run somewhere</Text>
          <Text variant="body" muted>
            We couldn't find that page.
          </Text>
          <Button onClick={() => navigate(routes.gallery.path)}>Back to gallery</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageMeta title="Error | Catphy" description="An unexpected error occurred." />
      <div className={styles.card}>
        <Text variant="h2">Something went wrong</Text>
        <Text variant="body" muted>
          An unexpected error occurred. Try reloading the page.
        </Text>
        <div className={styles.actions}>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
          <Button variant="ghost" onClick={() => navigate(routes.gallery.path)}>
            Go to gallery
          </Button>
        </div>
      </div>
    </div>
  )
}
