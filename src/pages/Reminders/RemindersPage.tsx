import { useMemo, useState } from 'react'
import { Button, Card } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
} from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import {
  EmptyState,
  ErrorAlert,
  PageHeader,
  TableSkeleton,
} from '@/components'
import { ReminderFormDialog } from '@/components/reminders/ReminderFormDialog'
import { useCreateReminder, useReminders, useUpdateReminder } from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import { formatDate, formatReminderTime } from '@/utils/date'
import type { Reminder, ReminderRequest } from '@/types'

export function RemindersPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)

  const { data = [], isLoading, isError, error } = useReminders()
  const createReminder = useCreateReminder()
  const updateReminder = useUpdateReminder()
  const { enqueueSnackbar } = useSnackbar()

  const handleSave = (payload: ReminderRequest) => {
    if (editingReminder) {
      updateReminder.mutate(
        { id: editingReminder.id, payload },
        {
          onSuccess: () => {
            enqueueSnackbar('Reminder updated', { variant: 'success' })
            setDialogOpen(false)
            setEditingReminder(null)
          },
          onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
        },
      )
      return
    }

    createReminder.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Reminder created', { variant: 'success' })
        setDialogOpen(false)
      },
      onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
    })
  }

  const columns: GridColDef<Reminder>[] = useMemo(
    () => [
      { field: 'hrName', headerName: 'HR Name', flex: 1, minWidth: 140 },
      {
        field: 'reminderDate',
        headerName: 'Reminder Date',
        width: 140,
        valueFormatter: (value) => formatDate(String(value)),
      },
      {
        field: 'reminderTime',
        headerName: 'Reminder Time',
        width: 130,
        valueFormatter: (value) => formatReminderTime(value as { hour: number; minute: number } | null),
      },
      { field: 'reminderNote', headerName: 'Reminder Note', flex: 1.2, minWidth: 180 },
      { field: 'createdByName', headerName: 'Created By', width: 140 },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              setEditingReminder(params.row)
              setDialogOpen(true)
            }}
          />,
        ],
      },
    ],
    [],
  )

  return (
    <>
      <PageHeader
        title="Reminders"
        subtitle="Track follow-ups and scheduled calls"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingReminder(null)
              setDialogOpen(true)
            }}
          >
            Add Reminder
          </Button>
        }
      />

      {isError && <ErrorAlert message={getErrorMessage(error)} />}
      {isLoading && <TableSkeleton />}
      {!isLoading && !isError && data.length === 0 && (
        <EmptyState
          title="No reminders"
          description="Create reminders to stay on top of follow-ups."
          icon={<NotificationsIcon sx={{ fontSize: 48 }} />}
        />
      )}
      {!isLoading && data.length > 0 && (
        <Card>
          <DataGrid
            rows={data}
            columns={columns}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
          />
        </Card>
      )}

      <ReminderFormDialog
        open={dialogOpen}
        reminder={editingReminder}
        loading={createReminder.isPending || updateReminder.isPending}
        onClose={() => {
          setDialogOpen(false)
          setEditingReminder(null)
        }}
        onSubmit={handleSave}
      />
    </>
  )
}
