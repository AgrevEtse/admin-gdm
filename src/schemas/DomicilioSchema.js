import { z } from 'zod'

export const DomicilioSchema = z.object({
  domicilio: z
    .string()
    .min(1, 'El domicilio es obligatorio')
    .max(30, 'El domicilio no puede tener más de 30 caracteres'),
  colonia: z
    .string()
    .min(1, 'La colonia es obligatoria')
    .max(30, 'La colonia no puede tener más de 30 caracteres'),
  codigo_postal: z
    .string()
    .min(1, 'El código postal es obligatorio')
    .max(6, 'El codigo postal no puede tener más de 6 caracteres'),
  estado: z.string().min(1, 'El estado es obligatorio'),
  ciudad: z.string().min(1, 'La ciudad es obligatoria')
})
