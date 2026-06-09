import type { UseQueryOptions } from '@tanstack/react-query'
import { breedRepository } from '../api/breedRepository'
import type { Breed } from './types'

export const breedQueries = {
  all: (queryOptions?: Partial<UseQueryOptions<Breed[]>>) => ({
    queryKey: ['breeds', 'all'] as const,
    queryFn: () => breedRepository.getAll(),
    staleTime: 5 * 60_000,
    ...queryOptions,
  }),

  byId: (id: string, queryOptions?: Partial<UseQueryOptions<Breed>>) => ({
    queryKey: ['breeds', id] as const,
    queryFn: () => breedRepository.getById(id),
    staleTime: 5 * 60_000,
    ...queryOptions,
  }),
}
