import { useNavigate } from 'react-router-dom'

const BajasItem = ({ student }) => {
  const navigate = useNavigate()
  return (
    <div className='w-full lg:w-2xl p-6 flex flex-col items-center justify-center rounded bg-secondary border border-secondary-content space-y-4'>
      <div className='flex flex-row items-center justify-between w-full'>
        <p className='font-bold'>{student.curp}</p>
        <p>
          {student.nombre} {student.apellido_paterno} {student.apellido_materno}
        </p>
      </div>
      <div className='flex flex-row justify-end w-full'>
        <button
          className='btn btn-primary active:scale-105 hover:scale-105 transition-transform duration-200 ease-in-out'
          onClick={() => navigate(`/dashboard/bajas/${student.curp}`)}
        >
          Dar de baja
        </button>
      </div>
    </div>
  )
}

export default BajasItem
