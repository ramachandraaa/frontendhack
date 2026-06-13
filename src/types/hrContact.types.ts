export interface HrContact {
  id: number
  companyId: number
  companyName?: string
  hrName: string
  email?: string
  mobile?: string
  linkedin?: string
}

export interface HrContactRequest {
  hrName: string
  email?: string
  mobile?: string
  linkedin?: string
}
