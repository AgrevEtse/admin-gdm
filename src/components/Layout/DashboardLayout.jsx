import { Outlet } from 'react-router-dom'

import NavBar from '@/components/UI/NavBar'

const DashboardLayout = () => {
  return (
    <div>
      <NavBar />
      <div className='h-full w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
