import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GroupsIcon from '@mui/icons-material/Groups'
import { useSnackbar } from 'notistack'
import {
  ConfirmDialog,
  EmptyState,
  ErrorAlert,
  HrContactCard,
  HrContactFormDialog,
  PageHeader,
  CardGridSkeleton,
} from '@/components'
import {
  useCompany,
  useCreateHrContact,
  useDeleteHrContact,
  useHrContactsByCompany,
  useUpdateHrContact,
} from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import { ROUTES, hrProfilePath } from '@/routes/paths'
import type { HrContact, HrContactRequest } from '@/types'

export function CompanyDetailsPage() {
  const { id = '0' } = useParams()
  const companyId = Number(id)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<HrContact | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<HrContact | null>(null)

  const { data: company, isLoading: companyLoading, isError, error } = useCompany(companyId)
  const { data: contacts = [], isLoading: contactsLoading } = useHrContactsByCompany(companyId)
  const createContact = useCreateHrContact(companyId)
  const updateContact = useUpdateHrContact()
  const deleteContact = useDeleteHrContact(companyId)

  const handleSave = (payload: HrContactRequest) => {
    if (editingContact) {
      updateContact.mutate(
        { id: editingContact.id, payload },
        {
          onSuccess: () => {
            enqueueSnackbar('HR contact updated', { variant: 'success' })
            setDialogOpen(false)
            setEditingContact(null)
          },
          onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
        },
      )
      return
    }

    createContact.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('HR contact added', { variant: 'success' })
        setDialogOpen(false)
      },
      onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
    })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteContact.mutate(deleteTarget.id, {
      onSuccess: () => {
        enqueueSnackbar('HR contact deleted', { variant: 'success' })
        setDeleteTarget(null)
      },
      onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
    })
  }

  if (isError) return <ErrorAlert message={getErrorMessage(error)} />

  return (
    <>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component="button" variant="body2" underline="hover" onClick={() => navigate(ROUTES.COMPANIES)}>
          Companies
        </Link>
        <Typography variant="body2" color="text.primary">
          {company?.name ?? 'Company'}
        </Typography>
      </Breadcrumbs>

      <PageHeader
        title={company?.name ?? 'Company Details'}
        subtitle="Company information and HR contacts"
        action={
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(ROUTES.COMPANIES)}>
            Back
          </Button>
        }
      />

      {companyLoading ? (
        <CardGridSkeleton count={1} />
      ) : (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="caption" color="text.secondary">Address</Typography>
                <Typography>{company?.address || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="caption" color="text.secondary">Website</Typography>
                <Typography>{company?.website || '—'}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">HR Contacts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingContact(null)
            setDialogOpen(true)
          }}
        >
          Add HR
        </Button>
      </Box>

      {contactsLoading && <CardGridSkeleton count={3} />}
      {!contactsLoading && contacts.length === 0 && (
        <EmptyState
          title="No HR contacts"
          description="Add HR contacts for this company."
          icon={<GroupsIcon sx={{ fontSize: 48 }} />}
        />
      )}
      {!contactsLoading && contacts.length > 0 && (
        <Grid container spacing={2}>
          {contacts.map((contact) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={contact.id}>
              <HrContactCard
                contact={contact}
                onOpen={() => navigate(hrProfilePath(contact.id))}
                onEdit={() => {
                  setEditingContact(contact)
                  setDialogOpen(true)
                }}
                onDelete={() => setDeleteTarget(contact)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <HrContactFormDialog
        open={dialogOpen}
        contact={editingContact}
        loading={createContact.isPending || updateContact.isPending}
        onClose={() => {
          setDialogOpen(false)
          setEditingContact(null)
        }}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete HR Contact"
        message={`Delete "${deleteTarget?.hrName}"?`}
        confirmLabel="Delete"
        loading={deleteContact.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}
