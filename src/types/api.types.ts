export interface ApiErrorResponse {
  error?: string
  message?: string
  statusCode?: number
  errors?: Record<string, string[]>
}

export interface PaginationParams {
  page?: number
  size?: number
  sort?: string
  query?: string
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
