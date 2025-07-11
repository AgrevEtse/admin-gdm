import municipiosJSON from '@/assets/json/estados-municipios.json'

export const getMunicipiosByEstado = (estado) => {
  return municipiosJSON[estado]
}
