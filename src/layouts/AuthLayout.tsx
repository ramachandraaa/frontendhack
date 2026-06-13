import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #ede9fe 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </Box>
  )
}
