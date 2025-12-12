import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'

const Idukay = () => {
  const fetchWithAuth = useFetchWithAuth()

  const [ciclos, setCiclos] = useState([])

  const [selectedCiclo, setSelectedCiclo] = useState('')
  const [selectedHermanos, setSelectedHermanos] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchCiclos = useCallback(async () => {
    try {
      const res = await fetchWithAuth('/ciclo')
      const data = await res.json()
      setCiclos(data)
    } catch (error) {
      console.error('Error fetching ciclos:', error)
      toast.error('Error al cargar los ciclos escolares.')
    }
  }, [fetchWithAuth])

  const handleDescargarExcel = async () => {
    if (!selectedCiclo) {
      toast.error('Selecciona un ciclo')
      return
    }

    if (!selectedHermanos) {
      toast.error('Selecciona los hermanos')
      return
    }

    try {
      const res = await fetchWithAuth('/excel', {
        method: 'POST',
        body: JSON.stringify({
          ciclo: selectedCiclo,
          hermano:
            selectedHermanos === 'C'
              ? true
              : selectedHermanos === 'S'
                ? false
                : null
        })
      })

      if (!res.ok) throw new Error('Error al descargar archivo')

      const blob = await res.blob()
      descargarArchivo(blob, `Educai_${selectedCiclo}_${selectedHermanos}.xlsx`)
    } catch (e) {
      console.error('Error downloading excel:', e)
      toast.error('Error al descargar el excel.')
    }
  }

  const descargarArchivo = (blob, nombreArchivo) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = nombreArchivo
    document.body.appendChild(a) // Necesario para Firefox según Copilot
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    document.title = `Idukay - GDM Admin`

    setIsLoading(true)
    fetchCiclos()
    setIsLoading(false)
  }, [fetchCiclos])

  return (
    <div className='mt-10 flex flex-col items-center justify-center space-y-6'>
      <h3 className='text-3xl font-bold'>Excel Idukay</h3>

      <div className='flex w-full max-w-2xl flex-col items-center space-y-4'>
        <select
          value={selectedCiclo}
          disabled={isLoading}
          className='select w-full max-w-xs'
          onChange={(e) => {
            setSelectedCiclo(e.target.value)
          }}
        >
          <option
            disabled={true}
            value=''
          >
            Selecciona un ciclo...
          </option>
          {ciclos.map((ciclo) => (
            <option
              key={ciclo.id}
              value={ciclo.nombre}
            >
              {ciclo.nombre}
            </option>
          ))}
        </select>

        <select
          value={selectedHermanos}
          disabled={isLoading}
          className='select w-full max-w-xs'
          onChange={(e) => {
            setSelectedHermanos(e.target.value)
          }}
        >
          <option
            disabled={true}
            value=''
          >
            Selecciona hermanos...
          </option>
          <option value='S'>Sin Hermanos</option>
          <option value='C'>Con Hermano</option>
          <option value='T'>Todos</option>
        </select>

        <button
          className='btn btn-secondary'
          onClick={handleDescargarExcel}
        >
          Descargar Excel
        </button>
      </div>
    </div>
  )
}

export default Idukay
