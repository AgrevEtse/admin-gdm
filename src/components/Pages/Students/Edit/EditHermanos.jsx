import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/utils/useFetchWithAuth'
import { HermanoSchema } from '@/schemas/HermanoSchema'
import TextInputForm from '@/components/UI/TextInputForm'

const EditHermanos = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const reducer = createReducer([])
  const [hermanos, dispatch] = useReducer(reducer, [])
  const [isLoading, setIsLoading] = useState(false)

  const fetchHermanos = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/hermano/${curp}`)
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
  }, [curp, fetchWithAuth])

  useEffect(() => {
    document.title = `Editar Hermanos - ${curp} - GDM Admin`

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
    <div className='card bg-base-100 shadow-sm w-full mx-auto px-0 lg:px-8 border-white border-1'>
      <div className='card-body'>
        <h2 className='card-title text-3xl justify-center items-center mb-6'>
          Datos de los Hermanos
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
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
          {!isLoading &&
            hermanos.map((hermano, index) => (
              <div
                key={index}
                className='card bg-base-200 shadow-sm p-4 gap-4'
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

                <label className='select select-md m-auto border-white mx-auto max-w-sm lg:min-w-sm'>
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

export default EditHermanos
