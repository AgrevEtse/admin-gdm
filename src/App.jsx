import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import useAuth from '@/context/useAuth'

import Login from '@/components/Pages/Login'
import ProtectedRoute from '@/components/Layout/ProtectedRoute'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Dashboard from '@/components/Pages/Dashboard'
import ListStudentsAdmin from '@/components/Pages/ListStudentsAdmin'
import ListStudentsMortal from '@/components/Pages/ListStudentsMortal'
import StudentData from '@/components/Pages/StudentData'

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
                path='alumnos'
                element={<ListStudentsAdmin />}
              />
            ) : (
              <Route
                path='alumnos'
                element={<ListStudentsMortal />}
              />
            )}

            <Route
              path='alumnos/:curp'
              element={<StudentData />}
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
