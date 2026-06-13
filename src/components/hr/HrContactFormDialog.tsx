import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { HrContact, HrContactRequest } from '@/types'
import { emailPattern, phonePattern, validationMessages } from '@/utils/validation'

interface HrContactFormDialogProps {
  open: boolean
  contact?: HrContact | null
  loading?: boolean
  onClose: () => void
  onSubmit: (payload: HrContactRequest) => void
}

export function HrContactFormDialog({
  open,
  contact,
  loading,
  onClose,
  onSubmit,
}: HrContactFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HrContactRequest>()

  useEffect(() => {
    if (open) {
      reset({
        hrName: contact?.hrName ?? '',
        designation: contact?.designation ?? '',
        email: contact?.email ?? '',
        mobile: contact?.mobile ?? '',
        alternateMobile: contact?.alternateMobile ?? '',
        linkedIn: contact?.linkedIn ?? '',
      })
    }
  }, [open, contact, reset])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{contact ? 'Edit HR Contact' : 'Add HR Contact'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="HR Name"
            fullWidth
            margin="normal"
            error={!!errors.hrName}
            helperText={errors.hrName?.message}
            {...register('hrName', { required: validationMessages.required })}
          />
          <TextField label="Designation" fullWidth margin="normal" {...register('designation')} />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              pattern: { value: emailPattern, message: validationMessages.email },
            })}
          />
          <TextField
            label="Mobile"
            fullWidth
            margin="normal"
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
            {...register('mobile', {
              pattern: { value: phonePattern, message: validationMessages.phone },
            })}
          />
          <TextField label="Alternate Mobile" fullWidth margin="normal" {...register('alternateMobile')} />
          <TextField label="LinkedIn" fullWidth margin="normal" {...register('linkedIn')} />
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
