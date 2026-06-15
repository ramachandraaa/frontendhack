export interface FollowUpRequest {
  time: string
  update: string
}

export interface FollowUpResponse {
  id: number
  updateText: string
  companyId: number
  companyName: string
  hrContactId: number
  hrName: string
  createdByUserId: number
  createdByName: string
  timestamp: number
}
