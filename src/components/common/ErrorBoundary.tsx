import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message?: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, message: undefined })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          px={2}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 56 }} />
          <Typography variant="h5">Something went wrong</Typography>
          <Typography color="text.secondary" textAlign="center" maxWidth={480}>
            {this.state.message ?? 'An unexpected error occurred. Please try again.'}
          </Typography>
          <Button variant="contained" onClick={this.handleReset}>
            Go to Dashboard
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
