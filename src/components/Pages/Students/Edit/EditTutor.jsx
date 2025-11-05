import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { DEFAULT_TUTOR } from '@/utils/defaultStates'
import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { formatDate, createDateISOString } from '@/utils/dateFormater'
import { GRADO_MAX_ESTUDIOS_ARRAY } from '@/utils/gradoMaxEstudiosHelpers'
import { TutorSchema } from '@/schemas/TutorSchema'
import TextInputForm from '@/components/UI/TextInputForm'

const EditTutor = () => {
  const { curp, id } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const reducer = createReducer(DEFAULT_TUTOR)
  const [tutor, dispatch] = useReducer(reducer, DEFAULT_TUTOR)
  const [isLoading, setIsLoading] = useState(false)

  const fetchTutor = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/tutor${id}/${curp}`)
      if (!response.ok)
        throw new Error(`Error al obtener el tutor ${id} del alumno`)

      const data = await response.json()
      data[0].fecha_nacimiento = formatDate(data[0].fecha_nacimiento)

      dispatch({ type: 'SET_STATE', payload: data[0] })
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [curp, id, fetchWithAuth])

  useEffect(() => {
    document.title = `Editar Tutor ${id} - ${curp} - GDM Admin`

    fetchTutor()
  }, [curp, id, fetchTutor])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        field: name,
        value: name === 'primario' ? value === 'true' : value
      }
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const isValid = TutorSchema.safeParse(tutor)
      if (!isValid.success) throw new Error(isValid.error.issues[0].message)

      const response = await fetchWithAuth(`/tutor${id}/${tutor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tutor,
          fecha_nacimiento: createDateISOString(tutor.fecha_nacimiento),
          curp_alumno: undefined,
          id: undefined
        })
      })

      if (!response.ok)
        throw new Error(`Error al actualizar el tutor ${id} del alumno`)

      toast.success(`Tutor ${id} actualizado correctamente`)
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
          Datos del Tutor {id} /{' '}
          {id === '1' ? 'Papá' : id === '2' ? 'Mamá' : '¿?'}
        </h2>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {isLoading &&
            Array.from({ length: 14 }).map((_, index) => (
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
                label='Nombre(s)'
                placeholder='Nombre(s)'
                value={tutor.nombre}
                onChange={handleChange}
                name='nombre'
                required={true}
              />

              <TextInputForm
                label='Apellido Paterno'
                placeholder='Apellido Paterno'
                value={tutor.apellido_paterno}
                onChange={handleChange}
                name='apellido_paterno'
                required={true}
              />

              <TextInputForm
                label='Apellido Materno'
                placeholder='Apellido Materno'
                value={tutor.apellido_materno}
                onChange={handleChange}
                name='apellido_materno'
                required={true}
              />

              <TextInputForm
                label='Lugar de Nacimiento'
                placeholder='Lugar de Nacimiento'
                value={tutor.estado_nacimiento}
                onChange={handleChange}
                name='estado_nacimiento'
                required={true}
              />

              <label className='input input-md mx-auto max-w-sm border-white lg:min-w-sm'>
                <span className='label'>
                  Fecha Nacimiento <span className='text-rose-600'>*</span>
                </span>
                <input
                  value={tutor.fecha_nacimiento}
                  required
                  onChange={handleChange}
                  type='date'
                  name='fecha_nacimiento'
                />
              </label>

              <TextInputForm
                label='Domicilio'
                placeholder='Domicilio'
                value={tutor.domicilio}
                onChange={handleChange}
                name='domicilio'
                required={true}
              />

              <TextInputForm
                label='Colonia'
                placeholder='Colonia'
                value={tutor.colonia}
                onChange={handleChange}
                name='colonia'
                required={true}
              />

              <TextInputForm
                label='C.P.'
                placeholder='C.P.'
                type='number'
                value={tutor.codigo_postal}
                onChange={handleChange}
                name='codigo_postal'
                required={true}
              />

              <TextInputForm
                label='Télefono (móvil)'
                placeholder='Télefono (móvil)'
                type='tel'
                value={tutor.telefono_movil}
                onChange={handleChange}
                name='telefono_movil'
                required={true}
              />

              <TextInputForm
                label='Télefono (fijo)'
                placeholder='Télefono (fijo)'
                type='tel'
                value={tutor.telefono_fijo}
                onChange={handleChange}
                name='telefono_fijo'
              />

              <TextInputForm
                label='Correo Electrónico'
                placeholder='Correo Electrónico'
                type='email'
                value={tutor.correo_electronico}
                onChange={handleChange}
                name='correo_electronico'
                required={true}
              />

              <TextInputForm
                label='Ocupación'
                placeholder='Ocupación'
                value={tutor.oupacion}
                onChange={handleChange}
                name='oupacion'
                required={true}
              />

              <label className='select select-md mx-auto max-w-sm border-white lg:min-w-sm'>
                <span className='label'>
                  Grado Máx Estudios <span className='text-rose-600'>*</span>
                </span>
                <select
                  required
                  value={tutor.grado_max_estudios}
                  onChange={handleChange}
                  name='grado_max_estudios'
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge el Grado Estudios...
                  </option>
                  {GRADO_MAX_ESTUDIOS_ARRAY.map(({ id, value, label }) => (
                    <option
                      key={id}
                      value={value}
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className='select select-md mx-auto max-w-sm border-white lg:min-w-sm'>
                <span className='label'>
                  ¿Es tutor principal? <span className='text-rose-600'>*</span>
                </span>
                <select
                  value={String(tutor.primario)}
                  onChange={handleChange}
                  name='primario'
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

export default EditTutor
