import { useNavigate } from 'react-router-dom'

const StudentCard = ({ student }) => {
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
      <div className='card bg-primary text-primary-content shadow-xl w-2xs h-64'>
        Datos incompletos
      </div>
    )
  }

  const seeDetails = () => {
    console.log(`Ver detalles de ${fullName} con CURP: ${curp}`)
    navigate(`/dashboard/alumnos/${curp}`)
  }

  return (
    <div className='card bg-primary text-primary-content shadow-xl w-2xs h-64'>
      <div className='card-body'>
        <h2 className='card-title'>{curp}</h2>
        <p>{`${fullName}`}</p>
        <p>Escolaridad: {escolaridad}</p>
        <div className='card-actions justify-end'>
          <button
            className='btn btn-secondary'
            onClick={seeDetails}
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentCard
