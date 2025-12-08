import { z } from 'zod'

export const CURPSchema = z
  .string()
  .min(18, 'El CURP debe tener 18 caracteres')
  .max(18, 'El CURP debe tener 18 caracteres')

export const AlumnoSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(40, 'El nombre no puede tener más de 40 caracteres'),
  apellido_paterno: z
    .string()
    .min(1, 'El apellido paterno es obligatorio')
    .max(40, 'El apellido paterno no puede tener más de 40 caracteres'),
  apellido_materno: z
    .string()
    .min(1, 'El apellido materno es obligatorio')
    .max(40, 'El apellido materno no puede tener más de 40 caracteres'),
  genero: z.enum(['H', 'M'], 'El género es obligatorio'),
  tipo_sanguineo: z.enum(
    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'El tipo sanguíneo es obligatorio'
  ),
  es_diestro: z.boolean('La lateralidad es obligatoria'),
  fecha_nacimiento: z.string().refine(
    (value) => {
      const date = new Date(value)
      return !isNaN(date.getTime()) && date <= new Date()
    },
    {
      error: 'La fecha de nacimiento debe ser una fecha válida y no futura'
    }
  ),
  nacionalidad: z
    .string()
    .min(1, 'La nacionalidad es obligatoria')
    .refine((val) => !['0'].includes(val), 'La nacionalidad es obligatoria'),
  estatura_cm: z
    .number('La estatura es obligatoria')
    .min(50, 'La estatura debe ser un número positivo')
    .max(250, 'La estatura no puede ser mayor a 300 cm'),
  peso_kg: z
    .number('El peso es obligatorio')
    .min(1, 'El peso debe ser un número positivo')
    .max(200, 'El peso no puede ser mayor a 300 kg'),
  nota_enfermedad: z
    .string()
    .max(200, 'La nota de terapia no puede exceder los 200 caracteres')
    .optional(),
  nota_terapia: z
    .string()
    .max(200, 'La nota de terapia no puede exceder los 200 caracteres')
    .optional()
})
