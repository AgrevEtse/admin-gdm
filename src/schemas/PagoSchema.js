import { z } from 'zod'

export const PagoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  telefono: z
    .string()
    .min(10, 'El teléfono es requerido')
    .max(10, 'El teléfono no puede exceder los 10 caracteres'),
  correo: z
    .email('Correo electrónico inválido')
    .min(1, 'El correo electrónico es requerido'),
  factura: z
    .boolean()
    .refine((val) => val !== 0, 'La opción de factura es requerida'),
  responsable: z
    .number()
    .min(1, 'El parentesco es requerido')
    .max(7, 'El parentesco debe ser un valor entre 1 y 7')
})
