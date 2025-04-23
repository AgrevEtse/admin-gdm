import { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  const login = (token) => {
    setToken(token)
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
