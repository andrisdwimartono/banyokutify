import api from '../../../axios'
import type { User } from '@/types/administration/master/user/user.entity'
import type { ApiListResponse } from '@/types/api/apiListResponse'
import type { UserRequest } from '@/types/administration/master/user/user.request'
import type { UserUpdatePassword } from '@/types/administration/master/user/user.update.password'

export const userApi = {
  getAll(params: any) {
    return api.get<ApiListResponse<User>>('/users', { params })
  },
  getUser(id: string) {
    return api.get<UserRequest>(`/users/${id}`)
  },
  create(payload: UserRequest) {
    return api.post<UserRequest>('/users', payload)
  },
  update(id: string, payload: UserRequest) {
    return api.put<UserRequest>(`/users/${id}`, payload)
  },
  updatePassword(id: string, payload: UserUpdatePassword) {
    return api.put<UserUpdatePassword>(`/users/${id}/password`, payload)
  },
  delete(id: string) {
    return api.delete<User>(`/users/${id}`)
  }
}