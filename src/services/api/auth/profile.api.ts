import api from './../axios'

export const profileApi = {
  getProfile() {
    return api.get('/users/me')
  },
}
