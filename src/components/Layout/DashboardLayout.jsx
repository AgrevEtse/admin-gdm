import { Outlet } from 'react-router-dom'

import NavBar from '@/components/UI/NavBar'

const DashboardLayout = () => {
  return (
    <>
      <NavBar />
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </>
  )
}

export default DashboardLayout
