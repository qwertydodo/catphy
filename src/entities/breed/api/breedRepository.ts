import { catApiClient } from '../../../shared/api/catApiClient'
import type { ApiResponse } from '../../../shared/types/api'
import type { Breed } from '../model/types'

export const breedRepository = {
  getAll: async (): Promise<ApiResponse<Breed[]>> => {
    const { data } = await catApiClient.get<Breed[]>('/breeds')
    return data
  },

  getById: async (id: string): Promise<ApiResponse<Breed>> => {
    const { data } = await catApiClient.get<Breed>(`/breeds/${id}`)
    return data
  },
}
