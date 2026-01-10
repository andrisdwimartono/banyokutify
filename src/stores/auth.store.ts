import { defineStore } from 'pinia'
import { token } from '@/utils/token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    id: token.getId() || '',
    email: token.getEmail() || '',
    roles: token.getRoles() || [],
    fullName: token.getFullName() || '',
    profilePicture: token.getProfilePicture() || '',
    profilePictureUrl: token.getProfilePictureUrl() || '',
    merchantId: token.getMerchantId() || '',
    merchantName: token.getMerchantName() || '',
    accessToken: token.getAccess() || '',
    refreshToken: token.getRefresh() || ''
  }),

  getters: {
    isAuthenticated: (s) => !!s.accessToken,
    hasRole: (s) => (roles: string[]) =>
      roles.some(r => s.roles.includes(r))
  },

  actions: {
    setAuth(payload: {
      id: string
      email: string
      roles: string[]
      fullName: string
      profilePicture: string
      profilePictureUrl: string
      merchantId: string
      merchantName: string
      accessToken: string
      refreshToken: string
    }) {
      this.id = payload.id
      this.email = payload.email
      this.roles = payload.roles
      this.fullName = payload.fullName
      this.profilePicture = payload.profilePicture
      this.profilePictureUrl = payload.profilePictureUrl
      this.merchantId = payload.merchantId
      this.merchantName = payload.merchantName
      this.accessToken = payload.accessToken
      this.refreshToken = payload.refreshToken

      token.setAccess(payload.accessToken)
      token.setRefresh(payload.refreshToken)
      token.setId(payload.id)
      token.setEmail(payload.email)
      token.setRoles(payload.roles)
      token.setFullName(payload.fullName)
      token.setProfilePicture(payload.profilePicture)
      token.setProfilePictureUrl(payload.profilePictureUrl)
      token.setMerchantId(payload.merchantId)
      token.setMerchantName(payload.merchantName)
    },

    getAuth() {
      return {
        id: token.getId(),
        email: token.getEmail(),
        roles: token.getRoles(),
        fullName: token.getFullName(),
        profilePicture: token.getProfilePicture(),
        profilePictureUrl: token.getProfilePictureUrl(),
        merchantId: token.getMerchantId(),
        merchantName: token.getMerchantName(),
        accessToken: token.getAccess(),
        refreshToken: token.getRefresh()
      }
    },

    updateAccessToken(accessToken: string) {
      this.accessToken = accessToken
      token.setAccess(accessToken)
    },

    logout() {
      this.$reset()
      token.clear()
    }
  }
})