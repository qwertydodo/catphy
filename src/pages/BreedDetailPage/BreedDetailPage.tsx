import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { breedQueries, getBreedImageUrl } from '../../entities/breed'
import { CatGrid, catQueries } from '../../entities/cat'
import { routes } from '../../shared/config/routes'
import { Button } from '../../shared/ui/Button'
import { ErrorMessage } from '../../shared/ui/ErrorMessage'
import { PageMeta } from '../../shared/ui/PageMeta'
import { Spinner } from '../../shared/ui/Spinner'
import { Text } from '../../shared/ui/Typography'
import styles from './BreedDetailPage.module.css'

export const BreedDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const {
    data: breed,
    isLoading: breedLoading,
    isError: breedError,
  } = useQuery(breedQueries.byId(id ?? '', { enabled: !!id }))

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: imagesLoading,
  } = useInfiniteQuery(catQueries.all({ breed_ids: id }, { enabled: !!id }))

  const images = data?.pages.flat() ?? []

  if (!id) return <ErrorMessage message="Breed not found" />
  if (breedLoading) return <Spinner size="lg" />
  if (breedError || !breed) return <ErrorMessage message="Failed to load breed" />

  const meta = routes.breedDetail.meta(breed.name)

  return (
    <div className={styles.page}>
      <PageMeta title={meta.title} description={meta.description} />
      <div className={styles.hero}>
        {breed.reference_image_id && (
          <img
            src={getBreedImageUrl(breed.reference_image_id)}
            alt={breed.name}
            className={styles.heroImage}
          />
        )}
        <div className={styles.heroInfo}>
          <Text variant="h1">{breed.name}</Text>
          <Text variant="body" muted>
            {breed.origin} · {breed.life_span} years
          </Text>
          <Text variant="body" className={styles.description}>
            {breed.description}
          </Text>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <Text variant="sm" muted>
                Weight
              </Text>
              <Text variant="body">{breed.weight.metric} kg</Text>
            </span>
            <span className={styles.stat}>
              <Text variant="sm" muted>
                Temperament
              </Text>
              <Text variant="body">{breed.temperament}</Text>
            </span>
          </div>
          {breed.wikipedia_url && (
            <a
              href={breed.wikipedia_url}
              target="_blank"
              rel="noreferrer"
              className={styles.wikiLink}
            >
              Wikipedia →
            </a>
          )}
        </div>
      </div>

      <Text variant="h3">Photos</Text>
      {imagesLoading ? <Spinner /> : <CatGrid images={images} />}
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
