import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

const Dashboard = () => {
  const auth = useAuth()

  useEffect(() => {
    document.title = 'Dashboard - GDM Admin'
  }, [])

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <h2 className='text-3xl font-bold'>
        Bienvenido al Dashboard, {auth.user.rol.toUpperCase()}
      </h2>
      <div className='mt-4'>
        <Link
          to='/dashboard/alumnos'
          className='btn btn-secondary'
        >
          Alumnos
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
