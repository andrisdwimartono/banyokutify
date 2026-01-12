import api from './axios'
import type { User } from '@/types/user'
import type { ApiListResponse } from '@/types/apiListResponse'

export const userApi = {
  getAll(params: { page: number; size: number; search?: string }) {
    return api.get<ApiListResponse<User>>('/users', { params })
  },
  getUser(id: string) {
    return api.get<User>(`/users/${id}`)
  },
  create(payload: User) {
    return api.post<User>('/users', payload)
  },
  update(id: string, payload: User) {
    return api.put<User>(`/users/${id}`, payload)
  },
  delete(id: string) {
    return api.delete<User>(`/users/${id}`)
  }
}