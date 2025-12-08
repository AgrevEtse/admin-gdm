import { z } from 'zod'

export const PagoSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(70, 'El nombre no puede tener más de 70 caracteres'),
  telefono: z
    .string()
    .min(10, 'El teléfono es requerido')
    .max(10, 'El teléfono no puede exceder los 10 caracteres'),
  correo: z
    .email('Correo electrónico inválido')
    .min(1, 'El correo electrónico es requerido')
    .max(50, 'El correo no puede tener más de 50 caracteres'),
  factura: z
    .number()
    .refine((val) => val !== '', 'La opción de factura es requerida'),
  responsable: z
    .number()
    .min(1, 'El parentesco es requerido')
    .max(7, 'El parentesco debe ser un valor valido')
})
