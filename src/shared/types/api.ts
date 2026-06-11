export type LimitParams = {
  page?: number
  limit?: number
}

export type ApiResponse<T> = T

export type ApiError = {
  code: string
  message: string
}
