import { useQuery } from '@tanstack/react-query'
import { breedQueries } from '../../entities/breed'
import { ErrorMessage } from '../../shared/ui/ErrorMessage'
import { Spinner } from '../../shared/ui/Spinner'
import { Text } from '../../shared/ui/Typography'
import { BreedCard } from './BreedCard'
import styles from './BreedsPage.module.css'

export const BreedsPage = () => {
  const { data: breeds = [], isLoading, isError, refetch } = useQuery(breedQueries.all())

  if (isLoading) return <Spinner size="lg" />
  if (isError) return <ErrorMessage message="Failed to load breeds" onRetry={refetch} />

  return (
    <div className={styles.page}>
      <Text variant="h2">Breeds</Text>
      <div className={styles.grid}>
        {breeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  )
}
