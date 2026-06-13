import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { companiesApi } from '@/api'
import type { CompanyRequest } from '@/types'
import { QUERY_STALE_TIME } from '@/utils/constants'

export const companyKeys = {
  all: ['companies'] as const,
  detail: (id: number) => [...companyKeys.all, id] as const,
}

export function useCompanies() {
  return useQuery({
    queryKey: companyKeys.all,
    queryFn: companiesApi.getAll,
    staleTime: QUERY_STALE_TIME,
  })
}

export function useCompany(id: number) {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: () => companiesApi.getById(id),
    enabled: id > 0,
    staleTime: QUERY_STALE_TIME,
  })
}

export function useCreateCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: companiesApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: companyKeys.all })
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useUpdateCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CompanyRequest }) =>
      companiesApi.update(id, payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: companyKeys.all })
      void queryClient.invalidateQueries({ queryKey: companyKeys.detail(variables.id) })
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useDeleteCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: companiesApi.delete,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: companyKeys.all })
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
