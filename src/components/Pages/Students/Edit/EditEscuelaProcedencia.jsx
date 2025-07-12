import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { DEFAULT_ESCUELA_PROCEDENCIA } from '@/utils/defaultStates'
import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/utils/useFetchWithAuth'
import { EscuelaProcedenciaSchema } from '@/schemas/EscuelaProcedenciaSchema'
import TextInputForm from '@/components/UI/TextInputForm'

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
    document.title = `Editar Escuela Procedencia - ${curp} - GDM Admin`

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
    <div className='card bg-base-100 shadow-sm w-full mx-auto px-0 lg:px-8 border-white border-1'>
      <div className='card-body'>
        <h2 className='card-title text-3xl justify-center items-center mb-6'>
          Datos de la Escuela de Procedencia
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <label
                className='input border-white mx-auto max-w-sm lg:min-w-sm skeleton'
                key={index}
              >
                <span className='label skeleton'>
                  {'                              '}
                </span>
                <input className='border-white skeleton' />
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
                required={true}
              />
            </>
          )}
        </div>
        <div className='card-actions justify-end mt-4'>
          <button
            className='btn btn-primary active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
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
