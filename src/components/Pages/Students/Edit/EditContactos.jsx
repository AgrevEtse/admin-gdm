import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { PARENTESCO_ARRAY } from '@/utils/parentescoHelpers'
import { ContactoSchema } from '@/schemas/ContactoSchema'
import TextInputForm from '@/components/UI/TextInputForm'

const EditContactos = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const reducer = createReducer([])
  const [contactos, dispatch] = useReducer(reducer, [])
  const [isLoading, setIsLoading] = useState(false)

  const fetchContactos = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/contactoemergencia/${curp}`)
      if (!response.ok)
        throw new Error(
          `Error al obtener los contactos de emergencia del alumno`
        )

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
    document.title = `Editar Contactos - ${curp} - GDM Admin`

    fetchContactos()
  }, [curp, fetchContactos])

  const handleChange = (index, e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD_ARRAY',
      payload: {
        index,
        field: name,
        value: name === 'parentesco' ? Number(value) : value
      }
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      for (let i = 0; i < contactos.length; i++) {
        const contacto = contactos[i]

        const isValid = ContactoSchema.safeParse(contacto)
        if (!isValid.success)
          throw new Error(
            `Contacto ${i + 1}: ${isValid.error.issues[0].message}`
          )

        const response = await fetchWithAuth(
          `/contactoemergencia/${contacto.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...contacto,
              curp_alumno: undefined,
              id: undefined
            })
          }
        )

        if (!response.ok)
          throw new Error(`Error al actualizar el contacto ${i + 1} del alumno`)
      }

      toast.success(`Contactos actualizados correctamente`)
      navigate(-1)
    } catch (error) {
      console.error(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='card bg-base-100 shadow-sm w-full mx-auto px-0 lg:px-8 border-white border'>
      <div className='card-body'>
        <h2 className='card-title text-3xl justify-center items-center mb-6'>
          Datos de los Contactos de Emergencia
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {isLoading &&
            Array.from({ length: 9 }).map((_, index) => (
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
            contactos.map((contacto, index) => (
              <div
                key={index}
                className='card bg-base-200 shadow-sm p-4 gap-4'
              >
                <h3 className='card-title text-xl'>Contacto {index + 1}</h3>
                <TextInputForm
                  label='Nombre Completo'
                  placeholder='Nombre Completo'
                  name='nombre'
                  value={contacto.nombre}
                  onChange={(e) => handleChange(index, e)}
                  required={true}
                />

                <TextInputForm
                  label='Télefono'
                  name='telefono'
                  value={contacto.telefono}
                  onChange={(e) => handleChange(index, e)}
                  required={true}
                  type='tel'
                />

                <label className='select select-md m-auto border-white mx-auto max-w-sm lg:min-w-sm'>
                  <span className='label'>
                    Parentesco <span className='text-rose-600'>*</span>
                  </span>
                  <select
                    value={contacto.parentesco}
                    onChange={(e) => handleChange(index, e)}
                    name='parentesco'
                  >
                    <option
                      disabled
                      value='0'
                    >
                      Escoge el parentesco...
                    </option>
                    {PARENTESCO_ARRAY.map((parentesco) => (
                      <option
                        key={parentesco.id}
                        value={parentesco.value}
                      >
                        {parentesco.label}
                      </option>
                    ))}
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

export default EditContactos
