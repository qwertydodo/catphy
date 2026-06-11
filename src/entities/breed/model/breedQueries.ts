import { queryOptions, type UseQueryOptions } from '@tanstack/react-query'
import type { ApiResponse } from '../../../shared/types/api'
import { breedRepository } from '../api/breedRepository'
import type { Breed } from './types'

export const breedQueries = {
  all: (options?: Partial<UseQueryOptions<ApiResponse<Breed[]>>>) =>
    queryOptions({
      queryKey: ['breeds', 'all'] as const,
      queryFn: () => breedRepository.getAll(),
      staleTime: 5 * 60_000,
      ...options,
    }),

  byId: (id: string, options?: Partial<UseQueryOptions<ApiResponse<Breed>>>) =>
    queryOptions({
      queryKey: ['breeds', id] as const,
      queryFn: () => breedRepository.getById(id),
      staleTime: 5 * 60_000,
      ...options,
    }),
}
