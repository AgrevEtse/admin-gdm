import { cambiarTitulo } from '@/utils/cambiarTitulo'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
  useEffect(() => {
    cambiarTitulo('404')
  }, [])

  return (
    <div className='flex items-center justify-center p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl'>
        <h2 className='mb-4 text-5xl font-extrabold text-red-600'>404</h2>
        <p className='mb-6 text-gray-600'>
          Página no encontrada. Parece que te has perdido.
        </p>
        <Link to='/'>
          <button className='w-full cursor-pointer rounded-xl bg-red-500 py-2 text-white transition duration-300 hover:bg-red-600'>
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound404
