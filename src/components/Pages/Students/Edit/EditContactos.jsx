import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import {
  PARENTESCO_ARRAY,
  getParentescoByValue
} from '@/utils/parentescoHelpers'
import { ContactoSchema } from '@/schemas/ContactoSchema'
import TextInputForm from '@/components/UI/TextInputForm'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

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
    cambiarTitulo(`Editar Contactos - ${curp}`)

    fetchContactos()
  }, [curp, fetchContactos])

  const handleChange = (index, e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD_ARRAY',
      payload: {
        index,
        field: name,
        value: value
      }
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      for (let i = 0; i < contactos.length; i++) {
        const contacto = contactos[i]

        contacto.parentesco = getParentescoByValue(contacto.parentesco)

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
              otro: contacto.parentesco === 7 ? contacto.otro : undefined,
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
    <div className='card bg-base-100 mx-auto w-full border border-white px-0 shadow-sm lg:px-8'>
      <div className='card-body'>
        <h2 className='card-title mb-6 items-center justify-center text-3xl'>
          Datos de los Contactos de Emergencia
        </h2>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {isLoading &&
            Array.from({ length: 9 }).map((_, index) => (
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
          {!isLoading &&
            contactos.map((contacto, index) => (
              <div
                key={index}
                className='card bg-base-200 gap-4 p-4 shadow-sm'
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

                <label className='select select-md m-auto mx-auto max-w-sm border-white lg:min-w-sm'>
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
                {contacto.parentesco === 'Otro' && (
                  <TextInputForm
                    label='Otro'
                    name='otro'
                    value={contacto.otro}
                    placeholder='Especifica el parentesco...'
                    onChange={(e) => handleChange(index, e)}
                    required={true}
                  />
                )}
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

export default EditContactos
