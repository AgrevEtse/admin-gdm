import gradoMaxEstudiosJSON from '@/assets/json/grado-max-estudios.json'

export const GRADO_MAX_ESTUDIOS_ARRAY = gradoMaxEstudiosJSON.map(
  ({ id, nombre }) => ({
    id,
    value: nombre,
    label: nombre
  })
)
