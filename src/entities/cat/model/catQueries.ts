import type { InfiniteData, UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query'
import { catRepository } from '../api/catRepository'
import type { CatImage, CatSearchParams, Favorite } from './types'

export const catQueries = {
  all: (
    params: CatSearchParams,
    queryOptions?: Partial<
      UseInfiniteQueryOptions<
        CatImage[],
        Error,
        InfiniteData<CatImage[]>,
        readonly unknown[],
        number
      >
    >
  ) => ({
    queryKey: ['cats', 'all', params] as const,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      catRepository.getAll({ ...params, page: pageParam, limit: 9 }),
    initialPageParam: 0 as number,
    getNextPageParam: (lastPage: CatImage[], allPages: CatImage[][]) =>
      lastPage.length < 9 ? undefined : allPages.length,
    staleTime: 60_000,
    ...queryOptions,
  }),

  byId: (id: string, queryOptions?: Partial<UseQueryOptions<CatImage>>) => ({
    queryKey: ['cats', 'byId', id] as const,
    queryFn: () => catRepository.getById(id),
    staleTime: 60_000,
    ...queryOptions,
  }),

  favorites: (queryOptions?: Partial<UseQueryOptions<Favorite[]>>) => ({
    queryKey: ['cats', 'favorites'] as const,
    queryFn: () => catRepository.getFavorites(),
    staleTime: 0,
    ...queryOptions,
  }),
}
