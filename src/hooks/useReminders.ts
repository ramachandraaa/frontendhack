import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { remindersApi } from '@/api'
import type { ReminderRequest } from '@/types'
import { QUERY_STALE_TIME } from '@/utils/constants'

export const reminderKeys = {
  all: ['reminders'] as const,
  today: ['reminders', 'today'] as const,
}

export function useReminders() {
  return useQuery({
    queryKey: reminderKeys.all,
    queryFn: remindersApi.getAll,
    staleTime: QUERY_STALE_TIME,
  })
}
//
export function useCreateReminder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: remindersApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reminderKeys.all })
      void queryClient.invalidateQueries({ queryKey: reminderKeys.today })
      void queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      void queryClient.invalidateQueries({ queryKey: ['calling-list'] })
    },
  })
}

export function useUpdateReminder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ReminderRequest }) =>
      remindersApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reminderKeys.all })
      void queryClient.invalidateQueries({ queryKey: reminderKeys.today })
      void queryClient.invalidateQueries({ queryKey: ['calling-list'] })
    },
  })
}
