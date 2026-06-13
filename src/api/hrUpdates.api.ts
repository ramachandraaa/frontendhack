import { apiClient } from './client'
import { unwrapData, unwrapList } from '@/utils/api'
import type { HrUpdate, HrUpdateRequest } from '@/types'

export const hrUpdatesApi = {
  getAll: async (): Promise<HrUpdate[]> => {
    const { data } = await apiClient.get('/hr-updates')
    return unwrapList<HrUpdate>(data)
  },

  getByHrContact: async (hrContactId: number): Promise<HrUpdate[]> => {
    const { data } = await apiClient.get(`/hr-updates/hr-contact/${hrContactId}`)
    return unwrapList<HrUpdate>(data)
  },

  getByCompany: async (companyId: number): Promise<HrUpdate[]> => {
    const { data } = await apiClient.get(`/hr-updates/company/${companyId}`)
    return unwrapList<HrUpdate>(data)
  },

  create: async (payload: HrUpdateRequest): Promise<HrUpdate> => {
    const { data } = await apiClient.post('/hr-updates', payload)
    return unwrapData<HrUpdate>(data)
  },
}
