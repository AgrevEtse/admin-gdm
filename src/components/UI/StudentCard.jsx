import { useNavigate } from 'react-router-dom'
import { EyeIcon } from '@phosphor-icons/react'

const StudentCard = ({ student, ciclo }) => {
  const navigate = useNavigate()

  if (!student) {
    return null
  }

  const { curp, apellido_paterno, apellido_materno, nombre, escolaridad } =
    student

  const fullName = `${apellido_paterno} ${apellido_materno}, ${nombre}`

  if (
    !curp ||
    !apellido_paterno ||
    !apellido_materno ||
    !nombre ||
    !escolaridad
  ) {
    return (
      <div className='card bg-primary text-primary-content shadow-primary h-64 w-2xs border shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
        Datos incompletos
      </div>
    )
  }

  return (
    <div className='card bg-primary text-primary-content shadow-primary mx-auto h-64 w-2xs border shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
      <div className='card-body'>
        <h2 className='card-title'>{curp}</h2>
        <p>{`${fullName}`}</p>
        <p>Escolaridad: {escolaridad}</p>
        <div className='card-actions justify-end'>
          <button
            className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
            onClick={() => {
              navigate(`/dashboard/inscripciones/${curp}/${ciclo}`)
            }}
          >
            <EyeIcon size={32} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentCard
