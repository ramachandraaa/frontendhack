import { useMemo, useState } from 'react'
import { Button, Card, TextField, InputAdornment } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BusinessIcon from '@mui/icons-material/Business'
import {
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
} from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import {
  CompanyFormDialog,
  ConfirmDialog,
  EmptyState,
  ErrorAlert,
  PageHeader,
  TableSkeleton,
} from '@/components'
import {
  useCompanies,
  useCreateCompany,
  useDeleteCompany,
  useUpdateCompany,
} from '@/hooks'
import { getErrorMessage } from '@/utils/api'
import type { Company, CompanyRequest } from '@/types'

export function CompaniesPage() {
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null)

  const { data = [], isLoading, isError, error } = useCompanies()
  const createCompany = useCreateCompany()
  const updateCompany = useUpdateCompany()
  const deleteCompany = useDeleteCompany()
  const { enqueueSnackbar } = useSnackbar()

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return data
    return data.filter(
      (company) =>
        company.companyName.toLowerCase().includes(query),
    )
  }, [data, search])

  const handleSave = (payload: CompanyRequest) => {
    if (editingCompany) {
      updateCompany.mutate(
        { id: editingCompany.id, payload },
        {
          onSuccess: () => {
            enqueueSnackbar('Company updated', { variant: 'success' })
            setDialogOpen(false)
            setEditingCompany(null)
          },
          onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
        },
      )
      return
    }

    createCompany.mutate(payload, {
      onSuccess: () => {
        enqueueSnackbar('Company created', { variant: 'success' })
        setDialogOpen(false)
      },
      onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
    })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteCompany.mutate(deleteTarget.id, {
      onSuccess: () => {
        enqueueSnackbar('Company deleted', { variant: 'success' })
        setDeleteTarget(null)
      },
      onError: (err) => enqueueSnackbar(getErrorMessage(err), { variant: 'error' }),
    })
  }

  const columns: GridColDef<Company>[] = [
    { field: 'companyName', headerName: 'Company Name', flex: 1, minWidth: 180 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setEditingCompany(params.row)
            setDialogOpen(true)
          }}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => setDeleteTarget(params.row)}
        />,
      ],
    },
  ]

  return (
    <>
      <PageHeader
        title="Companies"
        subtitle="Manage company accounts"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingCompany(null)
              setDialogOpen(true)
            }}
          >
            Add Company
          </Button>
        }
      />

      <TextField
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 2, maxWidth: 360 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {isError && <ErrorAlert message={getErrorMessage(error)} />}
      {isLoading && <TableSkeleton />}
      {!isLoading && !isError && filtered.length === 0 && (
        <EmptyState
          title="No companies found"
          description="Add your first company to get started."
          icon={<BusinessIcon sx={{ fontSize: 48 }} />}
          action={
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
              Add Company
            </Button>
          }
        />
      )}
      {!isLoading && filtered.length > 0 && (
        <Card>
          <DataGrid
            rows={filtered}
            columns={columns}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
          />
        </Card>
      )}

      <CompanyFormDialog
        open={dialogOpen}
        company={editingCompany}
        loading={createCompany.isPending || updateCompany.isPending}
        onClose={() => {
          setDialogOpen(false)
          setEditingCompany(null)
        }}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Company"
        message={`Delete "${deleteTarget?.companyName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteCompany.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}
