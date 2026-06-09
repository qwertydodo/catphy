import { useQuery } from '@tanstack/react-query'
import { CatGrid, type CatImage, catQueries } from '../../entities/cat'
import { ErrorMessage } from '../../shared/ui/ErrorMessage'
import { Spinner } from '../../shared/ui/Spinner'
import { Text } from '../../shared/ui/Typography'
import styles from './FavoritesPage.module.css'

export const FavoritesPage = () => {
  const { data: favorites = [], isLoading, isError, refetch } = useQuery(catQueries.favorites())

  // width/height not available from favorites API response; CSS handles image sizing
  const images: CatImage[] = favorites.map((f) => ({
    id: f.image.id,
    url: f.image.url,
    width: 0,
    height: 0,
    breeds: [],
  }))

  if (isLoading) return <Spinner size="lg" />
  if (isError) return <ErrorMessage message="Failed to load favorites" onRetry={refetch} />

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Text variant="h2">Favorites</Text>
        <Text variant="sm" muted>
          {favorites.length} saved
        </Text>
      </div>
      <CatGrid images={images} />
    </div>
  )
}
