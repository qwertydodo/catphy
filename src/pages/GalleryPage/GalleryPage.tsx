import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CatGrid, catQueries } from '../../entities/cat'
import { routes } from '../../shared/config/routes'
import { Button } from '../../shared/ui/Button'
import { ErrorMessage } from '../../shared/ui/ErrorMessage'
import { PageMeta } from '../../shared/ui/PageMeta'
import { Spinner } from '../../shared/ui/Spinner'
import { Text } from '../../shared/ui/Typography'
import { BreedSelect } from './BreedSelect'
import styles from './GalleryPage.module.css'

export const GalleryPage = () => {
  const [breedId, setBreedId] = useState('')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery(catQueries.all({ breed_ids: breedId || undefined }))

  const images = data?.pages.flat() ?? []

  if (isLoading) return <Spinner size="lg" />
  if (isError) return <ErrorMessage message="Failed to load cats" onRetry={refetch} />

  return (
    <div className={styles.page}>
      <PageMeta title={routes.gallery.title} description={routes.gallery.description} />
      <div className={styles.header}>
        <Text variant="h2">Cat Gallery</Text>
        <BreedSelect value={breedId} onChange={setBreedId} />
      </div>
      <CatGrid images={images} />
      {hasNextPage && (
        <div className={styles.loadMore}>
          <Button variant="ghost" onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}
