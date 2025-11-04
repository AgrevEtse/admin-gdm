import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { StudentIcon } from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { formatDate } from '@/utils/dateFormater'
import { DEFAULT_ALUMNO } from '@/utils/defaultStates'

const BajasForm = () => {
  const { curp } = useParams()
  const fetchWithAuth = useFetchWithAuth()

  const [student, setStudent] = useState(DEFAULT_ALUMNO)
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

  useEffect(() => {
    document.title = `${curp} - Bajas - GDM Admin`

    fetchStudent()
  }, [curp, fetchStudent])

  return (
    <div className='container mx-auto px-4 mt-16'>
      <h2 className='text-3xl font-bold text-center'>Dar de baja Alumno</h2>
      <p className='text-secondary text-center text-4xl my-8 font-bold'>
        {curp}
      </p>
      {!isLoading && (
        <div className='card w-96 bg-zinc-400 text-zinc-950 shadow-zinc-400 shadow-sm border hover:shadow-lg transition-shadow duration-200 ease-in-out'>
          <div className='card-body text-sm'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='card-title text-3xl'>Alumno</h2>
              <StudentIcon size={48} />
            </div>
            <p className='text-sm'>
              <span className='font-bold'>CURP</span>: {student.curp}
            </p>
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
              <span className='font-bold'>Estatura</span>: {student.estatura_cm}{' '}
              cm
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
    </div>
  )
}

export default BajasForm
