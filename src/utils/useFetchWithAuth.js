import { useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { useAuth } from '@/context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL

export const useFetchWithAuth = () => {
  const auth = useAuth()

  const fetchWithAuth = useCallback(async (endpoint, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${auth.user.token}`,
      'Content-Type': 'application/json'
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    })

    if (response.status === 401) {
      auth.logout()
      toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.')
      return
    }

    return response
  }, [auth])

  return fetchWithAuth
}
