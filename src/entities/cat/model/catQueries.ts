import {
  type InfiniteData,
  infiniteQueryOptions,
  queryOptions,
  type UseInfiniteQueryOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'
import type { ApiResponse } from '../../../shared/types/api'
import { catRepository } from '../api/catRepository'
import type { CatImage, CatSearchParams, Favorite } from './types'

export const catQueries = {
  all: (
    params: CatSearchParams,
    options?: Partial<
      UseInfiniteQueryOptions<
        ApiResponse<CatImage[]>,
        Error,
        InfiniteData<ApiResponse<CatImage[]>>,
        readonly unknown[],
        number
      >
    >
  ) =>
    infiniteQueryOptions({
      queryKey: ['cats', 'all', params] as const,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        catRepository.getAll({ ...params, page: pageParam, limit: 9 }),
      initialPageParam: 0 as number,
      getNextPageParam: (lastPage: ApiResponse<CatImage[]>, allPages: ApiResponse<CatImage[]>[]) =>
        lastPage.length < 9 ? undefined : allPages.length,
      staleTime: 60_000,
      ...options,
    }),

  favorites: (options?: Partial<UseQueryOptions<ApiResponse<Favorite[]>>>) =>
    queryOptions({
      queryKey: ['cats', 'favorites'] as const,
      queryFn: () => catRepository.getFavorites(),
      staleTime: 60_000,
      ...options,
    }),
}
