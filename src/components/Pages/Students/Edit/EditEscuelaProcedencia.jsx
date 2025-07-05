import { useParams } from 'react-router-dom'

const EditEscuelaProcedencia = () => {
  const { curp } = useParams()

  return (
    <div>
      <h1>Edit EscuelaProcedencia Information</h1>
    </div>
  )
}

export default EditEscuelaProcedencia
