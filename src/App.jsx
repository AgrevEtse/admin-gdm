import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Login from '@/components/Pages/Login'
import ProtectedRoute from '@/components/Layout/ProtectedRoute'
import DashboardLayout from '@/components/Layout/DashboardLayout'

import { AuthContext } from '@/context/AuthContext'

const App = () => {
  const auth = useContext(AuthContext)

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path='/dashboard'
            element={<DashboardLayout />}
          >
            <Route
              index
              element={<h2>Dashboard Home {auth.user.rol}</h2>}
            />
          </Route>
        </Route>
      </Routes>
      <Toaster
        position='top-center'
        reverseOrder={true}
      />
    </>
  )
}

export default App
