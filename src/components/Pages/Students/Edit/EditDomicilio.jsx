import { useParams } from 'react-router-dom'

const EditDomicilio = () => {
  const { curp } = useParams()

  return (
    <div>
      <h1>Edit Domicilio Information</h1>
    </div>
  )
}

export default EditDomicilio
