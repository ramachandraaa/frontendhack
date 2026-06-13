export interface Reminder {
  id: number
  companyId?: number
  hrContactId?: number
  companyName?: string
  hrName?: string
  reminderDate: string
  reminderTime?: string
  reminderNote?: string
  createdAt?: string
  updatedAt?: string
}

export interface ReminderRequest {
  companyId?: number
  hrContactId?: number
  companyName?: string
  hrName?: string
  reminderDate: string
  reminderTime?: string
  reminderNote?: string
}
