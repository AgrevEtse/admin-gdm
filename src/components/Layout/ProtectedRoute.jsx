import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

const ProtectedRoute = () => {
  const auth = useAuth()
  return auth.isAuthenticated() ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute
