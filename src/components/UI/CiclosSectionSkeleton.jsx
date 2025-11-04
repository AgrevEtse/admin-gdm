const CiclosSectionSkeleton = () => {
  return (
    <div className='w-full px-4 flex flex-col space-y-6 md:space-x-6 md:space-y-0 justify-center items-center'>
      <div className='card card-border bg-base-100 w-96 skeleton'>
        <div className='card-body skeleton'>
          <div className='h-6 rounded w-1/2 mb-4 skeleton'></div>
          <div className='h-4 rounded w-full mb-2 skeleton'></div>
          <div className='h-4 rounded w-5/6 skeleton'></div>
        </div>
      </div>
    </div>
  )
}

export default CiclosSectionSkeleton
