import { useState } from 'react'
import { Link as RouterLink, Navigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useAuth } from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import { ROUTES } from '@/routes/paths'
import type { LoginRequest } from '@/types'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>()

  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />

  const onSubmit = async (data: LoginRequest) => {
    setError(null)
    setSubmitting(true)
    try {
      await login(data)
      enqueueSnackbar('Welcome back!', { variant: 'success' })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card sx={{ maxWidth: 440, mx: 'auto' }}>
      <CardContent sx={{ p: 4 }}>
        <Box textAlign="center" mb={3}>
          <BusinessCenterIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" fontWeight={700}>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Access your Company CRM workspace
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            {...register('email', { required: 'Email is required' })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
            {...register('password', { required: 'Password is required' })}
          />
          <Button type="submit" variant="contained" fullWidth size="large" disabled={submitting} sx={{ mt: 3 }}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" mt={2}>
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} to={ROUTES.REGISTER}>
            Register
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}
