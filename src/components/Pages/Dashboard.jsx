import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <h1 className='text-3xl font-bold'>Bienvenido al Dashboard</h1>
      <div className='mt-4'>
        <Link
          to='/dashboard/students'
          className='btn btn-primary'
        >
          Ver Estudiantes
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
