import { toast } from 'react-hot-toast'

import { useAuth } from '@/context/AuthContext'

export const useFetchWithAuth = () => {
  const auth = useAuth()

  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${auth.user.token}`,
      'Content-Type': 'application/json'
    }

    const response = await fetch(url, {
      ...options,
      headers
    })

    if (response.status === 401) {
      auth.logout()
      toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.')
      return
    }

    return response
  }

  return fetchWithAuth
}
