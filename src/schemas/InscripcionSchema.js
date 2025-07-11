import { z } from 'zod'

export const InscripcionSchema = z.object({
  escolaridad: z.enum(
    ['Preescolar', 'Primaria', 'Secundaria', 'Bachillerato'],
    'La escolaridad es obligatoria'
  ),
  grado: z
    .number()
    .min(1, 'El grado debe ser un número positivo')
    .max(6, 'El grado no puede ser mayor a 6')
})
