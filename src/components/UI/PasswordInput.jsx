import { useState } from 'react'
import { EyeIcon, EyeClosedIcon } from '@phosphor-icons/react'

export default function PasswordInput({
  label = 'Contraseña',
  placeholder = '**********',
  name = 'password',
  autocomplete = 'current-password',
  value,
  onChange
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <label className='floating-label w-full mx-auto relative'>
      <span>{label}</span>
      <input
        className='input input-md mx-auto pr-10' // padding-right extra para que no choque el botón
        type={showPassword ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        name={name}
        autoComplete={autocomplete}
        onChange={onChange}
      />
      <button
        type='button'
        className='absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeClosedIcon size={18} /> : <EyeIcon size={18} />}
      </button>
    </label>
  )
}
