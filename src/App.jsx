import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { useAuth } from '@/context/AuthContext'

import Login from '@/components/Pages/Login'
import ProtectedRoute from '@/components/Layout/ProtectedRoute'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Dashboard from '@/components/Pages/Dashboard'
import ListStudentsAdmin from '@/components/Pages/ListStudentsAdmin'
import ListStudentsMortal from '@/components/Pages/ListStudentsMortal'

const App = () => {
  const auth = useAuth()

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
              element={<Dashboard />}
            />

            {auth.user.rol === 'admin' ? (
              <Route
                path='students'
                element={<ListStudentsAdmin />}
              />
            ) : (
              <Route
                path='students'
                element={<ListStudentsMortal />}
              />
            )}
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
