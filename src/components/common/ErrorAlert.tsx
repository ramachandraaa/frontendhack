import { Alert, AlertTitle } from '@mui/material'

interface ErrorAlertProps {
  message: string
  title?: string
  onRetry?: () => void
}

export function ErrorAlert({ message, title = 'Something went wrong' }: ErrorAlertProps) {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  )
}
