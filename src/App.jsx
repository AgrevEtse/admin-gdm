import { Toaster } from 'react-hot-toast'

import AuthProvider from '@/context/AuthProvider'
import AppRouter from '@/router/AppRouter'

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster
        position='top-center'
        reverseOrder={true}
      />
    </AuthProvider>
  )
}

export default App
