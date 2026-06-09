export type PaginationLimit = {
  page: number
  limit: number
  total: number
}

export type LimitParams = {
  page?: number
  limit?: number
}

export type Response<T> = T
export type PaginatedResponse<T> = { rows: T[]; pagination: PaginationLimit }

export type ApiError = {
  code: string
  message: string
}
