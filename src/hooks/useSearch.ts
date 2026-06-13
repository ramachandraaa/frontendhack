import { useQuery } from '@tanstack/react-query'
import { searchApi } from '@/api'
import { useDebounce } from './useDebounce'

export function useSearch(query: string) {
  const debouncedQuery = useDebounce(query.trim())
  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchApi.search(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 30_000,
  })
}
