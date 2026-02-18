import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { HermanoSchema } from '@/schemas/HermanoSchema'
import TextInputForm from '@/components/UI/TextInputForm'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const EditHermanos = () => {
  const { curp, ciclo } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const reducer = createReducer([])
  const [hermanos, dispatch] = useReducer(reducer, [])
  const [isLoading, setIsLoading] = useState(false)

  const fetchHermanos = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/hermano/${curp}?ciclo=${ciclo}`)
      if (!response.ok)
        throw new Error(`Error al obtener los hermanos del alumno`)

      const data = await response.json()

      dispatch({ type: 'SET_STATE_ARRAY', payload: data.slice(0, 3) })
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [curp, fetchWithAuth, ciclo])

  useEffect(() => {
    cambiarTitulo(`Editar Hermanos - ${curp}`)

    fetchHermanos()
  }, [curp, fetchHermanos])

  const handleChange = (index, e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD_ARRAY',
      payload: { index, field: name, value }
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      for (let i = 0; i < hermanos.length; i++) {
        const hermano = hermanos[i]

        const isValid = HermanoSchema.safeParse(hermano)
        if (!isValid.success)
          throw new Error(
            `Hermano ${i + 1}: ${isValid.error.issues[0].message}`
          )

        const response = await fetchWithAuth(`/hermano/${hermano.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...hermano,
            curp_alumno: undefined,
            id: undefined
          })
        })

        if (!response.ok)
          throw new Error(`Error al actualizar el hermano ${i + 1} del alumno`)
      }

      toast.success(`Hermanos actualizados correctamente`)
      navigate(-1)
    } catch (error) {
      console.error(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='card bg-base-300 border-base-content mx-auto w-full border px-0 shadow-sm lg:px-8'>
      <div className='card-body'>
        <h2 className='card-title mb-6 items-center justify-center text-3xl'>
          Datos de los Hermanos
        </h2>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <label
                className='input skeleton border-base-content mx-auto max-w-sm lg:min-w-sm'
                key={index}
              >
                <span className='label skeleton'>
                  {'                              '}
                </span>
                <input className='skeleton border-base-content' />
              </label>
            ))}
          {!isLoading &&
            hermanos.map((hermano, index) => (
              <div
                key={index}
                className='card bg-base-200 gap-4 p-4 shadow-sm'
              >
                <h3 className='card-title text-xl'>Hermano {index + 1}</h3>
                <TextInputForm
                  label='Nombre Completo'
                  placeholder='Nombre Completo'
                  name='nombre'
                  value={hermano.nombre}
                  onChange={(e) => handleChange(index, e)}
                  required={true}
                />

                <label className='select select-md border-base-content m-auto mx-auto max-w-sm lg:min-w-sm'>
                  <span className='label'>Escolaridad</span>
                  <select
                    value={hermano.nivel}
                    onChange={(e) => handleChange(index, e)}
                    name='nivel'
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
              </div>
            ))}
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

export default EditHermanos
