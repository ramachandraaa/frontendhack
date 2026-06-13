export function getDisplayName(
  firstName?: string,
  lastName?: string,
  username?: string,
): string {
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  return fullName || username || 'User'
}

export function truncate(text: string, max = 120): string {
  if (text.length <= max) return text
  return `${text.slice(0, max)}...`
}
