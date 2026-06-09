import axios from 'axios'
import { catApiClient } from '../../shared/api/catApiClient'
import { clearApiKey } from '../../shared/lib/storage'
import { router } from '../router'

catApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearApiKey()
      router.navigate('/auth')
    }
    return Promise.reject(error)
  }
)
