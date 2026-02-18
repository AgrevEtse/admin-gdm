import { cambiarTitulo } from '@/utils/cambiarTitulo'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
  useEffect(() => {
    cambiarTitulo('404')
  }, [])

  return (
    <div className='flex items-center justify-center p-4'>
      <div className='bg-base-300 text-base-content w-full max-w-md rounded-md p-8 text-center shadow-2xl'>
        <h2 className='text-error mb-4 text-5xl font-extrabold'>404</h2>
        <p className='mb-6'>Página no encontrada. Parece que te has perdido.</p>
        <Link to='/'>
          <button className='btn btn-error w-full rounded-xl py-2'>
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound404
