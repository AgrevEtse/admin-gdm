import { createCurrentDate } from '@/utils/dateFormater'

export const DEFAULT_CICLO = {
  nombre: '',
  es_anual: '',
  fecha_inicio: createCurrentDate(),
  fecha_fin: createCurrentDate()
}

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
  esta_activo: false,
  grupo: null
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
  parentesco: 0,
  otro: ''
}

export const DEFAULT_PAGO = {
  nombre: '',
  telefono: '',
  correo: '',
  factura: false,
  responsable: 0
}

export const DEFAULT_PRECIOS = {
  id: 0,
  costo_mensualidad: 0,
  costo_inscripcion: 0,
  costo_inicial: 0,
  costo_descuento: 0,
  numero_contacto: '1234567890',
  email_contacto: 'contacto@contacto.com',
  nombre_contacto: 'John Doe',
  escolaridad: 'Prueba'
}
