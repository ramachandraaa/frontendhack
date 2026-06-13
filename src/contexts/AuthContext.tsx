import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '@/services'
import type { LoginRequest, RegisterRequest, User } from '@/types'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginRequest) => Promise<void>
  register: (payload: RegisterRequest) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(authService.getStoredUser())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(authService.getStoredUser())
    setIsLoading(false)
  }, [])

  const login = useCallback(async (payload: LoginRequest) => {
    const nextUser = await authService.login(payload)
    setUser(nextUser)
  }, [])

  const register = useCallback(async (payload: RegisterRequest) => {
    const nextUser = await authService.register(payload)
    setUser(nextUser)
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user && authService.isAuthenticated(),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
