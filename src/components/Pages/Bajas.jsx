import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { textNormalize } from '@/utils/textNormalize'
import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'

const Bajas = () => {
  const fetchWithAuth = useFetchWithAuth()

  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchStudents = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetchWithAuth('/alumnos')
      const data = await res.json()
      setStudents(data)
    } catch (error) {
      console.error('Error fetching banned students:', error)
      toast.error('Error al cargar los estudiantes baneados.')
    } finally {
      setIsLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    document.title = 'Bajas - GDM Admin'
  }, [])

  return (<div>Bajas</div>)
}

export default Bajas