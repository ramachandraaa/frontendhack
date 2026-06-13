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
import Grid from '@mui/material/Grid2'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useAuth } from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import { emailPattern, validationMessages } from '@/utils/validation'
import { ROUTES } from '@/routes/paths'
import type { RegisterRequest } from '@/types'

export function RegisterPage() {
  const { register: registerUser, isAuthenticated } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>()

  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />

  const onSubmit = async (data: RegisterRequest) => {
    setError(null)
    setSubmitting(true)
    try {
      await registerUser(data)
      enqueueSnackbar('Account created successfully', { variant: 'success' })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card sx={{ maxWidth: 520, mx: 'auto' }}>
      <CardContent sx={{ p: 4 }}>
        <Box textAlign="center" mb={3}>
          <BusinessCenterIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" fontWeight={700}>
            Create account
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="First Name" fullWidth {...register('firstName')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Last Name" fullWidth {...register('lastName')} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Username"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                {...register('username', { required: validationMessages.required })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                {...register('email', {
                  required: validationMessages.required,
                  pattern: { value: emailPattern, message: validationMessages.email },
                })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                {...register('password', {
                  required: validationMessages.required,
                  minLength: { value: 6, message: validationMessages.minPassword },
                })}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" fullWidth size="large" disabled={submitting} sx={{ mt: 3 }}>
            {submitting ? 'Creating account...' : 'Register'}
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{' '}
          <Link component={RouterLink} to={ROUTES.LOGIN}>
            Sign in
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}
