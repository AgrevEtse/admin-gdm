const UUID_ANNUAL = import.meta.env.VITE_UUID_ANNUAL
const UUID_BIANNUAL = import.meta.env.VITE_UUID_BIANNUAL

export const getNombreCiclo = (idCiclo) => {
  if (idCiclo === UUID_ANNUAL) return '2025-2026'
  if (idCiclo === UUID_BIANNUAL) return '2025B'
  return null
}
