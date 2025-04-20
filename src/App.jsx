import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <main className='flex flex-row items-center justify-center w-[90vw] min-h-[80vh] my-[10vh] mx-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </main>
  )
}

export default App
