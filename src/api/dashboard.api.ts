import { apiClient } from './client'
import { unwrapData } from '@/utils/api'
import type { DashboardStats } from '@/types'

export interface DashboardResponse {
  totalCompanies: number
  totalHrContacts: number
  totalHrs: number
  todaysReminders: DashboardStats['todaysReminders']
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get('/dashboard')
    const raw = unwrapData<DashboardResponse>(data)
    return {
      totalCompanies: raw.totalCompanies ?? 0,
      totalHrs: raw.totalHrs ?? raw.totalHrContacts ?? 0,
      todaysReminders: Array.isArray(raw.todaysReminders) ? raw.todaysReminders : [],
    }
  },
}
