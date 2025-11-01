import { useParams } from 'react-router-dom'

const BajasForm = () => {
  const { curp } = useParams()

  return <div>{curp}</div>
}

export default BajasForm
