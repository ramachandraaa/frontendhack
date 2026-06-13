import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import {
  EmptyState,
  ErrorAlert,
  PageHeader,
  TimelineFeed,
  TimelineSkeleton,
} from '@/components'
import { useCreateHrUpdate, useHrContact, useHrUpdatesByContact } from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import { companyDetailsPath } from '@/routes/paths'
import { formatDateTime } from '@/utils/date'

interface UpdateForm {
  updateText: string
}

export function HRProfilePage() {
  const { hrContactId = '0' } = useParams()
  const contactId = Number(hrContactId)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [submitting, setSubmitting] = useState(false)

  const { data: contact, isLoading: contactLoading, isError, error } = useHrContact(contactId)
  const { data: updates = [], isLoading: updatesLoading } = useHrUpdatesByContact(contactId)
  const createUpdate = useCreateHrUpdate(contactId)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateForm>()

  const onSubmit = (data: UpdateForm) => {
    setSubmitting(true)
    createUpdate.mutate(
      { hrContactId: contactId, updateText: data.updateText },
      {
        onSuccess: () => {
          enqueueSnackbar('Update added', { variant: 'success' })
          reset()
        },
        onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
        onSettled: () => setSubmitting(false),
      },
    )
  }

  if (isError) return <ErrorAlert message={getErrorMessage(error)} />

  return (
    <>
      <Breadcrumbs sx={{ mb: 2 }}>
        {contact?.companyId && (
          <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => navigate(companyDetailsPath(contact.companyId))}
          >
            {contact.companyName ?? 'Company'}
          </Link>
        )}
        <Typography variant="body2" color="text.primary">
          HR Profile
        </Typography>
      </Breadcrumbs>

      <PageHeader
        title={contact?.hrName ?? 'HR Profile'}
        subtitle={contact?.designation}
        action={
          contact?.companyId ? (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(companyDetailsPath(contact.companyId))}
            >
              Back to Company
            </Button>
          ) : undefined
        }
      />

      {contactLoading ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <TimelineSkeleton count={1} />
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography variant="caption" color="text.secondary">Email</Typography>
                <Typography>{contact?.email || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography variant="caption" color="text.secondary">Mobile</Typography>
                <Typography>{contact?.mobile || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography variant="caption" color="text.secondary">Alternate Mobile</Typography>
                <Typography>{contact?.alternateMobile || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography variant="caption" color="text.secondary">LinkedIn</Typography>
                <Typography>{contact?.linkedIn || '—'}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add Update
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Update"
              fullWidth
              multiline
              rows={3}
              error={!!errors.updateText}
              helperText={errors.updateText?.message}
              {...register('updateText', { required: 'Update text is required' })}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<SendIcon />}
              sx={{ mt: 2 }}
              disabled={submitting || createUpdate.isPending}
            >
              {submitting ? 'Saving...' : 'Add Update'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Update Timeline
      </Typography>

      {updatesLoading && <TimelineSkeleton />}
      {!updatesLoading && updates.length === 0 && (
        <EmptyState title="No updates yet" description="Add the first update for this HR contact." />
      )}
      {!updatesLoading && updates.length > 0 && (
        <TimelineFeed
          items={updates.map((update) => ({
            id: update.id,
            title: update.addedBy ?? 'Team member',
            subtitle: formatDateTime(update.createdAt),
            timestamp: update.createdAt,
            content: update.updateText,
          }))}
        />
      )}
    </>
  )
}
