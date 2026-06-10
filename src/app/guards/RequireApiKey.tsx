import { Navigate, Outlet } from 'react-router-dom'
import { routes } from '../../shared/config/routes'
import { getApiKey } from '../../shared/lib/storage'

export const RequireApiKey = () => {
  const key = getApiKey()
  return key ? <Outlet /> : <Navigate to={routes.auth.path} replace />
}
