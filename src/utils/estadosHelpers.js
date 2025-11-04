import estadosJSON from '@/assets/json/estados.json'

export const ESTADOS_ARRAY = estadosJSON.map(({ clave, nombre }) => ({
  id: clave,
  value: nombre,
  label: nombre
}))
