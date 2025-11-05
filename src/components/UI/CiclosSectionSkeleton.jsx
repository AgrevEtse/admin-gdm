const CiclosSectionSkeleton = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center space-y-6 px-4 md:space-y-0 md:space-x-6'>
      <div className='card card-border bg-base-100 skeleton w-96'>
        <div className='card-body skeleton'>
          <div className='skeleton mb-4 h-6 w-1/2 rounded'></div>
          <div className='skeleton mb-2 h-4 w-full rounded'></div>
          <div className='skeleton h-4 w-5/6 rounded'></div>
        </div>
      </div>
    </div>
  )
}

export default CiclosSectionSkeleton
