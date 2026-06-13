import { apiClient } from './client'
import { unwrapData } from '@/utils/api'
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types'

export const authApi = {
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', payload)
    return unwrapData<AuthResponse>(data)
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', payload)
    return unwrapData<AuthResponse>(data)
  },
}
