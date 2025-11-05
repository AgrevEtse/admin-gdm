const BajasAlumnoItemSkeleton = () => {
  return (
    <div className='bg-base-100 flex w-full flex-col items-center justify-center space-y-4 rounded p-6 lg:w-2xl'>
      <div className='flex w-full flex-row items-center justify-between'>
        <div className='skeleton h-6 w-1/4'></div>
        <div className='skeleton h-6 w-1/4'></div>
      </div>
    </div>
  )
}

export default BajasAlumnoItemSkeleton
