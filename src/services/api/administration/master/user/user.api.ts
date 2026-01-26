import api from '../../../axios'
import type { User } from '@/types/administration/master/user/user.entity'
import type { UserRequest } from '@/types/administration/master/user/user.request'
import type { UserUpdatePassword } from '@/types/administration/master/user/user.update.password'
import type { ApiResponse } from '@/types/api/apiResponse'
import type { ApiListResponse } from '@/types/api/apiListResponse'

export const userApi = {
  getAll(params: any) {
    return api.get<ApiListResponse<User>>('/users', { params })
  },
  getUser(id: string) {
    return api.get<ApiResponse<UserRequest>>(`/users/${id}`)
  },
  create(payload: UserRequest) {
    return api.post<ApiResponse<UserRequest>>('/users', payload)
  },
  update(id: string, payload: UserRequest) {
    return api.put<ApiResponse<UserRequest>>(`/users/${id}`, payload)
  },
  updatePassword(id: string, payload: UserUpdatePassword) {
    return api.put<ApiResponse<UserUpdatePassword>>(`/users/${id}/password`, payload)
  },
  delete(id: string) {
    return api.delete<ApiResponse<User>>(`/users/${id}`)
  }
}