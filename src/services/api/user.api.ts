import api from './axios'
import type { User } from '@/types/user'
import type { ApiListResponse } from '@/types/api'

export const userApi = {
  getAll() {
    return api.get<ApiListResponse<User>>('/users')
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