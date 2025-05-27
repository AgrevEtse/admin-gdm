import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

const ProtectedRoute = () => {
  const auth = useAuth()
  return auth?.user.token ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute
