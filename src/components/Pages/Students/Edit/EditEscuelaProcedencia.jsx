import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { DEFAULT_ESCUELA_PROCEDENCIA } from '@/utils/defaultStates'
import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { EscuelaProcedenciaSchema } from '@/schemas/EscuelaProcedenciaSchema'
import TextInputForm from '@/components/UI/TextInputForm'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const EditEscuelaProcedencia = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const reducer = createReducer(DEFAULT_ESCUELA_PROCEDENCIA)
  const [escuelaProcedencia, dispatch] = useReducer(
    reducer,
    DEFAULT_ESCUELA_PROCEDENCIA
  )
  const [isLoading, setIsLoading] = useState(false)

  const fetchEscuelaProcedencia = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/escuelaprocedencia/${curp}`)
      if (!response.ok)
        throw new Error('Error al obtener la escuela de procedencia del alumno')

      const data = await response.json()

      dispatch({ type: 'SET_STATE', payload: data })
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [curp, fetchWithAuth])

  useEffect(() => {
    cambiarTitulo(`Editar Escuela Procedencia - ${curp}`)

    fetchEscuelaProcedencia()
  }, [curp, fetchEscuelaProcedencia])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { field: name, value: value }
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const isValid = EscuelaProcedenciaSchema.safeParse(escuelaProcedencia)
      if (!isValid.success) throw new Error(isValid.error.issues[0].message)

      const response = await fetchWithAuth(
        `/escuelaprocedencia/${escuelaProcedencia.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...escuelaProcedencia,
            curp_alumno: undefined,
            id: undefined
          })
        }
      )

      if (!response.ok)
        throw new Error(
          'Error al actualizar la escuela de procedencia del alumno'
        )

      toast.success('Escuela de Procedencia actualizada correctamente')
      navigate(-1)
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
          Datos de la Escuela de Procedencia
        </h2>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
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
              <TextInputForm
                label='CCT'
                placeholder='CCT'
                value={escuelaProcedencia.cct}
                onChange={handleChange}
                name='cct'
                required={true}
              />

              <TextInputForm
                label='Nombre de la Escuela'
                placeholder='Nombre de la Escuela'
                value={escuelaProcedencia.nombre}
                onChange={handleChange}
                name='nombre'
                required={true}
              />

              <TextInputForm
                label='Matrícula'
                placeholder='Matrícula'
                value={escuelaProcedencia.matricula}
                onChange={handleChange}
                name='matricula'
              />
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

export default EditEscuelaProcedencia
