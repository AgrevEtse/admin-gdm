import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { DEFAULT_INSCRIPCION } from '@/utils/defaultStates'
import {
  getGradosByEscolaridad,
  getFirstGradoByEscolaridad,
  getIdEscolaridad
} from '@/utils/escolaridadGradosHelpers'
import { getEscolaridadById, getGradoById } from '@/utils/escolaridadIdHelpers'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { InscripcionSchema } from '@/schemas/InscripcionSchema'

const EditInscripcion = () => {
  const { curp, ciclo } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const [inscripcion, setInscripcion] = useState(DEFAULT_INSCRIPCION)
  const [cicloAnnual, setCicloAnnual] = useState(
    '00000000-0000-0000-0000-000000000000'
  )
  const [cicloBiannual, setCicloBiannual] = useState(
    '00000000-0000-0000-0000-000000000001'
  )
  const [isLoading, setIsLoading] = useState(false)

  const fetchActualCiclos = useCallback(async () => {
    try {
      const resCicloAnnual = await fetchWithAuth('/ciclo/anual')
      const dataCicloAnual = await resCicloAnnual.json()
      setCicloAnnual(dataCicloAnual.id)

      const resCicloBiannual = await fetchWithAuth('/ciclo/semestre')
      const dataCicloBiannual = await resCicloBiannual.json()
      setCicloBiannual(dataCicloBiannual.id)
    } catch (error) {
      console.error(error)
      toast.error('Error al obtener los ciclos escolares')
    }
  }, [fetchWithAuth])

  const fetchInscripcion = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/inscripcion/findone`, {
        method: 'POST',
        body: JSON.stringify({ curp: curp, ciclo: ciclo })
      })
      if (!response.ok)
        throw new Error('Error al obtener la escuela de procedencia del alumno')

      const data = await response.json()

      const formatedData = {
        ...data[0],
        escolaridad: getEscolaridadById(data[0].id_escolaridad),
        grado: getGradoById(data[0].id_escolaridad)
      }

      setInscripcion(formatedData)
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [curp, ciclo, fetchWithAuth])

  useEffect(() => {
    document.title = `Editar Inscripción - ${curp} - GDM Admin`

    fetchActualCiclos()
    fetchInscripcion()
  }, [curp, fetchInscripcion, fetchActualCiclos])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const isValid = InscripcionSchema.safeParse(inscripcion)
      if (!isValid.success) throw new Error(isValid.error.issues[0].message)

      const response = await fetchWithAuth(`/inscripcion/${inscripcion.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...inscripcion,
          curp_alumno: undefined,
          id: undefined,
          grado: undefined,
          escolaridad: undefined
        })
      })

      if (!response.ok)
        throw new Error('Error al actualizar la inscripción del alumno')

      toast.success('Inscripción actualizada correctamente')
      navigate(`/dashboard/inscripciones/`)
    } catch (error) {
      console.error(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='card bg-base-100 mx-auto w-full border border-white px-0 shadow-sm lg:px-8'>
      <div className='card-body'>
        <h2 className='card-title mb-6 items-center justify-center text-3xl'>
          Datos de la Inscripción
        </h2>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {isLoading &&
            Array.from({ length: 2 }).map((_, index) => (
              <label
                className='input skeleton mx-auto max-w-sm border-white lg:min-w-sm'
                key={index}
              >
                <span className='label skeleton'>
                  {'                              '}
                </span>
                <input className='skeleton border-white' />
              </label>
            ))}
          {!isLoading && (
            <>
              <label className='select select-md mx-auto max-w-sm border-white lg:min-w-sm'>
                <span className='label'>
                  Escolaridad <span className='text-rose-600'>*</span>
                </span>
                <select
                  required
                  value={inscripcion.escolaridad}
                  onChange={(e) => {
                    setInscripcion((prev) => {
                      return {
                        ...prev,
                        escolaridad: e.target.value,
                        grado: Number(
                          getFirstGradoByEscolaridad(e.target.value)
                        ),
                        id_escolaridad: getIdEscolaridad(
                          e.target.value,
                          getFirstGradoByEscolaridad(e.target.value)
                        ),
                        id_ciclo:
                          e.target.value === 'Bachillerato'
                            ? cicloBiannual
                            : cicloAnnual
                      }
                    })
                  }}
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge la escolaridad...
                  </option>
                  <option value='Preescolar'>Preescolar</option>
                  <option value='Primaria'>Primaria</option>
                  <option value='Secundaria'>Secundaria</option>
                  <option value='Bachillerato'>Bachillerato</option>
                </select>
              </label>

              <label className='select select-md mx-auto max-w-sm border-white lg:min-w-sm'>
                <span className='label'>
                  Grado <span className='text-rose-600'>*</span>
                </span>
                <select
                  required
                  disabled={inscripcion.escolaridad === '0'}
                  value={inscripcion.grado}
                  onChange={(e) => {
                    setInscripcion((prev) => {
                      return {
                        ...prev,
                        grado: Number(e.target.value),
                        id_escolaridad: getIdEscolaridad(
                          prev.escolaridad,
                          e.target.value
                        ),
                        id_ciclo:
                          prev.escolaridad === 'Bachillerato'
                            ? cicloBiannual
                            : cicloAnnual
                      }
                    })
                  }}
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge el grado...
                  </option>
                  {inscripcion.escolaridad !== '0' &&
                    getGradosByEscolaridad(inscripcion.escolaridad).map(
                      (grado) => (
                        <option
                          key={grado.grado}
                          value={grado.grado}
                        >
                          {grado.nombre}
                        </option>
                      )
                    )}
                </select>
              </label>
            </>
          )}
        </div>
        <div className='card-actions mt-4 justify-end'>
          <button
            className='btn btn-primary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='loading loading-spinner loading-sm'></span>
            ) : (
              'Actualizar'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditInscripcion
