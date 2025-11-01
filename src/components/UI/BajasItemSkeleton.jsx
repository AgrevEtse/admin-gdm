const BajasItemSkeleton = () => {
  return (
    <div className='w-full lg:w-2xl p-6 flex flex-col items-center justify-center bg-base-100 rounded space-y-4'>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='w-1/4 h-6 skeleton'></div>
        <div className='w-1/4 h-6 skeleton'></div>
      </div>
      <div className='flex flex-row justify-end w-full'>
        <button className='btn skeleton h-8 w-24'></button>
      </div>
    </div>
  )
}

export default BajasItemSkeleton
