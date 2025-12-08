import { z } from 'zod'

export const ContactoSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(70, 'El nombre no puede tener más de 70 caracteres'),
  telefono: z
    .string()
    .min(10, 'El teléfono es requerido')
    .max(10, 'El teléfono no puede exceder los 10 caracteres'),
  parentesco: z
    .number()
    .min(1, 'El parentesco es requerido')
    .max(7, 'El parentesco debe ser un valor valido')
})
