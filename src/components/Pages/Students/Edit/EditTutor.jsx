import { useParams } from 'react-router-dom'

const EditTutor = () => {
  const { curp, id } = useParams()

  return (
    <div>
      <h1>Edit Tutor {id} Information</h1>
    </div>
  )
}

export default EditTutor
