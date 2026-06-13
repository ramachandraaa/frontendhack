import { Box, Typography, type SxProps, type Theme } from '@mui/material'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
  sx?: SxProps<Theme>
}

export function PageHeader({ title, subtitle, action, sx }: PageHeaderProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={2}
      mb={3}
      sx={sx}
    >
      <Box>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" mt={0.5}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Box>
  )
}
