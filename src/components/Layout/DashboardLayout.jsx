import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
