import { z } from 'zod'

export const EscuelaProcedenciaSchema = z.object({
  cct: z
    .string()
    .min(1, 'El CCT es obligatorio')
    .max(10, 'El CCT no puede tener más de 10 caracteres'),
  matricula: z
    .string()
    .max(10, 'La matrícula no puede tener más de 10 caracteres')
    .optional(),
  nombre: z
    .string()
    .min(1, 'El nombre de la escuela es obligatorio')
    .max(100, 'El nombre no puede tener más de 100 caracteres')
})
