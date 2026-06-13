import axios, { type AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/types'

export function unwrapData<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data
  }
  return payload as T
}

export function unwrapList<T>(payload: unknown): T[] {
  const data = unwrapData<unknown>(payload)
  if (Array.isArray(data)) return data as T[]
  if (data && typeof data === 'object') {
    if ('content' in data && Array.isArray((data as { content: T[] }).content)) {
      return (data as { content: T[] }).content
    }
    if ('results' in data && Array.isArray((data as { results: T[] }).results)) {
      return (data as { results: T[] }).results
    }
  }
  return []
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>
    return (
      axiosError.response?.data?.error ??
      axiosError.response?.data?.message ??
      axiosError.message ??
      'An unexpected error occurred'
    )
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred'
}

export function isUnauthorized(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401
}
