import { authApi } from '@/api'
import { storageService } from './storage.service'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types'

function buildUser(auth: AuthResponse): User {
  return {
    id: auth.user?.id,
    username: auth.user?.username ?? auth.username ?? auth.email ?? 'user',
    email: auth.user?.email ?? auth.email,
    firstName: auth.user?.firstName ?? auth.firstName,
    lastName: auth.user?.lastName ?? auth.lastName,
    role: auth.user?.role ?? auth.role,
  }
}

function persistAuth(auth: AuthResponse): User {
  const token = auth.token
  if (!token) throw new Error('Authentication token missing in response')
  storageService.setToken(token)
  const user = buildUser(auth)
  storageService.setUser(user)
  return user
}

export const authService = {
  async login(payload: LoginRequest): Promise<User> {
    const auth = await authApi.login(payload)
    return persistAuth(auth)
  },

  async register(payload: RegisterRequest): Promise<User> {
    const auth = await authApi.register(payload)
    return persistAuth(auth)
  },

  logout(): void {
    storageService.clearAuth()
  },

  getStoredUser(): User | null {
    return storageService.getUser()
  },

  isAuthenticated(): boolean {
    return !!storageService.getToken()
  },
}
