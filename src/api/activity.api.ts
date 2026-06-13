import { apiClient } from './client'
import { unwrapList } from '@/utils/api'
import type { ActivityItem } from '@/types'

export const activityApi = {
  getAll: async (): Promise<ActivityItem[]> => {
    const { data } = await apiClient.get('/activity')
    const items = unwrapList<ActivityItem>(data)
    return items.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
  },
}
