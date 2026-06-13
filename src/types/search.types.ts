export type SearchResultType = 'company' | 'hr_contact'

export interface SearchResult {
  id: number
  type: SearchResultType
  label: string
  subtitle?: string
  companyId?: number
  hrContactId?: number
  companyName?: string
  hrName?: string
  email?: string
  mobile?: string
}

export interface SearchResponse {
  companies?: Array<{
    id: number
    name: string
    address?: string
    website?: string
  }>
  hrContacts?: Array<{
    id: number
    companyId: number
    companyName?: string
    hrName: string
    email?: string
    mobile?: string
    designation?: string
  }>
  results?: SearchResult[]
}
