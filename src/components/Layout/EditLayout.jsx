import { useParams, Outlet } from 'react-router-dom'

const EditLayout = () => {
  const { curp } = useParams()

  return (
    <div className='w-full h-full'>
      <h3 className='text-3xl font-bold text-center'>
        Editar Alumno <span className='text-secondary'>{curp}</span>
      </h3>
      <div className='container mx-auto px-4 mt-16 w-full h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default EditLayout
