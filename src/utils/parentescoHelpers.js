import parentescoJSON from '@/assets/json/parentesco.json'

// TODO: Refactor this to use a more dynamic approach if the JSON changes frequently
export const getParentescoById = (parentescoId) => {
  const parentescoMap = {
    1: 'Papá',
    2: 'Mamá',
    3: 'Hermano',
    4: 'Tío',
    5: 'Abuelo',
    6: 'Abuela'
  }

  return parentescoMap[parentescoId] || 'Otro'
}

export const PARENTESCO_ARRAY = parentescoJSON.map(({ id, nombre }) => ({
  id,
  value: id,
  label: nombre
}))
