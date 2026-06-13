import { apiClient } from './client'
import { unwrapData, unwrapList } from '@/utils/api'
import type { Company, CompanyRequest } from '@/types'

export const companiesApi = {
  getAll: async (): Promise<Company[]> => {
    const { data } = await apiClient.get('/companies')
    return unwrapList<Company>(data)
  },

  getById: async (id: number): Promise<Company> => {
    const { data } = await apiClient.get(`/companies/${id}`)
    return unwrapData<Company>(data)
  },

  create: async (payload: CompanyRequest): Promise<Company> => {
    const { data } = await apiClient.post('/companies', payload)
    return unwrapData<Company>(data)
  },

  update: async (id: number, payload: CompanyRequest): Promise<Company> => {
    const { data } = await apiClient.put(`/companies/${id}`, payload)
    return unwrapData<Company>(data)
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/companies/${id}`)
  },
}
