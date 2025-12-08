import { z } from 'zod'

export const HermanoSchema = z.object({
  nombre: z
    .string()
    .max(70, 'El nombre no puede tener más de 70 caracteres')
    .optional(),
  nivel: z.enum(['0', 'Preescolar', 'Primaria', 'Secundaria', 'Bachillerato'])
})
