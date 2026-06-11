import type { InfiniteData, UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query'
import type { ApiResponse } from '../../../shared/types/api'
import { catRepository } from '../api/catRepository'
import type { CatImage, CatSearchParams, Favorite } from './types'

export const catQueries = {
  all: (
    params: CatSearchParams,
    queryOptions?: Partial<
      UseInfiniteQueryOptions<
        ApiResponse<CatImage[]>,
        Error,
        InfiniteData<ApiResponse<CatImage[]>>,
        readonly unknown[],
        number
      >
    >
  ) => ({
    queryKey: ['cats', 'all', params] as const,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      catRepository.getAll({ ...params, page: pageParam, limit: 9 }),
    initialPageParam: 0 as number,
    getNextPageParam: (lastPage: ApiResponse<CatImage[]>, allPages: ApiResponse<CatImage[]>[]) =>
      lastPage.length < 9 ? undefined : allPages.length,
    staleTime: 60_000,
    ...queryOptions,
  }),

  favorites: (queryOptions?: Partial<UseQueryOptions<ApiResponse<Favorite[]>>>) => ({
    queryKey: ['cats', 'favorites'] as const,
    queryFn: () => catRepository.getFavorites(),
    staleTime: 60_000,
    ...queryOptions,
  }),
}
