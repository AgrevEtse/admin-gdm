import gradosJSON from '@/assets/json/escolaridad-grados.json'
import idEscolaridadJSON from '@/assets/json/id-escolaridad.json'

const UUID_ANNUAL = import.meta.env.VITE_UUID_ANNUAL
const UUID_BIANNUAL = import.meta.env.VITE_UUID_BIANNUAL

export const getGradosByEscolaridad = (escolaridad) => {
  if (!gradosJSON[escolaridad]) {
    return []
  }

  if (escolaridad === '0') {
    return []
  }

  return gradosJSON[escolaridad]
}

export const getFirstGradoByEscolaridad = (escolaridad) => {
  const gradosEscolaridad = getGradosByEscolaridad(escolaridad)
  if (gradosEscolaridad.length > 0) {
    return gradosEscolaridad[0].grado
  }
  return ''
}

export const getIdEscolaridad = (escolaridad, grado) => {
  if (!idEscolaridadJSON[escolaridad + grado]) {
    return ''
  }

  return idEscolaridadJSON[escolaridad + grado]
}

export const getUUIDByEscolaridad = (escolaridad) => {
  return escolaridad === 'Bachillerato' ? UUID_BIANNUAL : UUID_ANNUAL
}
