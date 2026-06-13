import { createTheme, type PaletteMode } from '@mui/material/styles'

export function createAppTheme(mode: PaletteMode) {
  const isLight = mode === 'light'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? '#2563eb' : '#60a5fa',
        dark: '#1d4ed8',
        light: '#93c5fd',
      },
      secondary: {
        main: isLight ? '#7c3aed' : '#a78bfa',
      },
      background: {
        default: isLight ? '#f1f5f9' : '#0f172a',
        paper: isLight ? '#ffffff' : '#1e293b',
      },
      text: {
        primary: isLight ? '#0f172a' : '#f8fafc',
        secondary: isLight ? '#64748b' : '#94a3b8',
      },
      divider: isLight ? '#e2e8f0' : '#334155',
      success: { main: '#16a34a' },
      warning: { main: '#d97706' },
      error: { main: '#dc2626' },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 8 } },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${isLight ? '#e2e8f0' : '#334155'}`,
            boxShadow: isLight ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${isLight ? '#e2e8f0' : '#334155'}`,
            boxShadow: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${isLight ? '#e2e8f0' : '#334155'}`,
          },
        },
      },
    },
  })
}
