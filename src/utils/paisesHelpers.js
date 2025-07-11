import paisesJSON from '@/assets/json/paises.json'

export const PAISES_ARRAY = paisesJSON.map(({ iso3, nameES }) => ({
  id: iso3,
  value: nameES,
  label: nameES
}))
