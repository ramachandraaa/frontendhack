import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiErrorResponse } from '@/types'
import { storageService } from '@/services/storage.service'
import { getErrorMessage, isUnauthorized } from '@/utils/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/health']

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const isPublic = PUBLIC_PATHS.some((path) => config.url?.includes(path))
  if (!isPublic) {
    const token = storageService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (isUnauthorized(error)) {
      const isAuthRoute = window.location.pathname === '/login' || window.location.pathname === '/register'
      storageService.clearAuth()
      if (!isAuthRoute) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export { getErrorMessage }
