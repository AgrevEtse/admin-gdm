import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { DEFAULT_PAGO } from '@/utils/defaultStates'
import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { PARENTESCO_ARRAY } from '@/utils/parentescoHelpers'
import { PagoSchema } from '@/schemas/PagoSchema'
import TextInputForm from '@/components/UI/TextInputForm'

const EditPago = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const reducer = createReducer(DEFAULT_PAGO)
  const [personaPagos, dispatch] = useReducer(reducer, DEFAULT_PAGO)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPersonaPagos = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/personapagos/${curp}`)
      if (!response.ok)
        throw new Error('Error al obtener la Persona de Pagos del alumno')

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
    document.title = `Editar Persona de Pagos - ${curp} - GDM Admin`

    fetchPersonaPagos()
  }, [curp, fetchPersonaPagos])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        field: name,
        value:
          name === 'responsable'
            ? Number(value)
            : name === 'factura'
              ? value === 'true'
              : value
      }
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const isValid = PagoSchema.safeParse(personaPagos)
      if (!isValid.success) throw new Error(isValid.error.issues[0].message)

      const response = await fetchWithAuth(`/personapagos/${personaPagos.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...personaPagos,
          curp_alumno: undefined,
          id: undefined
        })
      })

      if (!response.ok)
        throw new Error('Error al actualizar la persona de pagos del alumno')

      toast.success('Persona de Pagos actualizada correctamente')
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
          Datos de la Persona de Pagos
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
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
                label='Nombre Completo'
                placeholder='Nombre Completo'
                value={personaPagos.nombre}
                onChange={handleChange}
                name='nombre'
                required={true}
              />

              <label className='select select-md m-auto border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  Parentesco <span className='text-rose-600'>*</span>
                </span>
                <select
                  value={personaPagos.responsable}
                  onChange={handleChange}
                  name='responsable'
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

              <TextInputForm
                label='Correo Electrónico'
                placeholder='Correo Electrónico'
                value={personaPagos.correo}
                onChange={handleChange}
                name='correo'
                required={true}
              />

              <TextInputForm
                label='Teléfono (móvil)'
                placeholder='Teléfono (móvil)'
                value={personaPagos.telefono}
                onChange={handleChange}
                name='telefono'
                required={true}
              />

              <label className='select select-md m-auto border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  ¿Requiere Factura? <span className='text-rose-600'>*</span>
                </span>
                <select
                  value={String(personaPagos.factura)}
                  onChange={handleChange}
                  name='factura'
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge la opción...
                  </option>
                  <option value={true}>Sí</option>
                  <option value={false}>No</option>
                </select>
              </label>
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

export default EditPago
