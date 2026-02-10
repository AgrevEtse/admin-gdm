import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { StudentIcon } from '@/assets/svg'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { formatDate } from '@/utils/dateFormater'
import { DEFAULT_ALUMNO } from '@/utils/defaultStates'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const BajasForm = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()

  const [student, setStudent] = useState(DEFAULT_ALUMNO)
  const [motivos, setMotivos] = useState([])
  const [baja, setBaja] = useState(0)
  const [bajaEspecifica, setBajaEspecifica] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchStudent = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetchWithAuth(`/alumno/${curp}`)
      const data = await res.json()
      setStudent(data)
    } catch (error) {
      console.error('Error fetching student data:', error)
      toast.error('Error al cargar los datos del alumno.')
    } finally {
      setIsLoading(false)
    }
  }, [curp, fetchWithAuth])

  const fetchMotivos = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetchWithAuth(`/baneo/motivo`)
      const data = await res.json()
      setMotivos(data)
    } catch (error) {
      console.error('Error fetching motivos data:', error)
      toast.error('Error al cargar los motivos de baja.')
    } finally {
      setIsLoading(false)
    }
  }, [fetchWithAuth])

  const handleBaja = async () => {
    if (baja === '42' && bajaEspecifica.trim() === '') {
      toast.error('Por favor, especifica el motivo de baja.')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetchWithAuth(`/baneo/alumno`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          curp_alumno: student.curp,
          motivo: baja,
          otro: baja === '42' ? bajaEspecifica.trim() : undefined
        })
      })

      if (res.ok) {
        toast.success('Baja registrada con éxito.')
      } else {
        toast.error('Error al registrar la baja.')
      }
    } catch (error) {
      console.error('Error al dar de baja al alumno:', error)
      toast.error('Error al dar de baja al alumno.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    cambiarTitulo(`${curp} - Dar de Baja`)

    fetchStudent()
    fetchMotivos()
  }, [curp, fetchStudent, fetchMotivos])

  return (
    <div className='container mx-auto mt-16 px-4'>
      <h2 className='text-center text-3xl font-bold'>Dar de baja Alumno</h2>
      <p className='text-secondary my-8 text-center text-4xl font-bold'>
        {curp}
      </p>
      <div className='flex flex-col items-center justify-center space-y-8'>
        {!isLoading && (
          <div className='card w-96 border bg-zinc-400 text-zinc-950 shadow-sm shadow-zinc-400 transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body text-sm'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Alumno</h2>
                <StudentIcon className='h-12 w-12' />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Nombre</span>: {student.nombre}{' '}
                {student.apellido_paterno} {student.apellido_materno}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Género</span>:{' '}
                {student.genero === 'H' ? 'Masculino' : 'Femenino'}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Fecha de Nacimiento</span>:{' '}
                {formatDate(student.fecha_nacimiento)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Tipo Sanguíneo</span>:{' '}
                {student.tipo_sanguineo}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Lateralidad</span>:{' '}
                {student.es_diestro === true ? 'Derecha' : 'Izquierda'}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Estatura</span>:{' '}
                {student.estatura_cm} cm
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Peso</span>: {student.peso_kg} kg
              </p>

              {/* Se renderiza si contiene algo */}
              {student.nota_enfermedad && (
                <p className='text-base'>
                  <span className='font-bold'>Nota Enfermedad</span>:{' '}
                  {student.nota_enfermedad}
                </p>
              )}

              {/* Se renderiza si contiene algo */}
              {student.nota_terapia && (
                <p className='text-base'>
                  <span className='font-bold'>Nota Terapia</span>:{' '}
                  {student.nota_terapia}
                </p>
              )}
            </div>
          </div>
        )}
        <div className='flex flex-col items-center justify-center space-y-4'>
          <label className='select select-md mx-auto max-w-sm border-white lg:min-w-sm'>
            <span className='label'>
              Motivo <span className='text-rose-600'>*</span>
            </span>
            <select
              value={baja}
              required
              onChange={(e) => setBaja(e.target.value)}
              name='baja'
            >
              <option
                disabled
                value='0'
              >
                Escoge el motivo..
              </option>
              {motivos.map((motivo) => (
                <option
                  key={motivo.id}
                  value={motivo.id}
                >
                  {motivo.motivo}
                </option>
              ))}
            </select>
          </label>
          {baja === '42' && (
            <input
              type='text'
              placeholder='Especifica el motivo...'
              className='input input-md mx-auto max-w-sm border-white lg:min-w-sm'
              value={bajaEspecifica}
              onChange={(e) => setBajaEspecifica(e.target.value)}
            />
          )}
          <div className='flex w-full max-w-sm flex-row justify-end lg:min-w-sm'></div>
          <button
            className='btn btn-primary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
            disabled={
              isLoading ||
              baja === 0 ||
              (baja === '42' && bajaEspecifica.trim() === '')
            }
            onClick={handleBaja}
          >
            Dar de baja
          </button>
        </div>
      </div>
    </div>
  )
}

export default BajasForm
