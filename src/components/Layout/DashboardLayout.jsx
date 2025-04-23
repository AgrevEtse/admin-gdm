import { Outlet } from 'react-router-dom'
// import NavBar from './NavBar'

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
