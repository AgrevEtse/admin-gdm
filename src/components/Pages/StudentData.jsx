import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  StudentIcon,
  SignpostIcon,
  GraduationCapIcon,
  CertificateIcon,
  PersonIcon,
  UsersThreeIcon,
  UsersFourIcon,
  MoneyWavyIcon
} from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/utils/useFetchWithAuth'
import { formatDate } from '@/utils/dateFormater'
import { getNombreCiclo } from '@/utils/nombreCiclos'
import { getParentescoById } from '@/utils/parentescoMap'

import { getEscolaridadById, getGradoById } from '@/utils/escolaridadId.js'

const StudentData = () => {
  const { curp } = useParams()

  const fetchWithAuth = useFetchWithAuth()

  const [alumno, setAlumno] = useState({})
  const [domicilio, setDomicilio] = useState([])
  const [escuelaProcedencia, setEscuelaProcedencia] = useState({})
  const [tutor1, setTutor1] = useState([])
  const [tutor2, setTutor2] = useState([])
  const [hermanos, setHermanos] = useState([])
  const [contacto, setContacto] = useState([])
  const [pago, setPago] = useState({})
  const [inscripcion, setInscripcion] = useState([])

  useEffect(() => {
    document.title = `${curp} - GDM Admin`

    const loadData = async () => {
      try {
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
        setTutor1(dataTutor1)

        const resTutor2 = await fetchWithAuth(`/tutor2/${curp}`)
        const dataTutor2 = await resTutor2.json()
        setTutor2(dataTutor2)

        const resHermanos = await fetchWithAuth(`/hermano/${curp}`)
        const dataHermanos = await resHermanos.json()
        setHermanos(dataHermanos)

        const resContactos = await fetchWithAuth(`/contactoemergencia/${curp}`)
        const dataContactos = await resContactos.json()
        setContacto(dataContactos)

        const resPago = await fetchWithAuth(`/personapagos/${curp}`)
        const dataPago = await resPago.json()
        setPago(dataPago)

        // TODO: Cambiar ciclo dependiendo se si es anual o semestral
        const resInscripcion = await fetchWithAuth(`/inscripcion/findone/`, {
          method: 'POST',
          body: JSON.stringify({ curp: curp, ciclo: '2025-2026' })
        })
        const dataInscripcion = await resInscripcion.json()
        setInscripcion(dataInscripcion)
      } catch (error) {
        console.error('Error al cargar los datos del alumno:', error)
        toast.error('Ocurrió un error al cargar los datos del alumno')
      }
    }

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleValidarAlumno = async () => {
    try {
      const ciclo = getNombreCiclo(inscripcion?.[0]?.id_ciclo)
      if (!ciclo) throw new Error('Ciclo desconocido')

      const rol = getEscolaridadById(
        inscripcion?.[0]?.id_escolaridad
      ).toLowerCase()
      if (!rol) throw new Error('Rol desconocido')

      const res = await fetchWithAuth(`/inscripcion/validar`, {
        method: 'POST',
        body: JSON.stringify({
          curp: curp,
          ciclo: ciclo,
          validado: 1,
          rol: rol
        })
      })

      if (!res.ok) throw new Error('Error al validar el alumno')

      const data = await res.json()
      console.log(data)

      toast.success(data.message || 'Alumno validado correctamente')
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Ocurrió un error al validar el alumno')
    }
  }

  const descargarArchivo = (blob, nombreArchivo) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = nombreArchivo
    document.body.appendChild(a) // necesario para Firefox
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleDescargarDocx = async () => {
    try {
      const ciclo = getNombreCiclo(inscripcion?.[0]?.id_ciclo)
      if (!ciclo) throw new Error('Ciclo desconocido')

      const res = await fetchWithAuth(`/archivos`, {
        method: 'POST',
        body: JSON.stringify({ curp, ciclo })
      })

      if (!res.ok) throw new Error('Error al descargar archivo')

      const blob = await res.blob()
      descargarArchivo(blob, `${curp}_${ciclo}.docx`)
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Ocurrió un error al descargar el archivo')
    }
  }

  return (
    <div className='container mx-auto px-4 mt-16'>
      <h2 className='text-3xl font-bold text-center'>Datos del Alumno</h2>
      <p className='text-center text-4xl my-8 font-bold'>{curp}</p>
      <div className='flex flex-row justify-end space-between mb-8 w-full space-x-4'>
        <button
          className='btn btn-success'
          onClick={handleValidarAlumno}
        >
          Alumno Activo
        </button>
        <button
          className='btn btn-info'
          onClick={handleDescargarDocx}
        >
          Descargar DOCX
        </button>
      </div>
      <div className='my-16 mx-auto space-y-8 grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {/* Alumno */}
        {alumno.curp && (
          <div className='card bg-blue-300 text-info-content w-96'>
            <div className='card-body text-sm'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Alumno</h2>
                <StudentIcon size={48} />
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
                <p className='text-sm'>
                  <span className='font-bold'>Nota Enfermedad</span>:{' '}
                  {alumno.nota_enfermedad}
                </p>
              )}

              {/* Se renderiza si contiene algo */}
              {alumno.nota_terapia && (
                <p className='text-sm'>
                  <span className='font-bold'>Nota Terapia</span>:{' '}
                  {alumno.nota_terapia}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Domicilio */}
        {domicilio.length > 0 && (
          <div className='card text-sm bg-blue-300 text-info-content w-96'>
            <div className='card-body'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Domicilio</h2>
                <SignpostIcon size={48} />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Domicilio</span>:{' '}
                {domicilio[0].domicilio}
              </p>

              <p className='text-sm'>
                <span className='font-bold'>Colonia</span>:{' '}
                {domicilio[0].colonia}
              </p>

              <p className='text-sm'>
                <span className='font-bold'>C.P.</span>:{' '}
                {domicilio[0].codigo_postal}
              </p>

              <p className='text-sm'>
                <span className='font-bold'>Ciudad</span>: {domicilio[0].ciudad}
              </p>

              <p className='text-sm'>
                <span className='font-bold'>Estado</span>: {domicilio[0].estado}
              </p>
            </div>
          </div>
        )}

        {/* Escuela de Procedencia */}
        {escuelaProcedencia.cct && (
          <div className='card text-sm bg-blue-300 text-info-content w-96'>
            <div className='card-body'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Esc. Procedencia</h2>
                <GraduationCapIcon size={48} />
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
            </div>
          </div>
        )}

        {/* Inscripción */}
        {inscripcion.length > 0 && (
          <div className='card text-sm bg-blue-300 text-info-content w-96'>
            <div className='card-body'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Inscripción</h2>
                <CertificateIcon size={48} />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Fecha Inscripción</span>:{' '}
                {formatDate(inscripcion[0].fecha_inscripcion)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Escolaridad</span>:{' '}
                {getEscolaridadById(inscripcion[0].id_escolaridad)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Grado</span>:{' '}
                {getGradoById(inscripcion[0].id_escolaridad)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Ciclo</span>:{' '}
                {getNombreCiclo(inscripcion[0].id_ciclo)}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>¿Está activo?</span>:{' '}
                <span>{inscripcion[0].esta_activo === true ? 'Sí' : 'No'}</span>
              </p>
            </div>
          </div>
        )}

        {/* Tutor 1 */}
        {tutor1.length > 0 && (
          <div className='card text-sm bg-blue-300 text-info-content w-96'>
            <div className='card-body'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Primer Tutor</h2>
                <PersonIcon size={48} />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Nombre</span>: {tutor1[0].nombre}{' '}
                {tutor1[0].apellido_paterno} {tutor1[0].apellido_materno}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono (fijo)</span>:{' '}
                {tutor1[0].telefono_fijo}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono (móvil)</span>:{' '}
                {tutor1[0].telefono_movil}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Correo Electrónico</span>:{' '}
                {tutor1[0].correo_electronico}
              </p>
            </div>
          </div>
        )}

        {/* Tutor 2 */}
        {tutor2.length > 0 && (
          <div className='card text-sm bg-blue-300 text-info-content w-96'>
            <div className='card-body'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Segundo Tutor</h2>
                <PersonIcon size={48} />
              </div>
              <p className='text-sm'>
                <span className='font-bold'>Nombre</span>: {tutor2[0].nombre}{' '}
                {tutor2[0].apellido_paterno} {tutor2[0].apellido_materno}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono (fijo)</span>:{' '}
                {tutor2[0].telefono_fijo}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Teléfono (móvil)</span>:{' '}
                {tutor2[0].telefono_movil}
              </p>
              <p className='text-sm'>
                <span className='font-bold'>Correo Electrónico</span>:{' '}
                {tutor2[0].correo_electronico}
              </p>
            </div>
          </div>
        )}

        {/* Hermanos */}
        {hermanos.length > 0 && (
          <div className='card text-sm bg-blue-300 text-info-content w-96'>
            <div className='card-body'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Hermanos</h2>
                <UsersThreeIcon size={48} />
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
            </div>
          </div>
        )}

        {/* Contacto de Emergencia */}
        {contacto.length > 0 && (
          <div className='card text-sm bg-blue-300 text-info-content w-96'>
            <div className='card-body'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Contactos</h2>
                <UsersFourIcon size={48} />
              </div>
              {contacto.map((contacto, i) => (
                <div
                  key={contacto.id}
                  className=''
                >
                  <p className='text-sm'>
                    <span className='font-bold'>Contacto {i + 1}</span>:{' '}
                    {contacto.nombre}
                  </p>
                  <p className='text-sm'>
                    <span className='font-bold'>Parentesco</span>:{' '}
                    {getParentescoById(contacto.parentesco)}
                  </p>
                  <p className='text-sm'>
                    <span className='font-bold'>Teléfono</span>:{' '}
                    {contacto.telefono}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pago */}
        {pago.nombre && (
          <div className='card text-sm bg-blue-300 text-info-content w-96'>
            <div className='card-body'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='card-title text-3xl'>Pago</h2>
                <MoneyWavyIcon size={48} />
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
                {pago.factura === true ? 'Sí' : 'No'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentData
