import api from '../../../axios'
import type { Role } from '@/types/administration/master/role/role.entity'
import type { AllRolesWithUserRolesStatus } from '@/types/administration/master/user_role/all_role_available_user.entity'
import type { RoleRequest } from '@/types/administration/master/role/role.request'
import type { UserRolesRequest } from '@/types/administration/master/user_role/user_role.request'
import type { ApiResponse } from '@/types/api/apiResponse'
import type { ApiListResponse } from '@/types/api/apiListResponse'

export const userRoleApi = {
  getAll(params: any) {
    return api.get<ApiListResponse<Role>>('/user-roles', { params })
  },
  getRole(id: string) {
    return api.get<ApiResponse<RoleRequest>>(`/user-roles/${id}`)
  },
  getAllRolesWithUserRolesStatus(id: string){
    return api.get<ApiListResponse<AllRolesWithUserRolesStatus>>(`/user-roles/all-available-roles/${id}`)
  },
  updateUserRoles(id: string, payload: UserRolesRequest) {
    return api.put<ApiResponse<UserRolesRequest>>(`/user-roles/user/${id}`, payload)
  },
  create(payload: RoleRequest) {
    return api.post<ApiResponse<RoleRequest>>('/user-roles', payload)
  },
  // update(id: string, payload: RoleRequest) {
  //   return api.put<ApiResponse<RoleRequest>>(`/user-roles/${id}`, payload)
  // },
  delete(id: string) {
    return api.delete<ApiResponse<Role>>(`/user-roles/${id}`)
  }
}
