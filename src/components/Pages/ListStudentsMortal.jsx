import { useState, useEffect, useCallback } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import { useFetchWithAuth } from '@/utils/useFetchWithAuth'
import { useAuth } from '@/context/AuthContext'
import { textNormalize } from '@/utils/textNormalize'

import StudentCard from '@/components/UI/StudentCard'
import StudentCardSkeleton from '@/components/UI/StudentCardSkeleton'

const ListStudentsAdmin = () => {
  const auth = useAuth()
  const fetchWithAuth = useFetchWithAuth()

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [activeStudents, setActiveStudents] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const rol = auth.user.rol
  const ciclo = auth.user.rol === 'bachillerato' ? '2025B' : '2025-2026'

  const fetchStudents = useCallback(async () => {
    setStudents([])
    setIsLoading(true)
    try {
      const res = await fetchWithAuth('/alumno/todos/', {
        method: 'POST',
        body: JSON.stringify({
          ciclo: ciclo,
          validado: activeStudents,
          rol: rol
        })
      })

      const data = await res.json()
      setStudents(data)
    } catch (error) {
      console.error('Error fetching alumnos:', error)
    } finally {
      setIsLoading(false)
    }
  }, [activeStudents, rol, fetchWithAuth, ciclo])

  useEffect(() => {
    document.title = 'Alumnos - GDM Admin'

    fetchStudents()
  }, [fetchStudents])

  const handleActiveToggle = () => {
    const newActive = activeStudents ? 0 : 1
    setActiveStudents(newActive)
  }

  const filteredStudents = students.filter(
    ({ nombre, apellido_paterno, apellido_materno, curp }) => {
      const fullName = `${nombre} ${apellido_paterno} ${apellido_materno} ${curp}`
      return textNormalize(fullName).includes(textNormalize(search))
    }
  )

  return (
    <div className='mx-auto w-full h-full py-[5vh]'>
      <h2 className='text-5xl font-bold text-center'>Lista de Alumnos</h2>
      <div className='flex flex-col items-center my-8 space-y-4'>
        <div className='flex flex-row justify-center items-center space-x-4 w-full max-w-2xl'>
          <label className='label'>
            Inactivo
            <input
              type='checkbox'
              checked={activeStudents}
              onChange={handleActiveToggle}
              className='toggle'
            />
            Activo
          </label>
        </div>
        <label className='input input-md'>
          <span className='label'>
            <MagnifyingGlassIcon size={20} />
          </span>
          <input
            placeholder='jesus, ZEPEDA, VAIO020327...'
            type='text'
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </label>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 justify-center items-center'>
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
