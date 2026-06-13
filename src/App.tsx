import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { AppThemeProvider, AuthProvider } from '@/contexts'
import { ErrorBoundary } from '@/components'
import { AppRoutes } from '@/routes'
import { QUERY_STALE_TIME } from '@/utils/constants'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <CssBaseline />
          <SnackbarProvider maxSnack={3} autoHideDuration={4000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <BrowserRouter>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </BrowserRouter>
          </SnackbarProvider>
        </AppThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
