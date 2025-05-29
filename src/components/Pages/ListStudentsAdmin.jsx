import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'

import { textNormalize } from '@/utils/textNormalize'
import { useFetchWithAuth } from '@/utils/useFetchWithAuth'

import StudentCard from '@/components/UI/StudentCard'
import StudentCardSkeleton from '@/components/UI/StudentCardSkeleton'

const API_URL = import.meta.env.VITE_API_URL

const ListStudentsAdmin = () => {
  const fetchWithAuth = useFetchWithAuth()

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [grade, setGrade] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchStudents = async () => {
    if (grade === 0) {
      toast.error('Por favor, selecciona un grado escolar.')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetchWithAuth(`${API_URL}/alumno/todos/`, {
        method: 'POST',
        body: JSON.stringify({
          ciclo: '2025-2026',
          validado: 0,
          rol: grade
        })
      })

      const data = await res.json()
      setStudents(data)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Alumnos - GDM Admin'
  })

  const filteredStudents = students.filter(
    ({ nombre, apellido_paterno, apellido_materno, curp }) => {
      const fullName = `${nombre} ${apellido_paterno} ${apellido_materno} ${curp}`
      return textNormalize(fullName).includes(textNormalize(search))
    }
  )

  return (
    <div className='mx-auto w-full h-full py-[5vh]'>
      <h2 className='text-5xl font-bold text-center'>Lista de Alumnos</h2>
      <div className='flex flex-col items-center lg:items-end my-8 space-y-4'>
        <div className='flex flex-row justify-between items-center space-x-4 w-full max-w-2xl'>
          <select
            className='select w-full max-w-xs'
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option
              value='0'
              disabled
            >
              Selecciona un grado
            </option>
            <option value='preescolar'>Preescolar</option>
            <option value='primaria'>Primaria</option>
            <option value='secundaria'>Secundaria</option>
            <option value='bachillerato'>Bachillerato</option>
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
            placeholder='alejandro, ZEPEDA, VAIO020327...'
            type='text'
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </label>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 justify-center items-center'>
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <StudentCardSkeleton key={i} />
          ))}

        {filteredStudents.map((student) => (
          <StudentCard
            key={student.curp}
            student={student}
          />
        ))}

        {filteredStudents.length === 0 && !isLoading && (
          <div className='col-span-full text-center text-gray-500'>
            No se encontraron alumnos.
          </div>
        )}
      </div>
    </div>
  )
}

export default ListStudentsAdmin
