import { useParams, Outlet } from 'react-router-dom'

const EditLayout = () => {
  const { curp } = useParams()

  return (
    <div className='w-full h-full'>
      <h2 className='text-3xl font-bold text-center'>
        Editar Alumno
      </h2>
      <p className='text-secondary text-center text-4xl my-8 font-bold'>{curp}</p>
      <div className='container mx-auto px-4 mt-16 w-full h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default EditLayout
