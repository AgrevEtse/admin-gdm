import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { DEFAULT_CICLO } from '@/utils/defaultStates'
import { CicloSchema } from '@/schemas/CicloSchema'
import { createDateISOString } from '@/utils/dateFormater'
import CiclosSectionSkeleton from '@/components/UI/CiclosSectionSkeleton'
import TextInputForm from '@/components/UI/TextInputForm'

const CiclosAdmin = () => {
  const fetchWithAuth = useFetchWithAuth()

  const [ciclos, setCiclos] = useState([])
  const [cicloAnual, setCicloAnual] = useState(null)
  const [cicloSemestral, setCicloSemestral] = useState(null)
  const [newCiclo, setNewCiclo] = useState(DEFAULT_CICLO)
  const [isLoading, setIsLoading] = useState(false)
  const [newCicloAnual, setNewCicloAnual] = useState('')
  const [newCicloSemestral, setNewCicloSemestral] = useState('')

  const fetchCiclos = useCallback(async () => {
    setIsLoading(true)
    try {
      const resCiclos = await fetchWithAuth('/ciclo')
      const dataCiclos = await resCiclos.json()
      setCiclos(dataCiclos)

      const resCicloAnual = await fetchWithAuth('/ciclo/anual')
      const dataCicloAnual = await resCicloAnual.json()
      setCicloAnual(dataCicloAnual)

      const resCicloSemestral = await fetchWithAuth('/ciclo/semestre')
      const dataCicloSemestral = await resCicloSemestral.json()
      setCicloSemestral(dataCicloSemestral)

      setNewCicloAnual(dataCicloAnual.nombre)
      setNewCicloSemestral(dataCicloSemestral.nombre)
    } catch (error) {
      console.error('Error fetching ciclos:', error)
      toast.error('Error al cargar los ciclos.')
    } finally {
      setIsLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    document.title = 'Ciclos - GDM Admin'

    fetchCiclos()
  }, [fetchCiclos])

  const handleCreateCiclo = async () => {
    setIsLoading(true)
    try {
      const isValid = CicloSchema.safeParse(newCiclo)
      if (!isValid.success) throw new Error(isValid.error.issues[0].message)

      if (new Date(newCiclo.fecha_inicio) >= new Date(newCiclo.fecha_fin)) {
        throw new Error(
          'La fecha de inicio debe ser anterior a la fecha de fin'
        )
      }

      const res = await fetchWithAuth('/ciclo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCiclo,
          fecha_inicio: createDateISOString(newCiclo.fecha_inicio),
          fecha_fin: createDateISOString(newCiclo.fecha_fin),
          es_anual: Number(newCiclo.es_anual)
        })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Error al crear el ciclo')
      }

      toast.success('Ciclo creado correctamente')
      setNewCiclo(DEFAULT_CICLO)
      fetchCiclos()
    } catch (error) {
      console.error(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAssignCiclo = async (tipo) => {
    if (tipo !== 'anual' && tipo !== 'semestral') return

    setIsLoading(true)
    const nombre = tipo === 'anual' ? newCicloAnual : newCicloSemestral
    const es_anual = tipo === 'anual' ? 1 : 0

    try {
      const res = await fetchWithAuth('/ciclo/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, es_anual })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Error al asignar el ciclo')
      }

      toast.success('Ciclo asignado correctamente')
      fetchCiclos()
    } catch (error) {
      console.error(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const annualCiclos = ciclos.filter((c) => c.es_anual)
  const biannualCiclos = ciclos.filter((c) => !c.es_anual)

  return (
    <div className='flex flex-col justify-center items-center h-full space-y-6 mt-10'>
      <h2 className='text-3xl font-bold'>Ciclos</h2>
      <div className='divider'></div>

      <h2 className='text-xl font-bold'>Ciclos Activos</h2>
      <div className='w-full px-4 flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0 justify-center'>
        {isLoading ? (
          <>
            <CiclosSectionSkeleton />
            <CiclosSectionSkeleton />
          </>
        ) : (
          <>
            <div className='card bg-emerald-500 w-xs border'>
              <div className='card-body'>
                <h2 className='card-title justify-center'>Ciclo Anual</h2>
                <p className='text-center'>
                  {cicloAnual ? cicloAnual.nombre : 'No hay ciclo anual actual'}
                </p>
              </div>
            </div>
            <div className='card bg-red-500 w-xs border'>
              <div className='card-body'>
                <h2 className='card-title justify-center'>Ciclo Semestral</h2>
                <p className='text-center'>
                  {cicloSemestral
                    ? cicloSemestral.nombre
                    : 'No hay ciclo semestral actual'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className='divider'></div>

      <h2 className='text-xl font-bold'>Asignar Ciclos</h2>
      <div className='w-full px-4 flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0'>
        {isLoading ? (
          <>
            <CiclosSectionSkeleton />
            <CiclosSectionSkeleton />
          </>
        ) : (
          <>
            <div className='card bg-emerald-500 border'>
              <div className='card-body space-y-2'>
                <h2 className='card-title justify-center'>Anual</h2>

                <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                  <span className='label'>
                    Ciclo <span className='text-rose-600'>*</span>
                  </span>
                  <select
                    value={newCicloAnual}
                    required
                    onChange={(e) => {
                      setNewCicloAnual(e.target.value)
                    }}
                  >
                    <option
                      disabled
                      value=''
                    >
                      Selecciona el ciclo...
                    </option>
                    {annualCiclos.map((c) => (
                      <option
                        key={c.id}
                        value={c.nombre}
                      >
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <div className='card-actions justify-end'>
                  <button
                    className='btn btn-primary active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
                    onClick={() => handleAssignCiclo('anual')}
                  >
                    Asignar Anual
                  </button>
                </div>
              </div>
            </div>

            <div className='card bg-red-500 border'>
              <div className='card-body space-y-2'>
                <h2 className='card-title justify-center'>Semestral</h2>
                <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                  <span className='label'>
                    Ciclo <span className='text-rose-600'>*</span>
                  </span>
                  <select
                    value={newCicloSemestral}
                    required
                    onChange={(e) => {
                      setNewCicloSemestral(e.target.value)
                    }}
                  >
                    <option
                      disabled
                      value=''
                    >
                      Selecciona el ciclo...
                    </option>
                    {biannualCiclos.map((c) => (
                      <option
                        key={c.id}
                        value={c.nombre}
                      >
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </label>
                <div className='card-actions justify-end'>
                  <button
                    className='btn btn-primary active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
                    onClick={() => handleAssignCiclo('semestral')}
                  >
                    Asignar Semestral
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className='divider'></div>

      <h2 className='text-xl font-bold'>Crear Ciclo</h2>
      <div className='w-full px-4 flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0'>
        {isLoading ? (
          <CiclosSectionSkeleton />
        ) : (
          <div className='card bg-secondary w-full border'>
            <div className='card-body'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-2'>
                <TextInputForm
                  label='Nombre del Ciclo'
                  value={newCiclo.nombre}
                  placeholder='2026-2027, 2026B'
                  name='nombre_ciclo'
                  onChange={(e) =>
                    setNewCiclo({ ...newCiclo, nombre: e.target.value })
                  }
                  required={true}
                />
                <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                  <span className='label'>
                    Tipo de Ciclo <span className='text-rose-600'>*</span>
                  </span>
                  <select
                    value={newCiclo.es_anual}
                    required
                    onChange={(e) => {
                      setNewCiclo({
                        ...newCiclo,
                        es_anual: e.target.value === 'true' ? true : false
                      })
                    }}
                  >
                    <option
                      disabled
                      value=''
                    >
                      Selecciona el tipo...
                    </option>
                    <option value={true}>Anual</option>
                    <option value={false}>Semestral</option>
                  </select>
                </label>
                <label className='input input-md border-white mx-auto max-w-sm lg:min-w-sm'>
                  <span className='label'>
                    Fecha Inicio <span className='text-rose-600'>*</span>
                  </span>
                  <input
                    value={newCiclo.fecha_inicio}
                    required
                    onChange={(e) =>
                      setNewCiclo({ ...newCiclo, fecha_inicio: e.target.value })
                    }
                    type='date'
                    name='fecha_inicio'
                  />
                </label>
                <label className='input input-md border-white mx-auto max-w-sm lg:min-w-sm'>
                  <span className='label'>
                    Fecha Fin <span className='text-rose-600'>*</span>
                  </span>
                  <input
                    value={newCiclo.fecha_fin}
                    required
                    onChange={(e) =>
                      setNewCiclo({ ...newCiclo, fecha_fin: e.target.value })
                    }
                    type='date'
                    name='fecha_fin'
                  />
                </label>
              </div>

              <div className='card-actions justify-end'>
                <button
                  className='btn btn-primary active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
                  onClick={handleCreateCiclo}
                >
                  Crear Ciclo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CiclosAdmin
