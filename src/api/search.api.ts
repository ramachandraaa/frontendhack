import { apiClient } from './client'
import { unwrapData } from '@/utils/api'
import type { SearchResponse, SearchResult } from '@/types'

function normalizeSearchResults(response: SearchResponse): SearchResult[] {
  if (response.results?.length) return response.results

  const companyResults: SearchResult[] = (response.companies ?? []).map((company) => ({
    id: company.id,
    type: 'company' as const,
    label: company.name,
    subtitle: company.address ?? company.website,
    companyId: company.id,
    companyName: company.name,
  }))

  const hrResults: SearchResult[] = (response.hrContacts ?? []).map((hr) => ({
    id: hr.id,
    type: 'hr_contact' as const,
    label: hr.hrName,
    subtitle: [hr.companyName, hr.email, hr.mobile].filter(Boolean).join(' · '),
    companyId: hr.companyId,
    hrContactId: hr.id,
    companyName: hr.companyName,
    hrName: hr.hrName,
    email: hr.email,
    mobile: hr.mobile,
  }))

  return [...companyResults, ...hrResults]
}

export const searchApi = {
  search: async (query: string): Promise<SearchResult[]> => {
    const { data } = await apiClient.get('/search', { params: { q: query, query } })
    const response = unwrapData<SearchResponse>(data)
    return normalizeSearchResults(response)
  },
}
