import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '@/context/useAuth'

const Dashboard = () => {
  const auth = useAuth()

  useEffect(() => {
    document.title = 'Dashboard - GDM Admin'
  }, [])

  return (
    <div className='flex flex-col justify-center items-center h-full space-y-6'>
      <h2 className='text-3xl font-bold'>
        Bienvenido al Dashboard, {auth.user.rol.toUpperCase()}
      </h2>
      <img
        src='/EscudoGdM.png'
        className='w-3/4'
        alt='Escudo de la escuela Gómez de Mendiola'
      />
      <div className='mt-4'>
        <Link
          to='/dashboard/alumnos'
          className='btn btn-secondary hover:scale-105 transition-transform duration-200 ease-in-out'
        >
          Alumnos
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
