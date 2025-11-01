import { useState, useEffect, useCallback } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'

import { textNormalize } from '@/utils/textNormalize'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import BajasItem from '@/components/UI/BajasItem'
import BajasItemSkeleton from '@/components/UI/BajasItemSkeleton'

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
    document.title = 'Bajas - GDM Admin'

    fetchStudents()
  }, [fetchStudents])

  const filteredStudents = students.filter(
    ({ nombre, apellido_paterno, apellido_materno, curp }) => {
      const fullName = `${curp} ${nombre} ${apellido_paterno} ${apellido_materno}`
      return textNormalize(fullName).includes(textNormalize(search))
    }
  )

  return (
    <div className='mx-auto w-full h-full py-[5vh]'>
      <h2 className='text-5xl font-bold text-center'>Bajas</h2>
      <div className='flex flex-col items-center lg:items-end my-8 space-y-4'>
        <label className='input input-md'>
          <span className='label'>
            <MagnifyingGlassIcon size={20} />
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
        <div className='flex flex-col justify-between items-center space-y-4 w-full'>
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
              ></BajasItem>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BajasList
