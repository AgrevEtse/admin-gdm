import { useNavigate } from 'react-router-dom'
import { UserMinusIcon } from '@/assets/svg'

const BajasItem = ({ student }) => {
  const navigate = useNavigate()

  return (
    <div className='bg-neutral-content border-neutral shadow-neutral-content text-neutral flex w-full flex-col items-center justify-center space-y-4 rounded border p-6 shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg lg:w-2xl'>
      <div className='flex w-full flex-row items-center justify-between'>
        <p className='font-bold'>{student.curp}</p>
        <p>
          {student.nombre} {student.apellido_paterno} {student.apellido_materno}
        </p>
      </div>
      <div className='flex w-full flex-row justify-end'>
        <button
          className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
          onClick={() => navigate(`/dashboard/bajas/${student.curp}`)}
        >
          <UserMinusIcon className='h-9 w-9' />
        </button>
      </div>
    </div>
  )
}

export default BajasItem
