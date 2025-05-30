import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchWithAuth } from '@/utils/useFetchWithAuth'

import escolaridad_id_json from '@/assets/json/escolaridad-id.json'

const StudentData = () => {
  const { curp } = useParams()

  const fetchWithAuth = useFetchWithAuth()

  const [alumno, setAlumno] = useState({})
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
    <div className='my-16 mx-auto space-y-8'>
      {/* Datos Alumno */}
      {alumno.curp && (
        <div className='card bg-base-100 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title'>Alumno</h2>
            <p>
              <span className='font-bold'>CURP</span>: {alumno.curp}
            </p>
            <p>
              <span className='font-bold'>Nombre</span>: {alumno.nombre}{' '}
              {alumno.apellido_paterno} {alumno.apellido_materno}
            </p>
            <p>
              <span className='font-bold'>Género</span>:{' '}
              {alumno.genero === 'H' ? 'Hombre' : 'Mujer'}
            </p>
            <p>
              <span className='font-bold'>Fecha de Nacimiento</span>:{' '}
              {alumno.fecha_nacimiento}
            </p>
            <p>
              <span className='font-bold'>Tipo Sanguíneo</span>:{' '}
              {alumno.tipo_sanguineo}
            </p>
            <p>
              <span className='font-bold'>Lateralidad</span>:{' '}
              {alumno.es_diestro === true ? 'Derecha' : 'Izquierda'}
            </p>
            <p>
              <span className='font-bold'>Estatura</span>: {alumno.estatura_cm}{' '}
              cm
            </p>
            <p>
              <span className='font-bold'>Peso</span>: {alumno.peso_kg} kg
            </p>

            {/* TODO: Renderizar los siguientes campos solo si no están vacíos */}
            <p>
              <span className='font-bold'>Nota Enfermedad</span>:{' '}
              {alumno.nota_enfermedad}
            </p>
            <p>
              <span className='font-bold'>Nota Terapia</span>:{' '}
              {alumno.nota_terapia}
            </p>
          </div>
        </div>
      )}

      {/* TODO: Escuela de Procedencia */}

      {/* Inscripcion */}
      {inscripcion.length > 0 && (
        <div className='card bg-base-100 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title'>Inscripción</h2>
            <p>
              <span className='font-bold'>Fecha Inscripción</span>:{' '}
              {inscripcion[0].fecha_inscripcion.split('T')[0]}
            </p>
            <p>
              <span className='font-bold'>Escolaridad</span>:{' '}
              {escolaridad_id_json[inscripcion[0].id_escolaridad].escolaridad}
            </p>
            <p>
              <span className='font-bold'>Grado</span>:{' '}
              {escolaridad_id_json[inscripcion[0].id_escolaridad].grado}
            </p>
            <p>
              <span className='font-bold'>Ciclo</span>:{' '}
              {inscripcion[0].id_ciclo ===
              'd20edf04-26e5-423b-a84b-12ed7dde9ec5'
                ? '2025-2026'
                : '2025B'}
            </p>
            <p>
              <span className='font-bold'>¿Está activo?</span>:{' '}
              <span>{inscripcion[0].esta_activo === true ? 'Sí' : 'No'}</span>
            </p>
          </div>
        </div>
      )}

      {/* Tutor 1 */}
      {tutor1.length > 0 && (
        <div className='card bg-base-100 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title'>Primer Tutor</h2>
            <p>
              <span className='font-bold'>Nombre</span>: {tutor1[0].nombre}{' '}
              {tutor1[0].apellido_paterno} {tutor1[0].apellido_materno}
            </p>
            <p>
              <span className='font-bold'>Teléfono (fijo)</span>:{' '}
              {tutor1[0].telefono_fijo}
            </p>
            <p>
              <span className='font-bold'>Teléfono (móvil)</span>:{' '}
              {tutor1[0].telefono_movil}
            </p>
            <p>
              <span className='font-bold'>Correo Electrónico</span>:{' '}
              {tutor1[0].correo_electronico}
            </p>
          </div>
        </div>
      )}

      {/* Tutor 2 */}
      {tutor2.length > 0 && (
        <div className='card bg-base-100 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title'>Segundo Tutor</h2>
            <p>
              <span className='font-bold'>Nombre</span>: {tutor2[0].nombre}{' '}
              {tutor2[0].apellido_paterno} {tutor2[0].apellido_materno}
            </p>
            <p>
              <span className='font-bold'>Teléfono (fijo)</span>:{' '}
              {tutor2[0].telefono_fijo}
            </p>
            <p>
              <span className='font-bold'>Teléfono (móvil)</span>:{' '}
              {tutor2[0].telefono_movil}
            </p>
            <p>
              <span className='font-bold'>Correo Electrónico</span>:{' '}
              {tutor2[0].correo_electronico}
            </p>
          </div>
        </div>
      )}

      {/* Hermanos */}
      {hermanos.length > 0 && (
        <div className='card bg-base-100 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title'>Hermanos</h2>
            {hermanos.map((hermano, i) => (
              <div
                key={hermano.id}
                className=''
              >
                <p>
                  <span className='font-bold'>Hermano {i + 1}</span>:{' '}
                  {hermano.nombre}
                </p>
                <p>
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
        <div className='card bg-base-100 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title'>Contactos de Emergencia</h2>
            {contacto.map((contacto, i) => (
              <div
                key={contacto.id}
                className=''
              >
                <p>
                  <span className='font-bold'>Contacto {i + 1}</span>:{' '}
                  {contacto.nombre}
                </p>
                <p>
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
                <p>
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
        <div className='card bg-base-100 w-96 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title'>Pago</h2>
            <p>
              <span className='font-bold'>Nombre</span>: {pago.nombre}
            </p>
            <p>
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
            <p>
              <span className='font-bold'>Teléfono</span>: {pago.telefono}
            </p>
            <p>
              <span className='font-bold'>Correo Electrónico</span>:{' '}
              {pago.correo}
            </p>
            <p>
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
