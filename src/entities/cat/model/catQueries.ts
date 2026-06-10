import type { InfiniteData, UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query'
import type { Response } from '../../../shared/types/api'
import { catRepository } from '../api/catRepository'
import type { CatImage, CatSearchParams, Favorite } from './types'

export const catQueries = {
  all: (
    params: CatSearchParams,
    queryOptions?: Partial<
      UseInfiniteQueryOptions<
        Response<CatImage[]>,
        Error,
        InfiniteData<Response<CatImage[]>>,
        readonly unknown[],
        number
      >
    >
  ) => ({
    queryKey: ['cats', 'all', params] as const,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      catRepository.getAll({ ...params, page: pageParam, limit: 9 }),
    initialPageParam: 0 as number,
    getNextPageParam: (lastPage: Response<CatImage[]>, allPages: Response<CatImage[]>[]) =>
      lastPage.length < 9 ? undefined : allPages.length,
    staleTime: 60_000,
    ...queryOptions,
  }),

  byId: (id: string, queryOptions?: Partial<UseQueryOptions<Response<CatImage>>>) => ({
    queryKey: ['cats', 'byId', id] as const,
    queryFn: () => catRepository.getById(id),
    staleTime: 60_000,
    ...queryOptions,
  }),

  favorites: (queryOptions?: Partial<UseQueryOptions<Response<Favorite[]>>>) => ({
    queryKey: ['cats', 'favorites'] as const,
    queryFn: () => catRepository.getFavorites(),
    staleTime: 60_000,
    ...queryOptions,
  }),
}
