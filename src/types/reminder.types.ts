export interface ReminderTime {
  hour: number
  minute: number
  second: number
  nano: number
}

export interface Reminder {
  id: number
  hrContactId?: number
  hrName?: string
  reminderDate: string
  reminderTime?: ReminderTime
  reminderNote?: string
  createdByUserId?: number
  createdByName?: string
}

export interface ReminderRequest {
  hrContactId?: number
  hrName?: string
  reminderDate: string
  reminderTime?: ReminderTime
  reminderNote?: string
}
