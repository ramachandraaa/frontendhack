import { apiClient } from './client'
import { unwrapList } from '@/utils/api'
import type { CallingListItem } from '@/types'

export const callingListApi = {
  getToday: async (): Promise<CallingListItem[]> => {
    const { data } = await apiClient.get('/calling-list/today')
    return unwrapList<CallingListItem>(data)
  },
}
