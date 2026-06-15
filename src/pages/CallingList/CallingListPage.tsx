import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Tooltip,
} from '@mui/material'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridRowParams,
} from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import { useQueryClient } from '@tanstack/react-query'
import {
  ConfirmDialog,
  EmptyState,
  ErrorAlert,
  PageHeader,
  TableSkeleton,
} from '@/components'
import { useCallingList } from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import { hrProfilePath } from '@/routes/paths'
import { formatTime } from '@/utils/date'
import type { CallingListItem } from '@/types'
import { callingListApi } from '@/api'

export function CallingListPage() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { data = [], isLoading, isError, error } = useCallingList()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [reminderToDelete, setReminderToDelete] = useState<number | null>(null)

  const handleDeleteClick = (id: number) => {
    setReminderToDelete(id)
    setOpenConfirm(true)
  }

  const handleDeleteConfirm = async () => {
    if (reminderToDelete) {
      try {
        await callingListApi.delete(reminderToDelete)
        enqueueSnackbar('Reminder deleted successfully', { variant: 'success' })
        await queryClient.invalidateQueries({ queryKey: ['calling-list'] })
      } catch (err) {
        enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
      } finally {
        setOpenConfirm(false)
        setReminderToDelete(null)
      }
    }
  }

  const columns: GridColDef<CallingListItem>[] = [
    { field: 'companyName', headerName: 'Company Name', flex: 1, minWidth: 160 },
    { field: 'hrName', headerName: 'HR Name', flex: 1, minWidth: 140 },
    {
      field: 'mobile',
      headerName: 'Mobile',
      flex: 1,
      minWidth: 140,
      valueGetter: (_, row) => row.mobile ?? '—',
    },
    {
      field: 'reminderTime',
      headerName: 'Reminder Time',
      width: 130,
      valueFormatter: (value) => formatTime(value ? String(value) : undefined),
    },
    { field: 'reminderNote', headerName: 'Reminder Note', flex: 1.2, minWidth: 180 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key="call"
          icon={<Tooltip title="Call"><PhoneInTalkIcon /></Tooltip>}
          label="Call"
          onClick={() => {
            // TODO: Implement calling functionality
          }}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Tooltip title="Delete Reminder"><DeleteIcon /></Tooltip>}
          label="Delete Reminder"
          onClick={() => handleDeleteClick(params.row.id as number)}
          disabled={!params.row.id}
        />,
      ],
    },
  ]

  const handleRowClick = (params: GridRowParams<CallingListItem>) => {
    if (params.row.hrContactId) {
      navigate(hrProfilePath(params.row.hrContactId))
    }
  }

  // The API response for /calling-list/today does not include a unique ID for each item.
  // The DataGrid requires a unique `id` for each row. We can use the index as a fallback,
  // but this is not ideal. The delete functionality will not work without a real ID.
  // I've disabled the delete button for rows without an ID.
  const rows = data.map((item, index) => ({
    ...item,
    id: item.id ?? null, // The API should provide a unique ID for each reminder
    rowId: item.id ?? `temp-${index}`, // A unique key for React rendering
  }))

  return (
    <>
      <PageHeader
        title="Today's Calls"
        subtitle="Today's prioritized calls"
      />

      {isError && <ErrorAlert message={getErrorMessage(error)} />}
      {isLoading && <TableSkeleton />}
      {!isLoading && !isError && data.length === 0 && (
        <EmptyState
          title="No calls for today"
          description="Your calling list is empty."
          icon={<PhoneInTalkIcon sx={{ fontSize: 48 }} />}
        />
      )}
      {!isLoading && data.length > 0 && (
        <Card>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.rowId}
            autoHeight
            pageSizeOptions={[10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowClick={handleRowClick}
            sx={{ '& .MuiDataGrid-row': { cursor: 'pointer' } }}
            disableRowSelectionOnClick
          />
        </Card>
      )}
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Reminder"
        description="Are you sure you want to delete this reminder? This action cannot be undone."
      />
    </>
  )
}
