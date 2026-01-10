const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const ID_KEY = 'id'
const EMAIL_KEY = 'email'
const ROLES_KEY = 'roles'
const FULL_NAME_KEY = 'full_name'
const PROFILE_PICTURE_KEY = 'profile_picture'
const PROFILE_PICTURE_URL_KEY = 'profile_picture_url'
const MERCHANT_ID_KEY = 'merchant_id'
const MERCHANT_NAME_KEY = 'merchant_name'

export const token = {
  getAccess() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },
  setAccess(value: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, value)
  },
  removeAccess() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  },

  getRefresh() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },
  setRefresh(value: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, value)
  },
  removeRefresh() {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },

  getId() {
    return localStorage.getItem(ID_KEY)
  },
  setId(value: string) {
    localStorage.setItem(ID_KEY, value)
  },
  removeId() {
    localStorage.removeItem(ID_KEY)
  },

  getEmail() {
    return localStorage.getItem(EMAIL_KEY)
  },
  setEmail(value: string) {
    localStorage.setItem(EMAIL_KEY, value)
  },
  removeEmail() {
    localStorage.removeItem(EMAIL_KEY)
  },

  getRoles() {
    return localStorage.getItem(ROLES_KEY)?.split(',') || []
  },
  setRoles(value: string[]) {
    localStorage.setItem(ROLES_KEY, value.join(','))
  },
  removeRoles() {
    localStorage.removeItem(ROLES_KEY)
  },

  getFullName() {
    return localStorage.getItem(FULL_NAME_KEY)
  },
  setFullName(value: string) {
    localStorage.setItem(FULL_NAME_KEY, value)
  },
  removeFullName() {
    localStorage.removeItem(FULL_NAME_KEY)
  },

  getProfilePicture() {
    return localStorage.getItem(PROFILE_PICTURE_KEY)
  },
  setProfilePicture(value: string) {
    localStorage.setItem(PROFILE_PICTURE_KEY, value)
  },
  removeProfilePicture() {
    localStorage.removeItem(PROFILE_PICTURE_KEY)
  },

  getProfilePictureUrl() {
    return localStorage.getItem(PROFILE_PICTURE_URL_KEY)
  },
  setProfilePictureUrl(value: string) {
    localStorage.setItem(PROFILE_PICTURE_URL_KEY, value)
  },
  removeProfilePictureUrl() {
    localStorage.removeItem(PROFILE_PICTURE_URL_KEY)
  },

  getMerchantId() {
    return localStorage.getItem(MERCHANT_ID_KEY)
  },
  setMerchantId(value: string) {
    localStorage.setItem(MERCHANT_ID_KEY, value)
  },
  removeMerchantId() {
    localStorage.removeItem(MERCHANT_ID_KEY)
  },

  getMerchantName() {
    return localStorage.getItem(MERCHANT_NAME_KEY)
  },
  setMerchantName(value: string) {
    localStorage.setItem(MERCHANT_NAME_KEY, value)
  },
  removeMerchantName() {
    localStorage.removeItem(MERCHANT_NAME_KEY)
  },

  clear() {
    this.removeAccess()
    this.removeRefresh()
  }
}