export interface UserResponse {
  id: string
  email: string
  roles: string[]
  fullName: string
  profilePictureFileId: string
  merchantId: string | null
  merchantName: string | null
}