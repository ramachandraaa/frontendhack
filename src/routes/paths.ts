export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  COMPANIES: '/companies',
  COMPANY_DETAILS: '/companies/:id',
  HR_PROFILE: '/hr/:hrContactId',
  REMINDERS: '/reminders',
  CALLING_LIST: '/calling-list',
  ACTIVITY: '/activity',
  SEARCH: '/search',
} as const

export function companyDetailsPath(id: number) {
  return `/companies/${id}`
}

export function hrProfilePath(hrContactId: number) {
  return `/hr/${hrContactId}`
}
