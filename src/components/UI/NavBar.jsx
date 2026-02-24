import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserIcon, SignOutIcon, ListIcon, ArrowFatLeftIcon } from '@/assets/svg'

import useAuth from '@/context/useAuth'
import RoleBasedView from '@/components/Layout/RoleBasedView'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // cerrar menú si pierde el focus
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleButtonHamburguer = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className='navbar bg-base-300 text-base-content rounded-box fixed top-0 left-1/2 z-50 mx-auto h-10 w-[90vw] -translate-x-1/2 px-6 shadow-sm'>
      <div className='flex-1 space-x-4'>
        <button
          onClick={() => navigate(-1)}
          className='btn btn-info text-xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
        >
          <ArrowFatLeftIcon className='h-7 w-7' />
        </button>
        <Link
          to='/dashboard'
          className='hidden md:inline'
        >
          <button
            className='btn btn-ghost text-xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
            title='GDM Admin'
          >
            GDM Admin
          </button>
        </Link>
      </div>

      <div className='block flex-1 justify-evenly md:hidden'>
        <Link to='/dashboard'>
          <button
            className='btn btn-ghost text-xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
            title='GDM Admin'
          >
            GDM Admin
          </button>
        </Link>
      </div>

      {/* Hamburguer Menu */}
      <div className='relative flex flex-1 justify-end'>
        <button
          ref={buttonRef}
          className='btn btn-accent transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <ListIcon className='h-9 w-9' />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className='bg-base-200 rounded-box absolute top-full right-4 z-50 mx-auto mt-2 flex w-52 flex-col items-center justify-center p-4 text-center shadow-lg'
          ref={menuRef}
        >
          <div className='flex flex-col items-center'>
            <UserIcon className='bg-info h-20 w-20 rounded-full' />
            {auth.user && (
              <p className='mt-2 text-lg font-semibold'>
                {auth.user.rol.toUpperCase()}
              </p>
            )}
          </div>

          <ul className='menu menu-compact mx-auto items-center justify-center p-2 text-center'>
            <li>
              <Link to='/dashboard/inscripciones'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={handleButtonHamburguer}
                >
                  Inscripciones
                </button>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/ciclos'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={handleButtonHamburguer}
                >
                  Ciclos
                </button>
              </Link>
            </li>

            <RoleBasedView
              adminComponent={
                <li>
                  <Link to='/dashboard/bajas'>
                    <button
                      className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                      onClick={handleButtonHamburguer}
                    >
                      Dar de Baja
                    </button>
                  </Link>
                </li>
              }
              mortalComponent={null}
            />

            <RoleBasedView
              adminComponent={
                <li>
                  <Link to='/dashboard/bajas/alumnos'>
                    <button
                      className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                      onClick={handleButtonHamburguer}
                    >
                      Bajas Alumnos
                    </button>
                  </Link>
                </li>
              }
              mortalComponent={null}
            />

            <RoleBasedView
              adminComponent={
                <li>
                  <Link to='/dashboard/idukay'>
                    <button
                      className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                      onClick={handleButtonHamburguer}
                    >
                      Idukay
                    </button>
                  </Link>
                </li>
              }
              mortalComponent={null}
            />
            <RoleBasedView
              adminComponent={
                <li>
                  <Link to='/dashboard/precios'>
                    <button
                      className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                      onClick={handleButtonHamburguer}
                    >
                      Precios
                    </button>
                  </Link>
                </li>
              }
              mortalComponent={null}
            />
            <li>
              <button
                className='btn btn-error transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                onClick={auth.logout}
              >
                <SignOutIcon className='h-6 w-6' />
                Salir
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
