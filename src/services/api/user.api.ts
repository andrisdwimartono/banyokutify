import api from './axios'

export const userApi = {
  getAll() {
    return api.get('/users')
  },
  create(payload: any) {
    return api.post('/users', payload)
  }
}
