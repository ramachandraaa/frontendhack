import { TOKEN_KEY, USER_KEY, THEME_KEY } from '@/utils/constants'
import type { User } from '@/types'

export const storageService = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getUser: (): User | null => {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as User
    } catch {
      return null
    }
  },

  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getThemeMode: (): 'light' | 'dark' => {
    const mode = localStorage.getItem(THEME_KEY)
    return mode === 'dark' ? 'dark' : 'light'
  },

  setThemeMode: (mode: 'light' | 'dark'): void => {
    localStorage.setItem(THEME_KEY, mode)
  },

  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
