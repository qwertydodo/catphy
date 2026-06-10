import axios from 'axios'
import { env } from '../config/env'
import { getApiKey } from '../lib/storage'

export const catApiClient = axios.create({
  baseURL: env.catApiBaseUrl,
})

catApiClient.interceptors.request.use((config) => {
  const key = getApiKey()
  if (key) config.headers['x-api-key'] = key
  return config
})
