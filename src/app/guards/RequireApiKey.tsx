import { Navigate, Outlet } from 'react-router-dom'
import { getApiKey } from '../../shared/lib/storage'

export const RequireApiKey = () => {
  const key = getApiKey()
  return key ? <Outlet /> : <Navigate to="/auth" replace />
}
