import { z } from 'zod'

export const TutorSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido_paterno: z.string().min(1, 'El apellido paterno es requerido'),
  apellido_materno: z.string().min(1, 'El apellido materno es requerido'),
  estado_nacimiento: z.string().min(1, 'El lugar de nacimiento es requerido'),
  fecha_nacimiento: z.string().refine(
    (value) => {
      const date = new Date(value)
      return !isNaN(date.getTime()) && date <= new Date()
    },
    {
      error: 'La fecha de nacimiento debe ser una fecha válida y no futura'
    }
  ),
  telefono_movil: z
    .string()
    .min(10, 'El teléfono móvil es requerido')
    .max(10, 'El teléfono móvil no puede exceder los 10 caracteres'),
  telefono_fijo: z
    .string()
    .max(10, 'El teléfono fijo no puede exceder los 10 caracteres')
    .optional(),
  correo_electronico: z.email('El correo electrónico debe ser válido'),
  oupacion: z.string().min(1, 'La ocupación es requerida'),
  grado_max_estudios: z.enum(
    [
      'Sin Estudios',
      'Preescolar',
      'Preescolar Trunco',
      'Primaria',
      'Primaria Trunca',
      'Secundaria',
      'Secundaria Trunca',
      'Bachillerato',
      'Bachillerato Trunco',
      'Licenciatura',
      'Licenciatura Trunca',
      'Posgrado',
      'Posgrado Trunco'
    ],
    'El grado máximo de estudios debe ser uno de los valores predefinidos'
  ),
  domicilio: z.string().min(1, 'El domicilio es requerido'),
  colonia: z.string().min(1, 'La colonia es requerida'),
  codigo_postal: z.string().min(1, 'El código postal es requerido'),
  primario: z.boolean('El campo de tutor principal es requerido')
})
