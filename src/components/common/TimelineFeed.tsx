import {
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { formatDateTime, formatRelative } from '@/utils/date'

interface TimelineItem {
  id: number | string
  title: string
  subtitle?: string
  timestamp: string
  content: string
}

interface TimelineFeedProps {
  items: TimelineItem[]
}

export function TimelineFeed({ items }: TimelineFeedProps) {
  return (
    <Stack spacing={2}>
      {items.map((item, index) => (
        <Stack key={item.id} direction="row" spacing={2}>
          <Box display="flex" flexDirection="column" alignItems="center" width={20}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                mt: 1,
              }}
            />
            {index < items.length - 1 && (
              <Box sx={{ width: 2, flex: 1, bgcolor: 'divider', my: 0.5 }} />
            )}
          </Box>
          <Paper sx={{ p: 2, flex: 1 }}>
            <Stack direction="row" justifyContent="space-between" gap={2} mb={0.5}>
              <Typography fontWeight={600}>{item.title}</Typography>
              <Typography variant="caption" color="text.secondary" whiteSpace="nowrap">
                {formatRelative(item.timestamp)}
              </Typography>
            </Stack>
            {item.subtitle && (
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                {item.subtitle} · {formatDateTime(item.timestamp)}
              </Typography>
            )}
            <Typography variant="body2">{item.content}</Typography>
          </Paper>
        </Stack>
      ))}
    </Stack>
  )
}
