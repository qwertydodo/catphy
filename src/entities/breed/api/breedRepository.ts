import { httpClient } from '../../../shared/api/httpClient'
import type { Breed } from '../model/types'

export const breedRepository = {
  getAll: async (): Promise<Breed[]> => {
    const { data } = await httpClient.get<Breed[]>('/breeds')
    return data
  },

  getById: async (id: string): Promise<Breed> => {
    const { data } = await httpClient.get<Breed>(`/breeds/${id}`)
    return data
  },
}
