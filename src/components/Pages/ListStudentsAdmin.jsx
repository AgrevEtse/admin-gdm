import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import { textNormalize } from '@/utils/textNormalize'
import { useAuth } from '@/context/AuthContext'

import StudentCard from '@/components/UI/StudentCard'
import StudentCardSkeleton from '@/components/UI/StudentCardSkeleton'

const API_URL = import.meta.env.VITE_API_URL

const ListStudentsAdmin = () => {
  const auth = useAuth()

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchStudents = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/alumno/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user.token}`
        },
        body: JSON.stringify({
          ciclo: '2025-2026',
          validado: 0,
          rol: 'secundaria'
        })
      })

      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setIsLoading(false)
      console.log(students)
    }
  }

  useEffect(() => {
    document.title = 'Alumnos - GDM Admin'
  })

  return (
    <div className='mx-auto w-full h-full py-[5vh]'>
      <h2 className='text-5xl font-bold text-center'>Lista de Alumnos</h2>
      <div className='flex flex-col items-center lg:items-end my-8 space-y-4'>
        <div className='flex flex-row justify-between items-center space-x-4 w-full max-w-2xl'>
          <select className='select w-full max-w-xs'>
            <option value=''>Todos los grados</option>
            <option value=''>Preescolar</option>
            <option value=''>Primaria</option>
            <option value=''>Secundaria</option>
            <option value=''>Bachillerato</option>
          </select>

          <button
            className='btn btn-primary'
            onClick={fetchStudents}
          >
            Consultar
          </button>
        </div>
        <label className='input input-md'>
          <span className='label'>
            <MagnifyingGlassIcon size={20} />
          </span>
          <input
            placeholder='VAGD020326HDFRNS00'
            type='text'
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </label>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 justify-center items-center'>
        {/* StudentCard*50 */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <StudentCardSkeleton key={i} />
          ))}
      </div>
    </div>
  )
}

export default ListStudentsAdmin
