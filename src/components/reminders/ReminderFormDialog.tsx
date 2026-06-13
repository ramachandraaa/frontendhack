import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import type { Reminder, ReminderRequest } from '@/types'

interface ReminderFormDialogProps {
  open: boolean
  reminder?: Reminder | null
  loading?: boolean
  onClose: () => void
  onSubmit: (payload: ReminderRequest) => void
}

export function ReminderFormDialog({
  open,
  reminder,
  loading,
  onClose,
  onSubmit,
}: ReminderFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReminderRequest>()

  useEffect(() => {
    if (open) {
      reset({
        companyName: reminder?.companyName ?? '',
        hrName: reminder?.hrName ?? '',
        reminderDate: reminder?.reminderDate?.slice(0, 10) ?? '',
        reminderTime: reminder?.reminderTime ?? '',
        reminderNote: reminder?.reminderNote ?? '',
        companyId: reminder?.companyId,
        hrContactId: reminder?.hrContactId,
      })
    }
  }, [open, reminder, reset])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{reminder ? 'Edit Reminder' : 'Add Reminder'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="Company"
            fullWidth
            margin="normal"
            {...register('companyName')}
          />
          <TextField label="HR Name" fullWidth margin="normal" {...register('hrName')} />
          <TextField
            label="Reminder Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.reminderDate}
            helperText={errors.reminderDate?.message}
            {...register('reminderDate', { required: 'Reminder date is required' })}
          />
          <TextField
            label="Reminder Time"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register('reminderTime')}
          />
          <TextField
            label="Reminder Note"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            {...register('reminderNote')}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
