const CiclosSectionSkeleton = () => {
  return (
    <div className='w-full max-w-4xl px-4 flex flex-col space-y-6 md:space-x-6 md:space-y-0'>
      <h2 className='h-6 bg-gray-300 rounded w-1/2 mb-4 skeleton'></h2>
      <div className='card card-border bg-base-100 w-96 skeleton'>
        <div className='card-body skeleton'>
          <div className='h-6 bg-gray-300 rounded w-1/2 mb-4 skeleton'></div>
          <div className='h-4 bg-gray-300 rounded w-full mb-2 skeleton'></div>
          <div className='h-4 bg-gray-300 rounded w-5/6 skeleton'></div>
        </div>
      </div>
    </div>
  )
}

export default CiclosSectionSkeleton
