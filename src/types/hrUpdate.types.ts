export interface HrUpdate {
  id: number
  hrContactId: number
  companyId?: number
  hrName?: string
  companyName?: string
  updateText: string
  createdByUserId?: number
  createdByName?: string
  timestamp?: number
}

export interface HrUpdateRequest {
  hrContactId: number
  updateText: string
}
