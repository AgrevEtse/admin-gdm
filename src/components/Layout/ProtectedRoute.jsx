import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '@/context/useAuth'

const ProtectedRoute = () => {
  const auth = useAuth()
  return auth.isAuthenticated() ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute
