import api from './axios'

export const authApi = {
  login(payload: { email: string; password: string }) {
    return api.post('/auth/signin', payload)
  },
  refresh(refreshToken: string) {
    return api.post('/auth/refresh', { refreshToken })
  }
}
