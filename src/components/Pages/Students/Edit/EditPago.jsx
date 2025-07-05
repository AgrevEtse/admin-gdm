import { useParams } from 'react-router-dom'

const EditPago = () => {
  const { curp } = useParams()

  return (
    <div>
      <h1>Edit Pago Information</h1>
    </div>
  )
}

export default EditPago
