import { useNavigate } from 'react-router-dom'
import { Card } from '@mui/material'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from '@mui/x-data-grid'
import {
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

export function CallingListPage() {
  const navigate = useNavigate()
  const { data = [], isLoading, isError, error } = useCallingList()

  const columns: GridColDef<CallingListItem>[] = [
    { field: 'companyName', headerName: 'Company Name', flex: 1, minWidth: 160 },
    { field: 'hrName', headerName: 'HR Name', flex: 1, minWidth: 140 },
    {
      field: 'mobileNumber',
      headerName: 'Mobile Number',
      flex: 1,
      minWidth: 140,
      valueGetter: (_, row) => row.mobileNumber ?? row.mobile ?? '—',
    },
    {
      field: 'reminderTime',
      headerName: 'Reminder Time',
      width: 130,
      valueFormatter: (value) => formatTime(value ? String(value) : undefined),
    },
    { field: 'reminderNote', headerName: 'Reminder Note', flex: 1.2, minWidth: 180 },
  ]

  const handleRowClick = (params: GridRowParams<CallingListItem>) => {
    if (params.row.hrContactId) {
      navigate(hrProfilePath(params.row.hrContactId))
    }
  }

  return (
    <>
      <PageHeader
        title="Calling List"
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
            rows={data.map((item, index) => ({ ...item, id: item.id ?? index }))}
            columns={columns}
            autoHeight
            pageSizeOptions={[10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowClick={handleRowClick}
            sx={{ '& .MuiDataGrid-row': { cursor: 'pointer' } }}
            disableRowSelectionOnClick
          />
        </Card>
      )}
    </>
  )
}
