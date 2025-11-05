const StudentDataSkeleton = () => {
  return (
    <div className='mx-auto h-96 w-96'>
      <div className='card bg-base-100 h-full w-full shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title skeleton mb-4 h-6 w-1/2'></h2>
          <p className='skeleton mb-2 h-1 w-3/4'></p>
          <p className='skeleton mb-2 h-1 w-1/2'></p>
          <p className='skeleton mb-2 h-1 w-3/4'></p>
          <p className='skeleton mb-2 h-1 w-1/2'></p>
        </div>
      </div>
    </div>
  )
}

export default StudentDataSkeleton
