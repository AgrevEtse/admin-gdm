import { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import AuthContext from '@/context/AuthContext'

const initialUserState = {
  token: null,
  rol: null
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || initialUserState
  )

  const isAuthenticated = useCallback(() => {
    return user.token !== null && user.rol !== null
  }, [user.token, user.rol])

  const login = useCallback((user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setUser(initialUserState)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout
    }),
    [user, isAuthenticated, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider
