import { useParams } from 'react-router-dom'

const EditHermanos = () => {
  const { curp } = useParams()

  return (
    <div>
      <h1>Edit Hermanos Information</h1>
    </div>
  )
}

export default EditHermanos
