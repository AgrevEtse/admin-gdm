import { useNavigate } from 'react-router-dom'

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
      <div className='card bg-primary text-primary-content w-2xs h-64 shadow-primary shadow-sm border-1 hover:shadow-lg transition-shadow duration-200 ease-in-out'>
        Datos incompletos
      </div>
    )
  }

  return (
    <div className='card bg-primary text-primary-content w-2xs h-64 mx-auto shadow-primary shadow-sm border-1 hover:shadow-lg transition-shadow duration-200 ease-in-out'>
      <div className='card-body'>
        <h2 className='card-title'>{curp}</h2>
        <p>{`${fullName}`}</p>
        <p>Escolaridad: {escolaridad}</p>
        <div className='card-actions justify-end'>
          <button
            className='btn btn-secondary active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
            onClick={() => {
              navigate(`/dashboard/alumnos/${curp}`, { state: { ciclo } })
            }}
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentCard
