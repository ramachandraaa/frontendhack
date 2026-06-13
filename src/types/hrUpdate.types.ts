export interface HrUpdate {
  id: number
  hrContactId: number
  companyId?: number
  hrName?: string
  companyName?: string
  updateText: string
  addedBy?: string
  createdAt: string
}

export interface HrUpdateRequest {
  hrContactId: number
  updateText: string
}
