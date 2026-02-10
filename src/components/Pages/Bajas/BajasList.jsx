import { useState, useEffect, useCallback } from 'react'
import { MagnifyingGlassIcon } from '@/assets/svg'
import { toast } from 'react-hot-toast'

import { textNormalize } from '@/utils/textNormalize'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import BajasItem from '@/components/UI/BajasItem'
import BajasItemSkeleton from '@/components/UI/BajasItemSkeleton'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const BajasList = () => {
  const fetchWithAuth = useFetchWithAuth()

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchStudents = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetchWithAuth('/alumno/all')
      const data = await res.json()
      data.sort((a, b) => a.curp.localeCompare(b.curp))
      setStudents(data)
    } catch (error) {
      console.error('Error fetching banned students:', error)
      toast.error('Error al cargar los estudiantes baneados.')
    } finally {
      setIsLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    cambiarTitulo('Dar de Baja')

    fetchStudents()
  }, [fetchStudents])

  const filteredStudents = students.filter(
    ({ nombre, apellido_paterno, apellido_materno, curp }) => {
      const fullName = `${curp} ${nombre} ${apellido_paterno} ${apellido_materno}`
      return textNormalize(fullName).includes(textNormalize(search))
    }
  )

  return (
    <div className='mx-auto h-full w-full py-[5vh]'>
      <h2 className='text-center text-5xl font-bold'>Dar de Baja</h2>
      <div className='my-8 flex flex-col items-center space-y-4 lg:items-end'>
        <label className='input input-md'>
          <span className='label'>
            <MagnifyingGlassIcon className='h-5 w-5' />
          </span>
          <input
            placeholder='alejandro, ZEPEDA, VAIO020327...'
            disabled={isLoading}
            type='text'
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </label>
        <div className='flex w-full flex-col items-center justify-between space-y-4'>
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <BajasItemSkeleton key={i} />
            ))}
          {!isLoading && filteredStudents.length === 0 && (
            <div className='w-2xl max-w-full p-6 text-center'>
              No se encontraron resultados.
            </div>
          )}
          {!isLoading &&
            filteredStudents.length > 0 &&
            filteredStudents.map((student) => (
              <BajasItem
                key={student.curp}
                student={student}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default BajasList
