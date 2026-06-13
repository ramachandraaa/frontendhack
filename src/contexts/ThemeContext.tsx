import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ThemeProvider, type PaletteMode } from '@mui/material'
import { storageService } from '@/services/storage.service'
import { createAppTheme } from '@/theme/theme'

interface ThemeContextValue {
  mode: PaletteMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(storageService.getThemeMode())

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      storageService.setThemeMode(next)
      return next
    })
  }, [])

  const theme = useMemo(() => createAppTheme(mode), [mode])
  const value = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeMode must be used within AppThemeProvider')
  return context
}
