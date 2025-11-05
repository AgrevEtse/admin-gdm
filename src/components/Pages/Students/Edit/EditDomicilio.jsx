import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { DEFAULT_DOMICILIO } from '@/utils/defaultStates'
import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { ESTADOS_ARRAY } from '@/utils/estadosHelpers'
import { getMunicipiosByEstado } from '@/utils/municipiosHelpers'
import { DomicilioSchema } from '@/schemas/DomicilioSchema'
import TextInputForm from '@/components/UI/TextInputForm'

const EditDomicilio = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

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
          Datos del Domicilio
        </h2>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
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

              <label className='select select-md mx-auto max-w-sm border-white lg:min-w-sm'>
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

              <label className='select select-md mx-auto max-w-sm border-white lg:min-w-sm'>
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

export default EditDomicilio
