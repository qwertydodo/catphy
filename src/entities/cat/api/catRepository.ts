import { catApiClient } from '../../../shared/api/catApiClient'
import type { CatImage, CatSearchParams, Favorite } from '../model/types'

export const catRepository = {
  getAll: async (params: CatSearchParams & { page?: number }): Promise<CatImage[]> => {
    const { data } = await catApiClient.get<CatImage[]>('/images/search', {
      params: { ...params, order: 'RANDOM' },
    })
    return data
  },

  getById: async (id: string): Promise<CatImage> => {
    const { data } = await catApiClient.get<CatImage>(`/images/${id}`)
    return data
  },

  getFavorites: async (): Promise<Favorite[]> => {
    const { data } = await catApiClient.get<Favorite[]>('/favourites')
    return data
  },

  addFavorite: async (imageId: string): Promise<{ id: number }> => {
    const { data } = await catApiClient.post<{ id: number }>('/favourites', { image_id: imageId })
    return data
  },

  removeFavorite: async (favoriteId: number): Promise<void> => {
    await catApiClient.delete(`/favourites/${favoriteId}`)
  },
}
