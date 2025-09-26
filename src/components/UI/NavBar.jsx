import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  UserIcon,
  SignOutIcon,
  ListIcon,
  ArrowFatLeftIcon
} from '@phosphor-icons/react'

import useAuth from '@/context/useAuth'

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
    <nav className='fixed top-0 navbar bg-primary text-primary-content shadow-sm h-10 w-[90vw] mx-auto rounded-box z-100 left-1/2 -translate-x-1/2 px-6'>
      <div className='flex-1 space-x-4'>
        <button
          onClick={() => navigate(-1)}
          className='btn btn-warning text-xl active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
        >
          <ArrowFatLeftIcon size={24} />
        </button>
        <Link to='/dashboard'>
          <button
            className='btn btn-secondary text-secondary-content text-xl active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
            title='GDM Admin'
          >
            GDM Admin
          </button>
        </Link>
      </div>

      {/* Hamburguer Menu */}
      <div>
        <button
          className='btn btn-accent active:scale-110 hover:scale-110 transition-transform duration-200 ease-in-out'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <ListIcon size={32} />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className='absolute top-full right-4 mt-2 bg-base-200 rounded-box shadow-lg z-50 w-52 justify-center items-center text-center mx-auto p-4 flex flex-col'
          ref={menuRef}
        >
          <div className='flex flex-col items-center my-4'>
            <UserIcon
              size={80}
              className='bg-cyan-600 rounded-full'
            />
            {auth.user && (
              <p className='text-lg font-semibold mt-2'>
                {auth.user.rol.toUpperCase()}
              </p>
            )}
          </div>
          <ul className='menu menu-compact p-2 justify-center items-center text-center mx-auto'>
            <li>
              <button
                className='btn btn-error w-full text-white active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
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
