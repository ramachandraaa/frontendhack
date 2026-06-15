import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Tooltip } from '@mui/material'
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

type CallingListRow = Omit<CallingListItem, 'id'> & {
  id: number | null
  rowId: string | number
}
//
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

  const columns: GridColDef<CallingListRow>[] = [
    { field: 'companyName', headerName: 'Company Name', flex: 1, minWidth: 160 },
    { field: 'hrName', headerName: 'HR Name', flex: 1, minWidth: 140 },
    {
      field: 'mobile',
      headerName: 'Mobile',
      flex: 1,
      minWidth: 140,
      valueGetter: (_value, row) => row.mobile ?? '—',
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
      getActions: (params: GridRowParams<CallingListRow>) => [
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

  const handleRowClick = (params: GridRowParams<CallingListRow>) => {
    if (params.row.hrContactId) {
      navigate(hrProfilePath(params.row.hrContactId))
    }
  }

  const rows: CallingListRow[] = data.map((item, index) => {
    const { id, ...rest } = item
    return {
      ...rest,
      id: id ?? null,
      rowId: id ?? `temp-${index}`,
    }
  })

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
                  sx={{
                    height: 600,
                    '& .MuiDataGrid-row': { cursor: 'pointer' },
                  }}
                  pageSizeOptions={[10, 25]}
                  initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                  onRowClick={handleRowClick}
                  disableRowSelectionOnClick
              />
            </Card>
        )}
        <ConfirmDialog
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => { void handleDeleteConfirm() }}
            title="Delete Reminder"
            message="Are you sure you want to delete this reminder? This action cannot be undone."
        />
      </>
  )
}