import { catApiClient } from '../../../shared/api/catApiClient'
import type { ApiResponse } from '../../../shared/types/api'
import type { CatImage, CatSearchParams, Favorite } from '../model/types'

export const catRepository = {
  getAll: async (params?: CatSearchParams): Promise<ApiResponse<CatImage[]>> => {
    const { data } = await catApiClient.get<CatImage[]>('/images/search', {
      params: { ...params, order: 'RANDOM' },
    })
    return data
  },

  getFavorites: async (): Promise<ApiResponse<Favorite[]>> => {
    const { data } = await catApiClient.get<Favorite[]>('/favourites')
    return data
  },

  addFavorite: async (imageId: string): Promise<ApiResponse<{ id: number }>> => {
    const { data } = await catApiClient.post<{ id: number }>('/favourites', { image_id: imageId })
    return data
  },

  removeFavorite: async (favoriteId: number): Promise<void> => {
    await catApiClient.delete(`/favourites/${favoriteId}`)
  },
}
