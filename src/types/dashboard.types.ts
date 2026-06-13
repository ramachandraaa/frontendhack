import type { Reminder } from './reminder.types'

export interface DashboardStats {
  totalCompanies: number
  totalHrs: number
  todaysReminders: Reminder[]
}
