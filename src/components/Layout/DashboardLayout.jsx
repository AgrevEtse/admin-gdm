import { Outlet } from 'react-router-dom'

import Navbar from '@/components/UI/Navbar'

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='h-full w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
