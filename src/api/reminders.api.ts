import { apiClient } from './client'
import { unwrapData, unwrapList } from '@/utils/api'
import type { Reminder, ReminderRequest } from '@/types'

export const remindersApi = {
  getAll: async (): Promise<Reminder[]> => {
    const { data } = await apiClient.get('/reminders')
    return unwrapList<Reminder>(data)
  },

  getToday: async (): Promise<Reminder[]> => {
    const { data } = await apiClient.get('/reminders/today')
    return unwrapList<Reminder>(data)
  },

  create: async (payload: ReminderRequest): Promise<Reminder> => {
    const { data } = await apiClient.post('/reminders', payload)
    return unwrapData<Reminder>(data)
  },

  update: async (id: number, payload: ReminderRequest): Promise<Reminder> => {
    const { data } = await apiClient.put(`/reminders/${id}`, payload)
    return unwrapData<Reminder>(data)
  },
}
