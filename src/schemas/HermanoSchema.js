import { z } from 'zod'

export const HermanoSchema = z.object({
  nombre: z.string().optional(),
  nivel: z.enum(['0', 'Preescolar', 'Primaria', 'Secundaria', 'Bachillerato'])
})
