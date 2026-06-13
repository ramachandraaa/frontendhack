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
import type { Reminder, ReminderRequest, ReminderTime } from '@/types'

interface FormValues {
  hrName: string
  reminderDate: string
  reminderTimeStr: string
  reminderNote: string
  hrContactId?: number
}

interface ReminderFormDialogProps {
  open: boolean
  reminder?: Reminder | null
  loading?: boolean
  onClose: () => void
  onSubmit: (payload: ReminderRequest) => void
}

function timeObjToStr(t?: ReminderTime | null): string {
  if (!t) return ''
  const h = String(t.hour).padStart(2, '0')
  const m = String(t.minute).padStart(2, '0')
  return `${h}:${m}`
}

function strToTimeObj(s: string): ReminderTime | undefined {
  if (!s) return undefined
  const [h, m] = s.split(':').map(Number)
  return { hour: h, minute: m, second: 0, nano: 0 }
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
  } = useForm<FormValues>()

  useEffect(() => {
    if (open) {
      reset({
        hrName: reminder?.hrName ?? '',
        reminderDate: reminder?.reminderDate?.slice(0, 10) ?? '',
        reminderTimeStr: timeObjToStr(reminder?.reminderTime),
        reminderNote: reminder?.reminderNote ?? '',
        hrContactId: reminder?.hrContactId,
      })
    }
  }, [open, reminder, reset])

  const handleFormSubmit = (values: FormValues) => {
    onSubmit({
      hrContactId: values.hrContactId,
      hrName: values.hrName,
      reminderDate: values.reminderDate,
      reminderTime: strToTimeObj(values.reminderTimeStr),
      reminderNote: values.reminderNote,
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{reminder ? 'Edit Reminder' : 'Add Reminder'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
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
            {...register('reminderTimeStr')}
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
