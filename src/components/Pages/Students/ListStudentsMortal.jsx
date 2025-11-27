import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import useAuth from '@/context/useAuth'
import { textNormalize } from '@/utils/textNormalize'

import StudentCard from '@/components/UI/StudentCard'
import StudentCardSkeleton from '@/components/UI/StudentCardSkeleton'

const ListStudentsAdmin = () => {
  const auth = useAuth()
  const fetchWithAuth = useFetchWithAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [ciclos, setCiclos] = useState([])
  const [ciclo, setCiclo] = useState(searchParams.get('ciclo') || 0)
  const [activeStudents, setActiveStudents] = useState(
    searchParams.get('activeStudents') === '1' ? 1 : 0
  )
  const [isLoading, setIsLoading] = useState(true)

  const fetchCiclos = useCallback(async () => {
    try {
      const res = await fetchWithAuth('/ciclo')
      const data = await res.json()
      setCiclos(data)
    } catch (error) {
      console.error('Error fetching ciclos:', error)
      toast.error('Error al cargar los ciclos escolares.')
    }
  }, [fetchWithAuth])

  const fetchStudents = useCallback(async () => {
    if ((ciclo === 0 || ciclo === '0') && !isLoading) {
      toast.error('Por favor, selecciona un ciclo escolar.')
      return
    }

    setStudents([])
    setIsLoading(true)
    try {
      const res = await fetchWithAuth('/alumno/todos', {
        method: 'POST',
        body: JSON.stringify({
          rol: auth.user.rol,
          ciclo: ciclo,
          validado: activeStudents
        })
      })

      const data = await res.json()
      data.sort((a, b) => a.curp.localeCompare(b.curp))
      setStudents(data)
    } catch (error) {
      console.error('Error fetching alumnos:', error)
    } finally {
      setIsLoading(false)
    }
  }, [activeStudents, auth.user.rol, fetchWithAuth, ciclo])

  const handleActiveToggle = () => {
    const newActive = activeStudents ? 0 : 1
    setActiveStudents(newActive)
  }

  const fetchActualCiclo = useCallback(async () => {
    const grado = auth.user.rol === 'bachillerato' ? 'semestre' : 'anual'

    try {
      const resCiclo = await fetchWithAuth(`/ciclo/${grado}`)
      const dataCiclo = await resCiclo.json()
      setCiclo(dataCiclo.nombre)
    } catch (error) {
      console.error(error)
      toast.error('Error al obtener los ciclos escolares')
    }
  }, [fetchWithAuth, auth.user.rol])

  useEffect(() => {
    document.title = 'Inscripciones - GDM Admin'

    fetchCiclos()
    fetchActualCiclo()
  }, [fetchCiclos, fetchActualCiclo])

  useEffect(() => {
    const params = {
      ciclo,
      activeStudents: activeStudents.toString()
    }

    setSearchParams(params)

    fetchStudents()
  }, [fetchStudents, ciclo, activeStudents, setSearchParams])

  const filteredStudents = students.filter(
    ({ nombre, apellido_paterno, apellido_materno, curp }) => {
      const fullName = `${curp} ${nombre} ${apellido_paterno} ${apellido_materno}`
      return textNormalize(fullName).includes(textNormalize(search))
    }
  )

  const annualCiclos = ciclos.filter((c) => c.es_anual)
  const biannualCiclos = ciclos.filter((c) => !c.es_anual)

  return (
    <div className='mx-auto h-full w-full py-[5vh]'>
      <h2 className='text-center text-5xl font-bold'>Lista de Inscripciones</h2>
      <div className='my-8 flex flex-col items-center space-y-4'>
        <div className='flex w-full max-w-2xl flex-row items-center justify-center space-x-4'>
          <select
            className='select w-full max-w-xs'
            value={ciclo}
            onChange={(e) => setCiclo(e.target.value)}
          >
            <option
              value='0'
              disabled
            >
              Selecciona un ciclo
            </option>
            {auth.user.rol === 'bachillerato'
              ? biannualCiclos.map((c) => (
                  <option
                    key={c.id}
                    value={c.nombre}
                  >
                    {c.nombre}
                  </option>
                ))
              : annualCiclos.map((c) => (
                  <option
                    key={c.id}
                    value={c.nombre}
                  >
                    {c.nombre}
                  </option>
                ))}
          </select>

          <label className='label text-warning'>
            Inactivo
            <input
              type='checkbox'
              checked={activeStudents}
              disabled={!ciclo}
              onChange={handleActiveToggle}
              className='toggle toggle-lg border-warning bg-warning checked:border-warning checked:bg-warning text-warning-content'
            />
            Activo
          </label>
        </div>
        <label className='input input-md'>
          <span className='label'>
            <MagnifyingGlassIcon size={20} />
          </span>
          <input
            placeholder='alejandro, ZEPEDA, VAIO020327...'
            type='text'
            disabled={!ciclo}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </label>
      </div>
      <div className='grid grid-cols-1 items-center justify-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <StudentCardSkeleton key={i} />
          ))}

        {filteredStudents.map((student) => (
          <StudentCard
            key={student.curp}
            student={student}
            ciclo={ciclo}
          />
        ))}

        {filteredStudents.length === 0 && !isLoading && (
          <>
            <div className='w-2xs'></div>
            <div className='w-2xs text-center text-gray-500'>
              No se encontraron alumnos.
            </div>
            <div className='w-2xs'></div>
          </>
        )}
      </div>
    </div>
  )
}

export default ListStudentsAdmin
