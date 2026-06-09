import { useQuery } from '@tanstack/react-query'
import { catQueries } from '../../model/catQueries'
import type { CatImage } from '../../model/types'
import { CatCard } from '../CatCard'
import styles from './CatGrid.module.css'

type CatGridProps = {
  images: CatImage[]
}

export const CatGrid = ({ images }: CatGridProps) => {
  const { data: favorites = [] } = useQuery(catQueries.favorites())

  if (images.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🐾</span>
        <p className={styles.emptyText}>No cats here yet</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {images.map((image) => {
        const favorite = favorites.find((f) => f.image_id === image.id)
        return (
          <CatCard
            key={image.id}
            image={image}
            isFavorited={!!favorite}
            favoriteId={favorite?.id}
          />
        )
      })}
    </div>
  )
}
