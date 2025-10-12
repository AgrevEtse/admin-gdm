import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'

import { textNormalize } from '@/utils/textNormalize'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'

import StudentCard from '@/components/UI/StudentCard'
import StudentCardSkeleton from '@/components/UI/StudentCardSkeleton'

const ListStudentsAdmin = () => {
  const fetchWithAuth = useFetchWithAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [ciclos, setCiclos] = useState([])
  const [grado, setGrado] = useState(searchParams.get('grado') || 'secundaria')
  const [ciclo, setCiclo] = useState(searchParams.get('ciclo') || 0)
  const [activeStudents, setActiveStudents] = useState(
    searchParams.get('activeStudents') === '1' ? 1 : 0
  )
  const [cicloAnnual, setCicloAnnual] = useState('')
  const [cicloBiannual, setCicloBiannual] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchActualCiclos = useCallback(async () => {
    try {
      const resCicloAnnual = await fetchWithAuth('/ciclo/anual')
      const dataCicloAnual = await resCicloAnnual.json()
      setCicloAnnual(dataCicloAnual.nombre)
      setCiclo(dataCicloAnual.nombre)

      const resCicloBiannual = await fetchWithAuth('/ciclo/semestre')
      const dataCicloBiannual = await resCicloBiannual.json()
      setCicloBiannual(dataCicloBiannual.nombre)
    } catch (error) {
      console.error(error)
      toast.error('Error al obtener los ciclos escolares')
    }
  }, [fetchWithAuth])

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
    if ((grado === 0 || grado === '0') && !isLoading) {
      toast.error('Por favor, selecciona un grado escolar.')
      return
    }

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
          rol: grado,
          ciclo: ciclo,
          validado: activeStudents
        })
      })

      const data = await res.json()
      setStudents(data)
    } catch (error) {
      console.error('Error fetching alumnos:', error)
    } finally {
      setIsLoading(false)
    }
  }, [activeStudents, grado, fetchWithAuth, ciclo])

  const handleActiveToggle = () => {
    const newActive = activeStudents ? 0 : 1
    setActiveStudents(newActive)
  }

  useEffect(() => {
    document.title = 'Alumnos - GDM Admin'

    fetchActualCiclos()
    fetchCiclos()
  }, [fetchActualCiclos, fetchCiclos])

  useEffect(() => {
    const params = {
      grado,
      ciclo,
      activeStudents: activeStudents.toString()
    }

    setSearchParams(params)

    fetchStudents()
  }, [
    fetchCiclos,
    fetchStudents,
    grado,
    ciclo,
    activeStudents,
    setSearchParams,
    searchParams
  ])

  const filteredStudents = students.filter(
    ({ nombre, apellido_paterno, apellido_materno, curp }) => {
      const fullName = `${curp} ${nombre} ${apellido_paterno} ${apellido_materno}`
      return textNormalize(fullName).includes(textNormalize(search))
    }
  )

  const annualCiclos = ciclos.filter((c) => c.es_anual)
  const biannualCiclos = ciclos.filter((c) => !c.es_anual)

  return (
    <div className='mx-auto w-full h-full py-[5vh]'>
      <h2 className='text-5xl font-bold text-center'>Lista de Alumnos</h2>
      <div className='flex flex-col items-center lg:items-end my-8 space-y-4'>
        <div className='flex flex-row justify-between items-center space-x-4 w-full max-w-2xl'>
          <select
            className='select w-full max-w-xs'
            value={grado}
            onChange={(e) => {
              setGrado(e.target.value)
              e.target.value === 'bachillerato'
                ? setCiclo(cicloBiannual)
                : setCiclo(cicloAnnual)
            }}
          >
            <option
              value='0'
              disabled
            >
              Selecciona un grado...
            </option>
            <option value='preescolar'>Preescolar</option>
            <option value='primaria'>Primaria</option>
            <option value='secundaria'>Secundaria</option>
            <option value='bachillerato'>Bachillerato</option>
          </select>

          <select
            className='select w-full max-w-xs'
            value={ciclo}
            disabled={!grado} //TODO: Desactivar si grado es "0" (en string)
            onChange={(e) => setCiclo(e.target.value)}
          >
            <option
              value='0'
              disabled
            >
              Selecciona un ciclo...
            </option>
            {grado === 'bachillerato'
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
              disabled={!ciclo} //TODO: Desactivar si ciclo es "0" (en string)
              checked={activeStudents}
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
            disabled={!grado || !ciclo} //TODO: Desactivar si grado o ciclo es "0" (en string)
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
            ciclo={ciclo}
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
