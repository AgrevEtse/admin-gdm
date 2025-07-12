import { useState, useEffect, useReducer, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { DEFAULT_ALUMNO } from '@/utils/defaultStates'
import { createReducer } from '@/utils/reducer'
import { useFetchWithAuth } from '@/utils/useFetchWithAuth'
import { formatDate, createDateISOString } from '@/utils/dateFormater'
import { PAISES_ARRAY } from '@/utils/paisesHelpers'
import { AlumnoSchema } from '@/schemas/AlumnoSchema'
import TextInputForm from '@/components/UI/TextInputForm'

const EditAlumno = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const reducer = createReducer(DEFAULT_ALUMNO)
  const [alumno, dispatch] = useReducer(reducer, DEFAULT_ALUMNO)
  const [isLoading, setIsLoading] = useState(false)

  const fetchAlumno = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetchWithAuth(`/alumno/${curp}`)
      if (!response.ok) throw new Error('Error al obtener los datos del alumno')

      const data = await response.json()
      data.fecha_nacimiento = formatDate(data.fecha_nacimiento)

      dispatch({ type: 'SET_STATE', payload: data })
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [curp, fetchWithAuth])

  useEffect(() => {
    document.title = `Editar Alumno - ${curp} - GDM Admin`

    fetchAlumno()
  }, [curp, fetchAlumno])

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
      const isValid = AlumnoSchema.safeParse(alumno)
      if (!isValid.success) throw new Error(isValid.error.issues[0].message)

      const response = await fetchWithAuth(`/alumno/${curp}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        //CTM ALEX COMO QUE TENGO QUE MANDAR LA FECHA CON EL FORMATO ISO STRING SINO DA ERROR DE QUE NO ENCUENTRA EL ID
        body: JSON.stringify({
          ...alumno,
          fecha_nacimiento: createDateISOString(alumno.fecha_nacimiento),
          curp: undefined
        })
      })

      if (!response.ok)
        throw new Error('Error al actualizar los datos del alumno')

      toast.success('Alumno actualizado correctamente')
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
          Datos del Alumno
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => (
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
                label='Nombre(s)'
                placeholder='Nombre(s)'
                value={alumno.nombre}
                onChange={handleChange}
                name='nombre'
                required={true}
              />

              <TextInputForm
                label='Apellido Paterno'
                placeholder='Apellido Paterno'
                value={alumno.apellido_paterno}
                onChange={handleChange}
                name='apellido_paterno'
                required={true}
              />

              <TextInputForm
                label='Apellido Materno'
                placeholder='Apellido Materno'
                value={alumno.apellido_materno}
                onChange={handleChange}
                name='apellido_materno'
                required={true}
              />

              <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  Género <span className='text-rose-600'>*</span>
                </span>
                <select
                  value={alumno.genero}
                  required
                  onChange={handleChange}
                  name='genero'
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge el género...
                  </option>
                  <option value='H'>Hombre</option>
                  <option value='M'>Mujer</option>
                </select>
              </label>

              <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  Tipo Sanguíneo <span className='text-rose-600'>*</span>
                </span>
                <select
                  value={alumno.tipo_sanguineo}
                  required
                  onChange={handleChange}
                  name='tipo_sanguineo'
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge el tipo sanguineo...
                  </option>
                  <option value='A+'>A+</option>
                  <option value='A-'>A-</option>
                  <option value='B+'>B+</option>
                  <option value='B-'>B-</option>
                  <option value='AB+'>AB+</option>
                  <option value='AB-'>AB-</option>
                  <option value='O+'>O+</option>
                  <option value='O-'>O-</option>
                </select>
              </label>

              <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  Lateralidad <span className='text-rose-600'>*</span>
                </span>
                <select
                  value={alumno.es_diestro}
                  required
                  onChange={handleChange}
                  name='es_diestro'
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge la lateralidad...
                  </option>
                  <option value={true}>Derecho</option>
                  <option value={false}>Izquierdo</option>
                </select>
              </label>

              <label className='input input-md border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  Fecha Nacimiento <span className='text-rose-600'>*</span>
                </span>
                <input
                  value={alumno.fecha_nacimiento}
                  required
                  onChange={handleChange}
                  type='date'
                  name='fecha_nacimiento'
                />
              </label>

              <label className='select select-md border-white mx-auto max-w-sm lg:min-w-sm'>
                <span className='label'>
                  Nacionalidad <span className='text-rose-600'>*</span>
                </span>
                <select
                  value={alumno.nacionalidad}
                  required
                  onChange={handleChange}
                  name='nacionalidad'
                >
                  <option
                    disabled
                    value='0'
                  >
                    Escoge la nacionalidad...
                  </option>
                  {PAISES_ARRAY.map((pais) => (
                    <option
                      key={pais.id}
                      value={pais.value}
                    >
                      {pais.label}
                    </option>
                  ))}
                </select>
              </label>

              <TextInputForm
                label='Estatura (cm)'
                placeholder='Estatura (cm)'
                value={alumno.estatura_cm}
                onChange={handleChange}
                name='estatura_cm'
                required={true}
              />

              <TextInputForm
                label='Peso (kg)'
                placeholder='Peso (kg)'
                value={alumno.peso_kg}
                onChange={handleChange}
                name='peso_kg'
                required={true}
              />

              <fieldset className='fieldset max-w-sm lg:min-w-sm mx-auto flex flex-col justify-center items-center'>
                <legend className='fieldset-legend'>Cuestiones Médicas</legend>
                <textarea
                  value={alumno.nota_enfermedad}
                  onChange={handleChange}
                  minLength={0}
                  maxLength={200}
                  name='nota_enfermedad'
                  className='textarea h-24 border-white w-full '
                  placeholder='Indique si el alumno padece de alguna discapacidad, enfermedad crónica, alergias o algún tipo de tratamiento médico.'
                ></textarea>
              </fieldset>

              <fieldset className='fieldset max-w-sm lg:min-w-sm mx-auto flex flex-col justify-center items-center'>
                <legend className='fieldset-legend'>Terapias</legend>
                <textarea
                  value={alumno.nota_terapia}
                  onChange={handleChange}
                  minLength={0}
                  maxLength={200}
                  name='nota_terapia'
                  className='textarea h-24 border-white w-full'
                  placeholder='Indique si el alumno asiste a terapia, explique de que tipo: físico, psicológica u otra y por qué'
                ></textarea>
              </fieldset>
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

export default EditAlumno
