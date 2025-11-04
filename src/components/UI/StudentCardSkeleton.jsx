const StudentCardSkeleton = () => {
  return (
    <div className='w-2xs h-64 mx-auto'>
      <div className='card bg-base-100 shadow-xl w-full h-full'>
        <div className='card-body'>
          <h2 className='card-title h-6 w-1/2 mb-4 skeleton'></h2>
          <p className=' h-4 w-3/4 mb-2 skeleton'></p>
          <p className=' h-4 w-1/2 mb-4 skeleton'></p>
          <div className='card-actions justify-end'>
            <div className='btn btn-ghost cursor-default w-28 h-10 skeleton'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentCardSkeleton
