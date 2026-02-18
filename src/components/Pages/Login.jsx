import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import useAuth from '@/context/useAuth'
import TextInput from '@/components/UI/TextInput'
import PasswordInput from '@/components/UI/PasswordInput'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const API_URL = import.meta.env.VITE_API_URL

function Login() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    cambiarTitulo('Iniciar Sesión')

    if (auth.isAuthenticated()) {
      navigate('/dashboard')
    }
  }, [auth, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!user || !password) {
      toast.error('Por favor, completa todos los campos.')
      return
    }

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, password })
    })

    if (!res.ok) {
      const errorData = await res.json()
      toast.error(errorData.message || 'Error al iniciar sesión.')
      return
    }

    const data = await res.json()

    if (res.ok) {
      auth.login(data)
      navigate('/dashboard')
    }
  }

  return (
    <>
      <img
        src='/EscudoGdM.png'
        className='w-42'
        alt=''
      />
      <fieldset className='fieldset bg-base-300 border-base-content rounded-box text-base-content w-11/12 border p-4 lg:w-1/3'>
        <legend className='fieldset-legend text-3xl'>Log In</legend>
        <p className='text-lg'>Inicia sesión para acceder a tu cuenta.</p>
        <form
          className='mx-auto mt-6 flex w-1/2 flex-col items-center justify-center gap-6'
          onSubmit={handleLogin}
        >
          <TextInput
            label='Usuario'
            placeholder='usuario'
            value={user}
            name='username'
            autocomplete='username'
            onChange={(e) => {
              setUser(e.target.value)
            }}
          />
          <PasswordInput
            label='Contraseña'
            placeholder='**********'
            name='password'
            autocomplete='current-password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <button
            type='submit'
            className='btn btn-primary w-1/2'
          >
            Iniciar sesión
          </button>
        </form>
      </fieldset>
    </>
  )
}

export default Login
