import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchWithAuth } from '@/utils/useFetchWithAuth'

import escolaridad_id_json from '@/assets/json/escolaridad-id.json'

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
      const resAlumno = await fetchWithAuth(`/alumno/${curp}`)
      const dataAlumno = await resAlumno.json()
      setAlumno(dataAlumno)

      const resEscuelaProcedencia = await fetchWithAuth(
        `/escuelaprocedencia/${curp}`
      )
      const dataEscuelaProcedencia = await resEscuelaProcedencia.json()
      setEscuelaProcedencia(dataEscuelaProcedencia)

      console.log(escuelaProcedencia)

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

      const resInscripcion = await fetchWithAuth(`/inscripcion/findone/`, {
        method: 'POST',
        body: JSON.stringify({ curp: curp, ciclo: '2025-2026' })
      })
      const dataInscripcion = await resInscripcion.json()
      setInscripcion(dataInscripcion)
    }

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='my-16 mx-auto space-y-8 grid grid-cols-1 lg:grid-cols-3 gap-4'>
      {/* Alumno */}
      {alumno.curp && (
        <div className='card  bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body text-sm'>
            <h2 className='card-title text-3xl'>Alumno</h2>
            <p className='text-sm'>
              <span className='font-bold'>CURP</span>: {alumno.curp}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Nombre</span>: {alumno.nombre}{' '}
              {alumno.apellido_paterno} {alumno.apellido_materno}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Género</span>:{' '}
              {alumno.genero === 'H' ? 'Hombre' : 'Mujer'}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Fecha de Nacimiento</span>:{' '}
              {alumno.fecha_nacimiento}
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
              <span className='font-bold'>Estatura</span>: {alumno.estatura_cm}{' '}
              cm
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
        <div className='card text-sm bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-3xl'>Domicilio</h2>
            <p className='text-sm'>
              <span className='font-bold'>Domicilio</span>:{' '}
              {domicilio[0].domicilio}
            </p>

            <p className='text-sm'>
              <span className='font-bold'>Colonia</span>: {domicilio[0].colonia}
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
        <div className='card text-sm bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-3xl'>Escuela de Procedencia</h2>
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
        <div className='card text-sm bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-3xl'>Inscripción</h2>
            <p className='text-sm'>
              <span className='font-bold'>Fecha Inscripción</span>:{' '}
              {inscripcion[0].fecha_inscripcion.split('T')[0]}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Escolaridad</span>:{' '}
              {escolaridad_id_json[inscripcion[0].id_escolaridad].escolaridad}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Grado</span>:{' '}
              {escolaridad_id_json[inscripcion[0].id_escolaridad].grado}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Ciclo</span>:{' '}
              {inscripcion[0].id_ciclo ===
              'd20edf04-26e5-423b-a84b-12ed7dde9ec5'
                ? '2025-2026'
                : '2025B'}
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
        <div className='card text-sm bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-3xl'>Primer Tutor</h2>
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
        <div className='card text-sm bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-3xl'>Segundo Tutor</h2>
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
        <div className='card text-sm bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-3xl'>Hermanos</h2>
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
        <div className='card text-sm bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-3xl'>Contactos</h2>
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
                  {contacto.parentesco === 1
                    ? 'Papá'
                    : contacto.parentesco === 2
                      ? 'Mamá'
                      : contacto.parentesco === 3
                        ? 'Tío'
                        : contacto.parentesco === 4
                          ? 'Tía'
                          : contacto.parentesco === 5
                            ? 'Abuelo'
                            : contacto.parentesco === 6
                              ? 'Abuela'
                              : 'Desconocido'}
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
        <div className='card text-sm bg-info text-info-content w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-3xl'>Pago</h2>
            <p className='text-sm'>
              <span className='font-bold'>Nombre</span>: {pago.nombre}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Parentesco</span>:{' '}
              {pago.responsable === 1
                ? 'Papá'
                : pago.responsable === 2
                  ? 'Mamá'
                  : pago.responsable === 3
                    ? 'Tío'
                    : pago.responsable === 4
                      ? 'Tía'
                      : pago.responsable === 5
                        ? 'Abuelo'
                        : pago.responsable === 6
                          ? 'Abuela'
                          : 'Desconocido'}
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
  )
}

export default StudentData
