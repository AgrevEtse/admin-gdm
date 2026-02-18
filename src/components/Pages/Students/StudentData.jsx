import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  StudentIcon,
  SignpostIcon,
  GraduationCapIcon,
  CertificateIcon,
  PersonIcon,
  UsersThreeIcon,
  UsersFourIcon,
  MoneyWavyIcon,
  PencilSimpleIcon
} from '@/assets/svg'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { formatDate } from '@/utils/dateFormater'
import { getParentescoById } from '@/utils/parentescoHelpers'
import { getEscolaridadById, getGradoById } from '@/utils/escolaridadIdHelpers'
import StudentDataSkeleton from '@/components/UI/StudentDataSkeleton'
import { cambiarTitulo } from '@/utils/cambiarTitulo'

const StudentData = () => {
  const { curp, ciclo } = useParams()
  const fetchWithAuth = useFetchWithAuth()
  const navigate = useNavigate()

  const [alumno, setAlumno] = useState({})
  const [domicilio, setDomicilio] = useState([])
  const [escuelaProcedencia, setEscuelaProcedencia] = useState({})
  const [tutor1, setTutor1] = useState([])
  const [tutor2, setTutor2] = useState([])
  const [hermanos, setHermanos] = useState([])
  const [contacto, setContacto] = useState([])
  const [pago, setPago] = useState({})
  const [inscripcion, setInscripcion] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(null)

  const fecthStudentData = useCallback(async () => {
    try {
      setIsLoading(true)

      const resAlumno = await fetchWithAuth(`/alumno/${curp}`)
      const dataAlumno = await resAlumno.json()
      setAlumno(dataAlumno)

      const resEscuelaProcedencia = await fetchWithAuth(
        `/escuelaprocedencia/${curp}`
      )
      const dataEscuelaProcedencia = await resEscuelaProcedencia.json()
      setEscuelaProcedencia(dataEscuelaProcedencia)

      const resDomicilio = await fetchWithAuth(`/domicilio/${curp}`)
      const dataDomicilio = await resDomicilio.json()
      setDomicilio(dataDomicilio)

      const resTutor1 = await fetchWithAuth(`/tutor1/${curp}`)
      const dataTutor1 = await resTutor1.json()
      setTutor1(dataTutor1[0])

      const resTutor2 = await fetchWithAuth(`/tutor2/${curp}`)
      const dataTutor2 = await resTutor2.json()
      setTutor2(dataTutor2)

      const resHermanos = await fetchWithAuth(`/hermano/${curp}?ciclo=${ciclo}`)
      const dataHermanos = await resHermanos.json()
      setHermanos(dataHermanos.slice(0, 3))

      const resContactos = await fetchWithAuth(`/contactoemergencia/${curp}`)
      const dataContactos = await resContactos.json()
      setContacto(dataContactos.slice(0, 3))

      const resPago = await fetchWithAuth(`/personapagos/${curp}`)
      const dataPago = await resPago.json()
      setPago(dataPago)

      const resInscripcion = await fetchWithAuth(`/inscripcion/findone`, {
        method: 'POST',
        body: JSON.stringify({ curp: curp, ciclo: ciclo })
      })
      const dataInscripcion = await resInscripcion.json()
      setInscripcion(dataInscripcion[0])
      setIsActive(dataInscripcion?.[0]?.esta_activo || false)
    } catch (error) {
      console.error('Error fetching alumno:', error)
      toast.error('Ocurrió un error al cargar los datos del alumno.')
    } finally {
      setIsLoading(false)
    }
  }, [curp, fetchWithAuth, ciclo])

  useEffect(() => {
    cambiarTitulo(`${curp} - Inscripciones`)

    fecthStudentData()
  }, [curp, fecthStudentData, ciclo])

  const handleDesactivarInscripcion = async () => {
    try {
      const rol = getEscolaridadById(inscripcion?.id_escolaridad).toLowerCase()
      if (!rol) throw new Error('Rol desconocido')

      const res = await fetchWithAuth(`/inscripcion/validar`, {
        method: 'POST',
        body: JSON.stringify({
          curp: curp,
          rol: rol,
          ciclo: ciclo,
          validado: 0
        })
      })

      if (!res.ok) throw new Error('Error al desactivar la inscripción.')

      const data = await res.json()

      toast.success(data.message || 'Inscripción desactivada correctamente.')
      fecthStudentData()
    } catch (error) {
      console.error('Error desactivando inscripción:', error)
      toast.error(
        error.message || 'Ocurrió un error al desactivar la inscripción.'
      )
    }
  }

  const handleActivarInscripcion = async () => {
    try {
      const rol = getEscolaridadById(inscripcion?.id_escolaridad).toLowerCase()
      if (!rol) throw new Error('Rol desconocido')

      const res = await fetchWithAuth(`/inscripcion/validar`, {
        method: 'POST',
        body: JSON.stringify({
          curp: curp,
          rol: rol,
          ciclo: ciclo,
          validado: 1
        })
      })

      if (!res.ok) throw new Error('Error al activar la inscripción.')

      const data = await res.json()

      toast.success(data.message || 'Inscripción activada correctamente.')
      fecthStudentData()
    } catch (error) {
      console.error('Error activando inscripción:', error)
      toast.error(
        error.message || 'Ocurrió un error al activar la inscripción.'
      )
    }
  }

  const descargarArchivo = (blob, nombreArchivo) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = nombreArchivo
    document.body.appendChild(a) // Necesario para Firefox según Copilot
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleDescargarDocx = async () => {
    try {
      const res = await fetchWithAuth(`/archivos`, {
        method: 'POST',
        body: JSON.stringify({ curp, ciclo })
      })

      if (!res.ok) throw new Error('Error al descargar archivo')

      const blob = await res.blob()
      descargarArchivo(blob, `${curp}_${ciclo}.docx`)
    } catch (error) {
      console.error('Error downloading archivo:', error)
      toast.error(error.message || 'Ocurrió un error al descargar el archivo')
    }
  }

  return (
    <div className='container mx-auto mt-16 px-4'>
      <h2 className='text-center text-3xl font-bold'>Datos del Alumno</h2>
      <p className='text-secondary my-8 text-center text-4xl font-bold'>
        {curp}
      </p>
      {inscripcion.id_escolaridad && (
        <h3
          className={
            (isActive === true ? 'text-emerald-600' : 'text-red-500') +
            ' text-center text-2xl font-bold'
          }
        >
          {isActive === true ? 'Activo' : 'Inactivo'}
        </h3>
      )}
      <div className='space-between mb-8 flex w-full flex-row justify-end space-x-4'>
        <button
          className='btn btn-error'
          onClick={handleDesactivarInscripcion}
          disabled={!isActive || isLoading}
          title='Desactivar Inscripción'
        >
          Desactivar Inscripción
        </button>
        <button
          className='btn btn-success'
          onClick={handleActivarInscripcion}
          disabled={isActive || isLoading}
          title='Activar Inscripción'
        >
          Activar Inscripción
        </button>
        <button
          className='btn btn-primary'
          onClick={handleDescargarDocx}
          disabled={isLoading}
          title='Descargar archivo DOCX'
        >
          Descargar DOCX
        </button>
      </div>
      <div className='mx-auto my-16 grid grid-cols-1 gap-4 space-y-8 lg:grid-cols-3'>
        {isLoading &&
          Array.from({ length: 9 }).map((_, i) => (
            <StudentDataSkeleton key={i} />
          ))}
        {/* Alumno */}
        {!isLoading && alumno.curp && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body text-sm'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Alumno</h2>
                <StudentIcon className='h-12 w-12' />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>CURP</span>: {alumno.curp}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Nombre</span>: {alumno.nombre}{' '}
                {alumno.apellido_paterno} {alumno.apellido_materno}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Género</span>:{' '}
                {alumno.genero === 'H' ? 'Masculino' : 'Femenino'}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Fecha de Nacimiento</span>:{' '}
                {formatDate(alumno.fecha_nacimiento)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Tipo Sanguíneo</span>:{' '}
                {alumno.tipo_sanguineo}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Lateralidad</span>:{' '}
                {alumno.es_diestro === true ? 'Derecha' : 'Izquierda'}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Estatura</span>:{' '}
                {alumno.estatura_cm} cm
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Peso</span>: {alumno.peso_kg} kg
              </p>

              {/* Se renderiza si contiene algo */}
              {alumno.nota_enfermedad && (
                <p className='text-base'>
                  <span className='font-bold'>Nota Enfermedad</span>:{' '}
                  {alumno.nota_enfermedad}
                </p>
              )}

              {/* Se renderiza si contiene algo */}
              {alumno.nota_terapia && (
                <p className='text-base'>
                  <span className='font-bold'>Nota Terapia</span>:{' '}
                  {alumno.nota_terapia}
                </p>
              )}
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/alumno`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Domicilio */}
        {!isLoading && domicilio.domicilio && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border text-sm shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Domicilio</h2>
                <SignpostIcon className='h-12 w-12' />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Domicilio</span>:{' '}
                {domicilio.domicilio}
              </p>

              <p className='text-sm'>
                <span className='font-bold'>Colonia</span>: {domicilio.colonia}
              </p>

              <p className='text-sm'>
                <span className='font-bold'>C.P.</span>:{' '}
                {domicilio.codigo_postal}
              </p>

              <p className='text-sm'>
                <span className='font-bold'>Ciudad</span>: {domicilio.ciudad}
              </p>

              <p className='text-sm'>
                <span className='font-bold'>Estado</span>: {domicilio.estado}
              </p>
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/domicilio`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Escuela de Procedencia */}
        {!isLoading && escuelaProcedencia.cct && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border text-sm shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Esc. Procedencia</h2>
                <GraduationCapIcon className='h-12 w-12' />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>CCT</span>: {escuelaProcedencia.cct}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Matricula</span>:{' '}
                {escuelaProcedencia.matricula}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Nombre Escuela</span>:{' '}
                {escuelaProcedencia.nombre}
              </p>
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/esc-procedencia`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inscripción */}
        {!isLoading && inscripcion.id_escolaridad && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border text-sm shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Inscripción</h2>
                <CertificateIcon className='h-12 w-12' />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Fecha Inscripción</span>:{' '}
                {formatDate(inscripcion.fecha_inscripcion)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Ciclo</span>: {ciclo}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Escolaridad</span>:{' '}
                {getEscolaridadById(inscripcion.id_escolaridad)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Grado</span>:{' '}
                {getGradoById(inscripcion.id_escolaridad)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Grupo</span>:{' '}
                {inscripcion.grupo === null ? 'N/A' : inscripcion.grupo}
              </p>
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/inscripcion`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tutor 1 */}
        {!isLoading && tutor1.nombre && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border text-sm shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Papá / Tutor 1</h2>
                <PersonIcon className='h-12 w-12' />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Nombre</span>: {tutor1.nombre}{' '}
                {tutor1.apellido_paterno} {tutor1.apellido_materno}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono (móvil)</span>:{' '}
                {tutor1.telefono_movil}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono (fijo)</span>:{' '}
                {tutor1.telefono_fijo}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Correo Electrónico</span>:{' '}
                {tutor1.correo_electronico}
              </p>
              <p
                className={`text-sm ${tutor1.primario === true ? 'text-red-900' : ''}`}
              >
                <span className='font-bold'>¿Tutor Principal?</span>:{' '}
                {tutor1.primario === true ? 'Sí' : 'No'}
              </p>
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/tutor/1`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tutor 2 */}
        {!isLoading && tutor2.length > 0 && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border text-sm shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Mamá / Tutor 2</h2>
                <PersonIcon className='h-12 w-12' />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Nombre</span>: {tutor2[0].nombre}{' '}
                {tutor2[0].apellido_paterno} {tutor2[0].apellido_materno}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono (móvil)</span>:{' '}
                {tutor2[0].telefono_movil}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono (fijo)</span>:{' '}
                {tutor2[0].telefono_fijo}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Correo Electrónico</span>:{' '}
                {tutor2[0].correo_electronico}
              </p>
              <p
                className={`text-sm ${tutor2[0].primario === true ? 'text-red-900' : ''}`}
              >
                <span className='font-bold'>¿Tutor Principal?</span>:{' '}
                {tutor2[0].primario === true ? 'Sí' : 'No'}
              </p>
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/tutor/2`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hermanos */}
        {!isLoading && hermanos.length > 0 && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border text-sm shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Hermanos</h2>
                <UsersThreeIcon className='h-12 w-12' />
              </div>
              {hermanos.map((hermano, i) => (
                <div
                  key={hermano.id}
                  className=''
                >
                  <p className='text-sm'>
                    <span className='font-bold'>Hermano {i + 1}</span>:{' '}
                    {hermano.nombre}
                  </p>
                  <p className='text-sm'>
                    <span className='font-bold'>Escolaridad</span>:{' '}
                    {hermano.nivel}
                  </p>
                </div>
              ))}
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/hermanos`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contacto de Emergencia */}
        {!isLoading && contacto.length > 0 && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border text-sm shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Contactos</h2>
                <UsersFourIcon className='h-12 w-12' />
              </div>
              {contacto.map((contacto, i) => (
                <div key={contacto.id}>
                  <p className='text-sm'>
                    <span className='font-bold'>Contacto {i + 1}</span>:{' '}
                    {contacto.nombre}
                  </p>
                  <p className='text-sm'>
                    <span className='font-bold'>Parentesco</span>:{' '}
                    {contacto.parentesco === 'Otro'
                      ? contacto.otro
                      : contacto.parentesco.charAt(0).toUpperCase() +
                        contacto.parentesco.slice(1).toLowerCase()}
                  </p>
                  <p className='text-sm'>
                    <span className='font-bold'>Teléfono</span>:{' '}
                    {contacto.telefono}
                  </p>
                </div>
              ))}
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/contactos`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pago */}
        {!isLoading && pago.nombre && (
          <div className='card bg-neutral-content text-neutral shadow-neutral w-96 border text-sm shadow-sm transition-shadow duration-200 ease-in-out hover:shadow-lg'>
            <div className='card-body'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='card-title text-3xl'>Pago</h2>
                <MoneyWavyIcon className='h-12 w-12' />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Nombre</span>: {pago.nombre}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Parentesco</span>:{' '}
                {getParentescoById(pago.responsable)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono</span>: {pago.telefono}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Correo Electrónico</span>:{' '}
                {pago.correo}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>¿Requiere Factura?</span>:{' '}
                {pago.factura === 1 ? 'Sí' : 'No'}
              </p>
              <div className='card-actions mt-4 justify-end'>
                <button
                  className='btn btn-secondary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                  onClick={() => {
                    navigate(
                      `/dashboard/inscripciones/${curp}/${ciclo}/edit/pago`
                    )
                  }}
                  disabled={isLoading}
                >
                  <PencilSimpleIcon className='h-9 w-9' />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentData
