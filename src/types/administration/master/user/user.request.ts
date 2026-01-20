export interface UserRequest {
  email: string
  roles: string[]
  fullName: string
  profilePicture: string
  profilePictureUrl: string
  merchantId?: string
  merchantName?: string
  password?: string
  passwordConfirmation?: string
}