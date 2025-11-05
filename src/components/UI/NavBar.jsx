import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  UserIcon,
  SignOutIcon,
  ListIcon,
  ArrowFatLeftIcon
} from '@phosphor-icons/react'

import useAuth from '@/context/useAuth'
import RoleBasedView from '@/components/Layout/RoleBasedView'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // cerrar menú si pierde el focus
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className='navbar bg-primary text-primary-content rounded-box fixed top-0 left-1/2 z-100 mx-auto h-10 w-[90vw] -translate-x-1/2 px-6 shadow-sm'>
      <div className='flex-1 space-x-4'>
        <button
          onClick={() => navigate(-1)}
          className='btn btn-warning text-xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
        >
          <ArrowFatLeftIcon size={24} />
        </button>
        <Link to='/dashboard'>
          <button
            className='btn btn-ghost text-xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
            title='GDM Admin'
          >
            GDM Admin
          </button>
        </Link>
      </div>

      <div className='hidden flex-1 justify-evenly lg:flex'>
        <Link to='/dashboard/inscripciones'>
          <button className='btn btn-accent transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'>
            Inscripciones
          </button>
        </Link>
        <Link to='/dashboard/ciclos'>
          <button className='btn btn-accent transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'>
            Ciclos
          </button>
        </Link>

        <RoleBasedView
          adminComponent={
            <Link to='/dashboard/bajas'>
              <button className='btn btn-accent transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'>
                Dar de Baja
              </button>
            </Link>
          }
          mortalComponent={null}
        />

        <RoleBasedView
          adminComponent={
            <Link to='/dashboard/bajas/alumnos'>
              <button className='btn btn-accent transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'>
                Bajas Alumnos
              </button>
            </Link>
          }
          mortalComponent={null}
        />
      </div>

      {/* Hamburguer Menu */}
      <div className='relative flex flex-1 justify-end'>
        <button
          className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <ListIcon size={32} />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className='bg-base-200 rounded-box absolute top-full right-4 z-50 mx-auto mt-2 flex w-52 flex-col items-center justify-center p-4 text-center shadow-lg'
          ref={menuRef}
        >
          <div className='my-4 flex flex-col items-center'>
            <UserIcon
              size={80}
              className='rounded-full bg-cyan-600'
            />
            {auth.user && (
              <p className='mt-2 text-lg font-semibold'>
                {auth.user.rol.toUpperCase()}
              </p>
            )}
          </div>
          <ul className='menu menu-compact mx-auto items-center justify-center p-2 text-center'>
            <li>
              <button
                className='btn btn-error w-full text-white transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                onClick={auth.logout}
              >
                <SignOutIcon size={20} />
                Salir
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default NavBar
