import { catApiClient } from '../../../shared/api/catApiClient'
import type { Response } from '../../../shared/types/api'
import type { Breed } from '../model/types'

export const breedRepository = {
  getAll: async (): Promise<Response<Breed[]>> => {
    const { data } = await catApiClient.get<Breed[]>('/breeds')
    return data
  },

  getById: async (id: string): Promise<Response<Breed>> => {
    const { data } = await catApiClient.get<Breed>(`/breeds/${id}`)
    return data
  },
}
