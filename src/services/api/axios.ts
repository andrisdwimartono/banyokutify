import axios from 'axios'
import { token } from '@/utils/token'
import { useAuthStore } from '@/stores/auth.store'
import { pinia } from '@/plugins/pinia'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000
})

api.interceptors.request.use((config) => {
  const accessToken = token.getAccess()
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => {
    error ? p.reject(error) : p.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  res => {
    const auth = useAuthStore(pinia)
    return res
  },
  async error => {
    const originalRequest = error.config
    const auth = useAuthStore(pinia)

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      auth.getAuth().refreshToken
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(api(originalRequest))
            },
            reject: (error: any) => {
              reject(error)
            }
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refreshtoken`,
          { refreshToken: auth.refreshToken }
        )

        auth.updateAccessToken(res.data.accessToken)
        processQueue(null, res.data.accessToken)

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`

        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        // redirect to login
        auth.logout()
        router.push('/login')
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api