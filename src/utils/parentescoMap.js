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
