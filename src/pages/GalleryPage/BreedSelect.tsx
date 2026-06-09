import { useQuery } from '@tanstack/react-query'
import { breedQueries } from '../../entities/breed'
import styles from './GalleryPage.module.css'

type BreedSelectProps = {
  value: string
  onChange: (breedId: string) => void
}

export const BreedSelect = ({ value, onChange }: BreedSelectProps) => {
  const { data: breeds = [] } = useQuery(breedQueries.all())

  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by breed"
    >
      <option value="">All breeds</option>
      {breeds.map((breed) => (
        <option key={breed.id} value={breed.id}>
          {breed.name}
        </option>
      ))}
    </select>
  )
}
