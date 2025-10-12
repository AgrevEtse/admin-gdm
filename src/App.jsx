import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import useAuth from '@/context/useAuth'

import Login from '@/components/Pages/Login'
import ProtectedRoute from '@/components/Layout/ProtectedRoute'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import EditLayout from '@/components/Layout/EditLayout'
import Dashboard from '@/components/Pages/Dashboard'
import ListStudentsAdmin from '@/components/Pages/Students/ListStudentsAdmin'
import ListStudentsMortal from '@/components/Pages/Students/ListStudentsMortal'
import StudentData from '@/components/Pages/Students/StudentData'
import Ciclos from '@/components/Pages/Ciclos'
import {
  EditAlumno,
  EditDomicilio,
  EditEscuelaProcedencia,
  EditInscripcion,
  EditTutor,
  EditHermanos,
  EditContactos,
  EditPago
} from '@/components/Pages/Students/Edit'

const App = () => {
  const auth = useAuth()

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path='/dashboard'
            element={<DashboardLayout />}
          >
            <Route
              index
              element={<Dashboard />}
            />

            {auth.user.rol === 'admin' ? (
              <Route
                path='alumnos'
                element={<ListStudentsAdmin />}
              />
            ) : (
              <Route
                path='alumnos'
                element={<ListStudentsMortal />}
              />
            )}

            <Route
              path='alumnos/:curp/:ciclo'
              element={<StudentData />}
            />

            <Route
              path='alumnos/:curp/:ciclo/edit'
              element={<EditLayout />}
            >
              <Route
                path='alumno'
                element={<EditAlumno />}
              />
              <Route
                path='domicilio'
                element={<EditDomicilio />}
              />
              <Route
                path='esc-procedencia'
                element={<EditEscuelaProcedencia />}
              />
              <Route
                path='inscripcion'
                element={<EditInscripcion />}
              />
              <Route
                path='tutor/:id'
                element={<EditTutor />}
              />
              <Route
                path='hermanos'
                element={<EditHermanos />}
              />
              <Route
                path='contactos'
                element={<EditContactos />}
              />
              <Route
                path='pago'
                element={<EditPago />}
              />
            </Route>

            <Route
              path='ciclos'
              element={<Ciclos />}
            />
          </Route>
        </Route>
      </Routes>
      <Toaster
        position='top-center'
        reverseOrder={true}
      />
    </>
  )
}

export default App
