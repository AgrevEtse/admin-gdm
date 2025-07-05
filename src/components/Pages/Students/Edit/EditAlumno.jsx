import { useParams } from 'react-router-dom'

const EditAlumno = () => {
  const { curp } = useParams()

  return (
    <div>
      <h1>Edit Alumno Information</h1>
    </div>
  )
}

export default EditAlumno
