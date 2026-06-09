export type PaginationLimit = {
  page: number
  limit: number
  total: number
}

export type LimitParams = {
  page?: number
  limit?: number
}

export type ApiResponse<T> = {
  data: T
}

export type PaginatedResponse<T> = {
  data: T
  pagination: PaginationLimit
}

export type ApiError = {
  code: string
  message: string
}
