import api from '../../../axios'
import type { Role } from '@/types/administration/master/role/role.entity'
import type { RoleRequest } from '@/types/administration/master/role/role.request'
import type { ApiResponse } from '@/types/api/apiResponse'
import type { ApiListResponse } from '@/types/api/apiListResponse'

export const roleApi = {
  getAll(params: any) {
    return api.get<ApiListResponse<Role>>('/roles', { params })
  },
  getRole(id: string) {
    return api.get<ApiResponse<RoleRequest>>(`/roles/${id}`)
  },
  create(payload: RoleRequest) {
    return api.post<ApiResponse<RoleRequest>>('/roles', payload)
  },
  update(id: string, payload: RoleRequest) {
    return api.put<ApiResponse<RoleRequest>>(`/roles/${id}`, payload)
  },
  delete(id: string) {
    return api.delete<ApiResponse<Role>>(`/roles/${id}`)
  }
}
