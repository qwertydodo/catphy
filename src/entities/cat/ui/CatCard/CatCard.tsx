import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { catRepository } from '../../api/catRepository'
import type { CatImage } from '../../model/types'
import styles from './CatCard.module.css'

type CatCardProps = {
  image: CatImage
  isFavorited: boolean
  favoriteId?: number
}

export const CatCard = ({ image, isFavorited, favoriteId }: CatCardProps) => {
  const queryClient = useQueryClient()

  const invalidateFavorites = () =>
    queryClient.invalidateQueries({ queryKey: ['cats', 'favorites'] })

  const addFav = useMutation({
    mutationFn: () => catRepository.addFavorite(image.id),
    onSuccess: invalidateFavorites,
  })

  const removeFav = useMutation({
    mutationFn: () => catRepository.removeFavorite(favoriteId ?? 0),
    onSuccess: invalidateFavorites,
  })

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isFavorited) removeFav.mutate()
    else addFav.mutate()
  }

  const isPending = addFav.isPending || removeFav.isPending

  return (
    <div className={styles.card}>
      <img src={image.url} alt="A cat" className={styles.image} loading="lazy" />
      <div className={styles.overlay}>
        <button
          type="button"
          className={clsx(styles.heartBtn, isFavorited && styles.hearted)}
          onClick={handleFavorite}
          disabled={isPending}
          aria-label={isFavorited ? 'Unfavorite' : 'Favorite'}
        >
          {isFavorited ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}
