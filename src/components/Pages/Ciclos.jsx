import { useEffect } from 'react'

const Ciclos = () => {
  useEffect(() => {
    document.title = 'Ciclos - GDM Admin'
  }, [])

  return (
    <div className='flex flex-col justify-center items-center h-full space-y-6'>
      <h2>Ciclos</h2>
    </div>
  )
}

export default Ciclos
