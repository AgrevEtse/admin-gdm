import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import useAuth from '@/context/useAuth'
import TextInput from '@/components/UI/TextInput'

const API_URL = import.meta.env.VITE_API_URL

function Login() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    document.title = 'Iniciar Sesión - GDM Admin'

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
    <fieldset className='fieldset bg-primary border border-primary-content p-4 rounded-box w-1/3'>
      <legend className='fieldset-legend text-3xl'>Log In</legend>
      <p className='text-lg'>Inicia sesión para acceder a tu cuenta.</p>
      <form className='flex flex-col gap-6 mt-6 w-1/2 justify-center items-center mx-auto'>
        <TextInput
          label='Usuario'
          placeholder='usuario'
          value={user}
          onChange={(e) => {
            setUser(e.target.value)
          }}
        />
        <TextInput
          label='Contraseña'
          placeholder='**********'
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button
          type='submit'
          className='btn btn-secondary w-1/2'
          onClick={handleLogin}
        >
          Iniciar sesión
        </button>
      </form>
    </fieldset>
  )
}

export default Login
