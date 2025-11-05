import { useParams, Outlet } from 'react-router-dom'

const EditLayout = () => {
  const { curp } = useParams()

  return (
    <div className='h-full w-full'>
      <h2 className='text-center text-3xl font-bold'>Editar Alumno</h2>
      <p className='text-secondary my-8 text-center text-4xl font-bold'>
        {curp}
      </p>
      <div className='container mx-auto mt-16 h-full w-full px-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default EditLayout
