import { useQuery } from '@tanstack/react-query'
import { callingListApi } from '@/api'
import { QUERY_STALE_TIME } from '@/utils/constants'

export function useCallingList() {
  return useQuery({
    queryKey: ['calling-list'],
    queryFn: callingListApi.getToday,
    staleTime: QUERY_STALE_TIME,
  })
}
