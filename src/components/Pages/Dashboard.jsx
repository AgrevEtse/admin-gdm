import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '@/context/useAuth'
import RoleBasedView from '@/components/Layout/RoleBasedView'

const Dashboard = () => {
  const auth = useAuth()

  useEffect(() => {
    document.title = 'Dashboard - GDM Admin'
  }, [])

  return (
    <div className='mt-10 flex h-full flex-col items-center justify-center space-y-6'>
      <h2 className='text-3xl font-bold'>
        Bienvenido al Dashboard, {auth.user.rol.toUpperCase()}
      </h2>
      <img
        src='/EscudoGdM.png'
        className='w-3/4'
        alt='Escudo de la escuela Gómez de Mendiola'
      />
      <div className='mt-4 flex space-x-4'>
        <Link
          to='/dashboard/inscripciones'
          className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105'
        >
          Inscripciones
        </Link>
        <Link
          to='/dashboard/ciclos'
          className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105'
        >
          Ciclos
        </Link>

        <RoleBasedView
          adminComponent={
            <Link
              to='/dashboard/bajas'
              className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105'
            >
              Dar de Baja
            </Link>
          }
          mortalComponent={null}
        />

        <RoleBasedView
          adminComponent={
            <Link
              to='/dashboard/bajas/alumnos'
              className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105'
            >
              Bajas Alumnos
            </Link>
          }
          mortalComponent={null}
        />

        <RoleBasedView
          adminComponent={
            <Link
              to='/dashboard/educai'
              className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105'
            >
              Educai
            </Link>
          }
          mortalComponent={null}
        />
      </div>
    </div>
  )
}

export default Dashboard
