import { useState } from 'react'

import { API_URL } from '../constants'
import TextInput from "../UI/TextInput"

function Home() {
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

    console.log(data)
  }

  return (
    <section className='card bg-secondary shadow-xl w-full max-w-sm'>
      <div className='card-body'>
        <h2 className='card-title'>Iniciar sesión</h2>
        <p className='text-sm'>Inicia sesión para acceder a tu cuenta</p>
        <form className='flex flex-col gap-6 mt-6'>
          <TextInput label='Usuario' placeholder='Bachillerato' value={user} onChange={(e) => {setUser(e.target.value)}} />
          <TextInput label='Contraseña' placeholder='**********' type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
          <button type='submit' className='btn btn-primary' onClick={handleLogin}>Iniciar sesión</button>
        </form>
      </div>
    </section>
  )
}

export default Home
