import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { API_URL } from '../../constants'
import TextInput from "../UI/TextInput"

function Home() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, password })
    })

    const data = await res.json()

    //console.log(res)

    if (res.ok) {
      auth.login(data.token)
      navigate('/dashboard')
    }
  }

  return (
    <fieldset className="fieldset bg-secondary rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Log In</legend>
      <p className='text-sm'>Inicia sesión para acceder a tu cuenta</p>
      <form className='flex flex-col gap-6 mt-6'>
        <TextInput label='Usuario' placeholder='Bachillerato' value={user} onChange={(e) => {setUser(e.target.value)}} />
        <TextInput label='Contraseña' placeholder='**********' type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
        <button type='submit' className='btn btn-primary' onClick={handleLogin}>Iniciar sesión</button>
      </form>
    </fieldset>
  )
}

export default Home
