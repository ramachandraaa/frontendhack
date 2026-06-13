import { useQuery } from '@tanstack/react-query'
import { activityApi } from '@/api'
import { QUERY_STALE_TIME } from '@/utils/constants'

export function useActivity() {
  return useQuery({
    queryKey: ['activity'],
    queryFn: activityApi.getAll,
    staleTime: QUERY_STALE_TIME,
  })
}
