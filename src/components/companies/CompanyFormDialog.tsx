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
import type { Company, CompanyRequest } from '@/types'

interface CompanyFormDialogProps {
  open: boolean
  company?: Company | null
  loading?: boolean
  onClose: () => void
  onSubmit: (payload: CompanyRequest) => void
}

export function CompanyFormDialog({
  open,
  company,
  loading,
  onClose,
  onSubmit,
}: CompanyFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyRequest>()

  useEffect(() => {
    if (open) {
      reset({
        companyName: company?.companyName ?? '',
      })
    }
  }, [open, company, reset])

  const submit = (data: CompanyRequest) => onSubmit(data)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{company ? 'Edit Company' : 'Add Company'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <DialogContent>
          <TextField
            label="Company Name"
            fullWidth
            margin="normal"
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
            {...register('companyName', { required: 'Company name is required' })}
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
