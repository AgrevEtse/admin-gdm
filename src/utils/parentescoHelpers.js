import parentescoJSON from '@/assets/json/parentesco.json'

export const getParentescoById = (parentescoId) => {
  const parentescoMap = {
    1: 'Padre',
    2: 'Madre',
    3: 'Tía',
    4: 'Tío',
    5: 'Abuelo',
    6: 'Abuela',
    7: 'Otro',
  }

  return parentescoMap[parentescoId] || 'Otro'
}

export const PARENTESCO_ARRAY = parentescoJSON.map(({ id, nombre }) => ({
  id,
  value: id,
  label: nombre
}))

export const PARENTESCO_ARRAY_PAGO = parentescoJSON.map(({ id, nombre }, index) => ({
  id,
  value: index + 1,
  label: nombre
}))
