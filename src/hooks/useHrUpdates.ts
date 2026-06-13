import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { hrUpdatesApi } from '@/api'
import type { HrUpdateRequest } from '@/types'
import { QUERY_STALE_TIME } from '@/utils/constants'

export const hrUpdateKeys = {
  all: ['hr-updates'] as const,
  byHrContact: (hrContactId: number) => [...hrUpdateKeys.all, 'hr', hrContactId] as const,
  byCompany: (companyId: number) => [...hrUpdateKeys.all, 'company', companyId] as const,
}

export function useHrUpdatesByContact(hrContactId: number) {
  return useQuery({
    queryKey: hrUpdateKeys.byHrContact(hrContactId),
    queryFn: () => hrUpdatesApi.getByHrContact(hrContactId),
    enabled: hrContactId > 0,
    staleTime: QUERY_STALE_TIME,
  })
}

export function useCreateHrUpdate(hrContactId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: HrUpdateRequest) => hrUpdatesApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: hrUpdateKeys.byHrContact(hrContactId) })
      void queryClient.invalidateQueries({ queryKey: ['activity'] })
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
