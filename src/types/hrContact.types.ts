export interface HrContact {
  id: number
  companyId: number
  companyName?: string
  hrName: string
  designation?: string
  email?: string
  mobile?: string
  alternateMobile?: string
  linkedIn?: string
  createdAt?: string
  updatedAt?: string
}

export interface HrContactRequest {
  hrName: string
  designation?: string
  email?: string
  mobile?: string
  alternateMobile?: string
  linkedIn?: string
}
