import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Login from '@/components/Pages/Login'
import ProtectedRoute from '@/components/Layout/ProtectedRoute'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import Dashboard from '@/components/Pages/Dashboard'
import RoleBasedView from '@/components/Layout/RoleBasedView'
import ListStudentsAdmin from '@/components/Pages/Students/ListStudentsAdmin'
import ListStudentsMortal from '@/components/Pages/Students/ListStudentsMortal'
import StudentData from '@/components/Pages/Students/StudentData'
import EditLayout from '@/components/Layout/EditLayout'
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
import CiclosAdmin from '@/components/Pages/CiclosAdmin'
import CiclosMortal from '@/components/Pages/CiclosMortal'
import BajasList from '@/components/Pages/Bajas/BajasList'
import BajasForm from '@/components/Pages/Bajas/BajasForm'

const App = () => {
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

            <Route
              path='inscripciones'
              element={
                <RoleBasedView
                  adminComponent={<ListStudentsAdmin />}
                  mortalComponent={<ListStudentsMortal />}
                />
              }
            />

            <Route
              path='inscripciones/:curp/:ciclo'
              element={<StudentData />}
            />

            <Route
              path='inscripciones/:curp/:ciclo/edit'
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
              element={
                <RoleBasedView
                  adminComponent={<CiclosAdmin />}
                  mortalComponent={<CiclosMortal />}
                />
              }
            />

            <Route
              path='bajas'
              element={
                <RoleBasedView
                  adminComponent={<BajasList />}
                  mortalComponent={null}
                />
              }
            />

            <Route
              path='bajas/:curp'
              element={
                <RoleBasedView
                  adminComponent={<BajasForm />}
                  mortalComponent={null}
                />
              }
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
