import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import CiclosSectionSkeleton from '@/components/UI/CiclosSectionSkeleton'

const CiclosMortal = () => {
  const fetchWithAuth = useFetchWithAuth()

  const [cicloAnual, setCicloAnual] = useState(null)
  const [cicloSemestral, setCicloSemestral] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCiclos = useCallback(async () => {
    setIsLoading(true)
    try {
      const resCicloAnual = await fetchWithAuth('/ciclo/anual')
      const dataCicloAnual = await resCicloAnual.json()
      setCicloAnual(dataCicloAnual)

      const resCicloSemestral = await fetchWithAuth('/ciclo/semestre')
      const dataCicloSemestral = await resCicloSemestral.json()
      setCicloSemestral(dataCicloSemestral)
    } catch (error) {
      console.error('Error fetching ciclos:', error)
      toast.error('Error al cargar los ciclos.')
    } finally {
      setIsLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    document.title = 'Ciclos - GDM Admin'

    fetchCiclos()
  }, [fetchCiclos])

  return (
    <div className='mt-10 flex h-full flex-col items-center justify-center space-y-6'>
      <h2 className='text-3xl font-bold'>Ciclos</h2>
      <div className='divider'></div>

      <h2 className='text-xl font-bold'>Ciclos Activos</h2>
      <div className='flex w-full flex-col justify-center space-y-6 px-4 md:flex-row md:space-y-0 md:space-x-6'>
        {isLoading ? (
          <>
            <CiclosSectionSkeleton />
            <CiclosSectionSkeleton />
          </>
        ) : (
          <>
            <div className='card w-xs border bg-emerald-500'>
              <div className='card-body'>
                <h2 className='card-title justify-center'>Ciclo Anual</h2>
                <p className='text-center'>
                  {cicloAnual ? cicloAnual.nombre : 'No hay ciclo anual actual'}
                </p>
              </div>
            </div>
            <div className='card w-xs border bg-red-500'>
              <div className='card-body'>
                <h2 className='card-title justify-center'>Ciclo Semestral</h2>
                <p className='text-center'>
                  {cicloSemestral
                    ? cicloSemestral.nombre
                    : 'No hay ciclo semestral actual'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CiclosMortal
