import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/api'
import { QUERY_STALE_TIME } from '@/utils/constants'

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.getStats,
    staleTime: QUERY_STALE_TIME,
  })
}
