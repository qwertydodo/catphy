import axios from 'axios'
import { env } from '../config/env'
import { clearApiKey, getApiKey } from '../lib/storage'

export const httpClient = axios.create({
  baseURL: env.catApiBaseUrl,
})

httpClient.interceptors.request.use((config) => {
  const key = getApiKey()
  if (key) config.headers['x-api-key'] = key
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearApiKey()
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth'
      }
    }
    return Promise.reject(error)
  }
)
