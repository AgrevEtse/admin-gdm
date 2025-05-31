const StudentDataSkeleton = () => {
  return (
    <div className='w-96 h-96 mx-auto'>
      <div className='card bg-base-100 shadow-xl w-full h-full'>
        <div className='card-body'>
          <h2 className='card-title h-6 w-1/2 mb-4 skeleton'></h2>
          <p className=' h-1 w-3/4 mb-2 skeleton'></p>
          <p className=' h-1 w-1/2 mb-2 skeleton'></p>
          <p className=' h-1 w-3/4 mb-2 skeleton'></p>
          <p className=' h-1 w-1/2 mb-2 skeleton'></p>
        </div>
      </div>
    </div>
  )
}

export default StudentDataSkeleton
