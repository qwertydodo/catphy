import { useNavigate } from 'react-router-dom'
import type { Breed } from '../../entities/breed'
import styles from './BreedsPage.module.css'

type BreedCardProps = { breed: Breed }

export const BreedCard = ({ breed }: BreedCardProps) => {
  const navigate = useNavigate()
  const imageUrl = breed.reference_image_id
    ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
    : null

  return (
    <button
      type="button"
      className={styles.breedCard}
      onClick={() => navigate(`/breeds/${breed.id}`)}
    >
      <div className={styles.breedImageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={breed.name} className={styles.breedImage} loading="lazy" />
        ) : (
          <div className={styles.breedImagePlaceholder}>🐾</div>
        )}
      </div>
      <div className={styles.breedInfo}>
        <span className={styles.breedName}>{breed.name}</span>
        <span className={styles.breedOrigin}>{breed.origin}</span>
        <div className={styles.temperamentTags}>
          {breed.temperament
            .split(', ')
            .slice(0, 3)
            .map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
        </div>
      </div>
    </button>
  )
}
