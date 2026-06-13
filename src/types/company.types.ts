export interface Company {
  id: number
  companyName: string
  createdAt?: string
  updatedAt?: string
}

export interface CompanyRequest {
  companyName: string
}
