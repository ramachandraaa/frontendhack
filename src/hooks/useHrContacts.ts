import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { hrContactsApi } from '@/api'
import type { HrContactRequest } from '@/types'
import { QUERY_STALE_TIME } from '@/utils/constants'

export const hrContactKeys = {
  all: ['hr-contacts'] as const,
  byCompany: (companyId: number) => [...hrContactKeys.all, 'company', companyId] as const,
  detail: (id: number) => [...hrContactKeys.all, id] as const,
}

export function useHrContactsByCompany(companyId: number) {
  return useQuery({
    queryKey: hrContactKeys.byCompany(companyId),
    queryFn: () => hrContactsApi.getByCompany(companyId),
    enabled: companyId > 0,
    staleTime: QUERY_STALE_TIME,
  })
}

export function useHrContact(id: number) {
  return useQuery({
    queryKey: hrContactKeys.detail(id),
    queryFn: () => hrContactsApi.getById(id),
    enabled: id > 0,
    staleTime: QUERY_STALE_TIME,
  })
}

export function useCreateHrContact(companyId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: HrContactRequest) => hrContactsApi.create(companyId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: hrContactKeys.byCompany(companyId) })
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useUpdateHrContact() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: HrContactRequest }) =>
      hrContactsApi.update(id, payload),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: hrContactKeys.all })
      void queryClient.invalidateQueries({ queryKey: hrContactKeys.detail(data.id) })
      if (data.companyId) {
        void queryClient.invalidateQueries({ queryKey: hrContactKeys.byCompany(data.companyId) })
      }
    },
  })
}

export function useDeleteHrContact(companyId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: hrContactsApi.delete,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: hrContactKeys.byCompany(companyId) })
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
