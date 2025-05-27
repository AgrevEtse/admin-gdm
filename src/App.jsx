import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '@/components/Pages/Login'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from '@/components/Layout/DashboardLayout'

import { AuthContext } from '@/context/AuthContext'

function App() {
  const auth = useContext(AuthContext)

  return (
    <main className='flex flex-row items-center justify-center w-[90vw] min-h-[80vh] my-[10vh] mx-auto'>
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
    </main>
  )
}

export default App
