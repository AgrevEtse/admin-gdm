import { createCurrentDate } from '@/utils/dateFormater'

export const DEFAULT_CURP = ''

export const DEFAULT_ESCUELA_PROCEDENCIA = {
  cct: '',
  matricula: '',
  nombre: ''
}

export const DEFAULT_ALUMNO = {
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  genero: '0',
  es_diestro: true,
  fecha_nacimiento: createCurrentDate(),
  nacionalidad: '0',
  tipo_sanguineo: '0',
  estatura_cm: '',
  peso_kg: '',
  nota_enfermedad: '',
  nota_terapia: ''
}

export const DEFAULT_DOMICILIO = {
  domicilio: '',
  colonia: '',
  codigo_postal: '',
  estado: '0',
  ciudad: ''
}

export const DEFAULT_INSCRIPCION = {
  id_ciclo: '',
  id_escolaridad: '',
  escolaridad: '0',
  grado: 0,
  fecha_inscripcion: createCurrentDate(),
  esta_activo: false
}

export const DEFAULT_TUTOR = {
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  estado_nacimiento: '',
  fecha_nacimiento: createCurrentDate(),
  telefono_movil: '',
  telefono_fijo: '',
  correo_electronico: '',
  oupacion: '',
  grado_max_estudios: '0',
  domicilio: '',
  colonia: '',
  codigo_postal: '',
  primario: 0
}

export const DEFAULT_HERMANO = {
  nombre: '',
  nivel: '0'
}

export const DEFAULT_CONTACTO = {
  nombre: '',
  telefono: '',
  parentesco: 0
}

export const DEFAULT_PAGO = {
  nombre: '',
  telefono: '',
  correo: '',
  factura: false,
  responsable: 0
}

export const DEFAULT_FORM = {
  escuela_procedencia: DEFAULT_ESCUELA_PROCEDENCIA,
  alumno: DEFAULT_ALUMNO,
  domicilio: DEFAULT_DOMICILIO,
  inscripcion: DEFAULT_INSCRIPCION,
  tutor1: DEFAULT_TUTOR,
  tutor2: DEFAULT_TUTOR,
  hermano1: DEFAULT_HERMANO,
  hermano2: DEFAULT_HERMANO,
  hermano3: DEFAULT_HERMANO,
  contacto1: DEFAULT_CONTACTO,
  contacto2: DEFAULT_CONTACTO,
  contacto3: DEFAULT_CONTACTO,
  pago: DEFAULT_PAGO
}

export const DEFAULT_HERMANOS_ARRAY = [
  DEFAULT_HERMANO,
  DEFAULT_HERMANO,
  DEFAULT_HERMANO
]
export const DEFAULT_CONTACTOS_ARRAY = [
  DEFAULT_CONTACTO,
  DEFAULT_CONTACTO,
  DEFAULT_CONTACTO
]
