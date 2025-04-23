import { Route, Routes } from 'react-router-dom'

import Home from './components/Pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/Layout/DashboardLayout'

function App() {
  return (
    <main className='flex flex-row items-center justify-center w-[90vw] min-h-[80vh] my-[10vh] mx-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<h2>Dashboard Home</h2>} />
            <Route path='settings' element={<h2>Dashboard Settings</h2>} />
            <Route path='profile' element={<h2>Dashboard Profile</h2>} />
          </Route>
        </Route>
      </Routes>
    </main>
  )
}

export default App
