import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { DEFAULT_DOMICILIO } from '@/utils/defaultStates'
import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/utils/useFetchWithAuth'
import { ESTADOS_ARRAY } from '@/utils/estadosHelpers'
import { getMunicipiosByEstado } from '@/utils/municipiosHelpers'
import { DomicilioSchema } from '@/schemas/DomicilioSchema'
import TextInputForm from '@/components/UI/TextInputForm'

const EditDomicilio = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()

  const reducer = createReducer(DEFAULT_DOMICILIO)
  const [domicilio, dispatch] = useReducer(reducer, DEFAULT_DOMICILIO)
  const [isLoading, setIsLoading] = useState(false)

  const fetchDomicilio = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/domicilio/${curp}`)
      if (!response.ok)
        throw new Error('Error al obtener el domicilio del alumno')

      const data = await response.json()

      dispatch({ type: 'SET_STATE', payload: data[0] })
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [curp, fetchWithAuth])

  useEffect(() => {
    document.title = `Editar Domicilio - ${curp} - GDM Admin`

    fetchDomicilio()
  }, [curp, fetchDomicilio])

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
      const isValid = DomicilioSchema.safeParse(domicilio)
      if (!isValid.success) throw new Error(isValid.error.issues[0].message)

      const response = await fetchWithAuth(`/domicilio/${domicilio.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...domicilio,
          curp_alumno: undefined,
          id: undefined
        })
      })

      if (!response.ok)
        throw new Error('Error al actualizar el domicilio del alumno')

      toast.success('Domicilio actualizado correctamente')
      //TODO: Navigate to the student detail page or show a success message
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
          Datos del Domicilio
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
                label='Domicilio'
                placeholder='Domicilio'
                value={domicilio.domicilio}
                onChange={handleChange}
                name='domicilio'
                required={true}
              />

              <TextInputForm
                label='Colonia'
                placeholder='Colonia'
                value={domicilio.colonia}
                onChange={handleChange}
                name='colonia'
                required={true}
              />

              <TextInputForm
                label='C.P.'
                placeholder='C.P.'
                type='number'
                value={domicilio.codigo_postal}
                onChange={handleChange}
                name='codigo_postal'
                required={true}
              />

              <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  Estado <span className='text-rose-600'>*</span>
                </span>
                <select
                  required
                  value={domicilio.estado}
                  name='estado'
                  onChange={(e) => {
                    handleChange(e)
                    // Update ciudad to the first municipio of the selected estado
                    if (e.target.value !== '0') {
                      const firstMunicipio = getMunicipiosByEstado(
                        e.target.value
                      )[0]
                      dispatch({
                        type: 'UPDATE_FIELD',
                        payload: { field: 'ciudad', value: firstMunicipio }
                      })
                    } else {
                      dispatch({
                        type: 'UPDATE_FIELD',
                        payload: { field: 'ciudad', value: '0' }
                      })
                    }
                  }}
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge el estado...
                  </option>
                  {ESTADOS_ARRAY.map((estado) => (
                    <option
                      key={estado.id}
                      value={estado.value}
                    >
                      {estado.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  Ciudad <span className='text-rose-600'>*</span>
                </span>
                <select
                  required
                  disabled={domicilio.estado === '0'}
                  value={domicilio.ciudad}
                  name='ciudad'
                  onChange={handleChange}
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge el municipio...
                  </option>
                  {domicilio.estado !== '0' &&
                    getMunicipiosByEstado(domicilio.estado).map((municipio) => {
                      return (
                        <option
                          key={municipio}
                          value={municipio}
                        >
                          {municipio}
                        </option>
                      )
                    })}
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

export default EditDomicilio
