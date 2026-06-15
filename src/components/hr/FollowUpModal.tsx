import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import { getErrorMessage } from '@/utils/api'
import { hrContactsApi } from '@/api/hrContacts.api'
import type { FollowUpRequest } from '@/types'

interface FollowUpForm {
  update: string
  time: string // Format "HH:mm"
}

interface FollowUpModalProps {
  open: boolean
  onClose: () => void
  hrContactId: number
  onSuccess: () => void
}

export function FollowUpModal({ open, onClose, hrContactId, onSuccess }: FollowUpModalProps) {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FollowUpForm>()

  const onSubmit = async (data: FollowUpForm) => {
    if (!data.time) return

    const payload: FollowUpRequest = {
      update: data.update,
      time: `${data.time}:00`, // Format to "HH:mm:ss"
    }

    try {
      await hrContactsApi.addFollowUp(hrContactId, payload)
      enqueueSnackbar('Follow-up scheduled successfully', { variant: 'success' })
      
      // Invalidate the calling list query to trigger a refetch
      await queryClient.invalidateQueries({ queryKey: ['calling-list'] })

      reset({ update: '', time: '' })
      onSuccess()
      onClose()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Schedule Follow-Up</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="update"
            control={control}
            defaultValue=""
            rules={{ required: 'Follow-up note is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Follow-up Note"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                error={!!errors.update}
                helperText={errors.update?.message}
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            defaultValue=""
            rules={{ required: 'Reminder time is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reminder Time"
                type="time"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 1800, // 30 min
                }}
                error={!!errors.time}
                helperText={errors.time?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Scheduling...' : 'Schedule'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
