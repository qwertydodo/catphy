import axios from 'axios'
import { catApiClient } from '../../shared/api/catApiClient'
import { routes } from '../../shared/config/routes'
import { clearApiKey } from '../../shared/lib/storage'
import type { ApiError } from '../../shared/types/api'
import { router } from '../router'

catApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      code: String(axios.isAxiosError(error) ? (error.response?.status ?? 'UNKNOWN') : 'UNKNOWN'),
      message: (axios.isAxiosError(error) && error.response?.data?.message) || error.message,
    }

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearApiKey()
      router.navigate(routes.auth.path)
    }

    return Promise.reject(apiError)
  }
)
