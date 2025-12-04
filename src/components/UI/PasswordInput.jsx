import { useState } from 'react'
import { EyeIcon, EyeClosedIcon } from '@/assets/svg'

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
    <label className='floating-label relative mx-auto w-full'>
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
        className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeClosedIcon className='h-5 w-5' />
        ) : (
          <EyeIcon className='h-5 w-5' />
        )}
      </button>
    </label>
  )
}
