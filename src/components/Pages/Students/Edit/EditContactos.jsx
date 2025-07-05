import { useParams } from 'react-router-dom'

const EditContactos = () => {
  const { curp } = useParams()

  return (
    <div>
      <h1>Edit Contactos Information</h1>
    </div>
  )
}

export default EditContactos
