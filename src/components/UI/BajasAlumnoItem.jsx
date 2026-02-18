const BajasAlumnoItem = ({ student }) => {
  return (
    <div className='bg-neutral-content border-neutral text-neutral shadow-neutral-content flex w-full flex-col items-center justify-between space-y-4 rounded border p-6 shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg lg:w-2xl'>
      <div className='flex w-full flex-row items-center justify-between'>
        <span className='font-mono text-sm'>{student.curp}</span>
        <span>{student.fecha}</span>
        <span>{student.motivo}</span>
      </div>
    </div>
  )
}

export default BajasAlumnoItem
