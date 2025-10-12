import { useState } from 'react'
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

  const isAuthenticated = () => {
    return user.token !== null && user.rol !== null
  }

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(initialUserState)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider
