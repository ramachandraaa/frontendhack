import { Box, CircularProgress } from '@mui/material'

interface LoadingSpinnerProps {
  fullPage?: boolean
  size?: number
}

export function LoadingSpinner({ fullPage = false, size = 40 }: LoadingSpinnerProps) {
  const spinner = <CircularProgress size={size} />

  if (fullPage) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        {spinner}
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" py={4}>
      {spinner}
    </Box>
  )
}
