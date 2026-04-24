export interface UserRolesRequest {
  userId: string
  roles: UserRoleRequestItem[]
}

export interface UserRoleRequestItem {
  roleId: string
}
