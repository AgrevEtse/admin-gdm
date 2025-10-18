import { z } from 'zod'

export const DomicilioSchema = z.object({
  domicilio: z.string().min(1, 'El domicilio es obligatorio'),
  colonia: z.string().min(1, 'La colonia es obligatoria'),
  codigo_postal: z.string().min(1, 'El código postal es obligatorio'),
  estado: z.string().min(1, 'El estado es obligatorio'),
  ciudad: z.string().min(1, 'La ciudad es obligatoria')
})
