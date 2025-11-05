const StudentCardSkeleton = () => {
  return (
    <div className='mx-auto h-64 w-2xs'>
      <div className='card bg-base-100 h-full w-full shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title skeleton mb-4 h-6 w-1/2'></h2>
          <p className='skeleton mb-2 h-4 w-3/4'></p>
          <p className='skeleton mb-4 h-4 w-1/2'></p>
          <div className='card-actions justify-end'>
            <div className='btn btn-ghost skeleton h-10 w-28 cursor-default'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentCardSkeleton
