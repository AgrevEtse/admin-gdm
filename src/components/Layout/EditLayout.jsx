import { useParams, Outlet } from 'react-router-dom'

const EditLayout = () => {
  const { curp } = useParams()

  return (
    <div className='flex flex-col h-full'>
      <h3>This is the edit layout area.</h3>
      <h1>{curp}</h1>
      <Outlet />
    </div>
  )
}

export default EditLayout
