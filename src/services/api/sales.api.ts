import api from './axios'

export const salesApi = {
  getAll() {
    return api.get('/sales')
  },
  create(payload: any) {
    return api.post('/sales', payload)
  }
}
