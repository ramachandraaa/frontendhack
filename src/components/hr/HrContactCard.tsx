import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import type { HrContact } from '@/types'

interface HrContactCardProps {
  contact: HrContact
  onOpen: () => void
  onEdit: () => void
  onDelete: () => void
}

export function HrContactCard({ contact, onOpen, onEdit, onDelete }: HrContactCardProps) {
  return (
    <Card>
      <CardActionArea onClick={onOpen}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <PersonIcon color="primary" sx={{ mt: 0.25 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {contact.hrName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {contact.designation || 'No designation'}
                </Typography>
                <Typography variant="body2" mt={0.5}>
                  {contact.email || '—'}
                </Typography>
                <Typography variant="body2">{contact.mobile || '—'}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" onClick={(e) => e.stopPropagation()}>
              <IconButton size="small" onClick={onEdit}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={onDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
