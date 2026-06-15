import { apiClient } from './client'
import { unwrapData, unwrapList } from '@/utils/api'
import type { HrContact, HrContactRequest, FollowUpRequest, FollowUpResponse } from '@/types'

export const hrContactsApi = {
  getAll: async (): Promise<HrContact[]> => {
    const { data } = await apiClient.get('/hr-contacts')
    return unwrapList<HrContact>(data)
  },

  getById: async (id: number): Promise<HrContact> => {
    const { data } = await apiClient.get(`/hr-contacts/${id}`)
    return unwrapData<HrContact>(data)
  },

  getByCompany: async (companyId: number): Promise<HrContact[]> => {
    const { data } = await apiClient.get(`/companies/${companyId}/hr-contacts`)
    return unwrapList<HrContact>(data)
  },

  create: async (companyId: number, payload: HrContactRequest): Promise<HrContact> => {
    const { data } = await apiClient.post(`/companies/${companyId}/hr-contacts`, payload)
    return unwrapData<HrContact>(data)
  },

  update: async (id: number, payload: HrContactRequest): Promise<HrContact> => {
    const { data } = await apiClient.put(`/hr-contacts/${id}`, payload)
    return unwrapData<HrContact>(data)
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/hr-contacts/${id}`)
  },

  addFollowUp: async (hrContactId: number, payload: FollowUpRequest): Promise<FollowUpResponse> => {
    const { data } = await apiClient.post(`/hr-contacts/${hrContactId}/updates`, payload)
    return unwrapData<FollowUpResponse>(data)
  },
}
