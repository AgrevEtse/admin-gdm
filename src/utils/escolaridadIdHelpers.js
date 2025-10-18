import escolaridad_id_json from '@/assets/json/escolaridad-id.json'

export const getEscolaridadById = (escolaridadId) => {
  return escolaridad_id_json[escolaridadId].escolaridad || null
}

export const getGradoById = (escolaridadId) => {
  return escolaridad_id_json[escolaridadId].grado || null
}
