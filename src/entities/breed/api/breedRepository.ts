import { catApiClient } from '../../../shared/api/catApiClient'
import type { Breed } from '../model/types'

export const breedRepository = {
  getAll: async (): Promise<Breed[]> => {
    const { data } = await catApiClient.get<Breed[]>('/breeds')
    return data
  },

  getById: async (id: string): Promise<Breed> => {
    const { data } = await catApiClient.get<Breed>(`/breeds/${id}`)
    return data
  },
}
