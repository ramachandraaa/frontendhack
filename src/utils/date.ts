import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function formatDate(value?: string | null): string {
  if (!value) return '—'
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format('MMM D, YYYY') : value
}

export function formatDateTime(value?: string | null): string {
  if (!value) return '—'
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format('MMM D, YYYY h:mm A') : value
}

export function formatTime(value?: string | null): string {
  if (!value) return '—'
  const parsed = dayjs(value, ['HH:mm:ss', 'HH:mm', 'h:mm A'])
  return parsed.isValid() ? parsed.format('h:mm A') : value
}

export function formatRelative(value?: string | null): string {
  if (!value) return '—'
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.fromNow() : value
}

export function combineDateTime(date: string, time?: string): string {
  if (!time) return date
  return `${date}T${time}`
}
