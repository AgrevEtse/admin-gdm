import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '@/components/Pages/Login'
import ProtectedRoute from '@/router/ProtectedRoute'
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
import BajasAlumnosList from '@/components/Pages/Bajas/BajasAlumnosList'
import BajasForm from '@/components/Pages/Bajas/BajasForm'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path='dashboard'
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
            </Route>{' '}
            {/* /inscripciones/:curp/:ciclo/edit */}
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
              path='bajas/alumnos'
              element={
                <RoleBasedView
                  adminComponent={<BajasAlumnosList />}
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
          </Route>{' '}
          {/* dashboard */}
        </Route>{' '}
        {/* <ProtectedRoute /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
