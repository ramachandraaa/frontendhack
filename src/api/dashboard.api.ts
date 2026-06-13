import { apiClient } from './client'
import { unwrapData } from '@/utils/api'
import type { DashboardStats } from '@/types'

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get('/dashboard')
    const stats = unwrapData<DashboardStats>(data)
    return {
      totalCompanies: stats.totalCompanies ?? 0,
      totalHrContacts: stats.totalHrContacts ?? 0,
      totalUpdates: stats.totalUpdates ?? 0,
      todaysReminders: stats.todaysReminders ?? 0,
    }
  },
}
