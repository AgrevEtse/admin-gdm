import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { useFetchWithAuth } from '@/hooks/useFetchWithAuth'
import { DEFAULT_PRECIOS } from '@/utils/defaultStates'
import TextInputForm from '@/components/UI/TextInputForm'

const Precios = () => {
  const fetchWithAuth = useFetchWithAuth()

  const [precios, setPrecios] = useState([])
  const [selectedPrecio, setSelectedPrecio] = useState(DEFAULT_PRECIOS)
  const [selectedEscolaridad, setSelectedEscolaridad] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPrecios = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetchWithAuth('/inscripcion/precios')
      const data = await res.json()
      setPrecios(data)
    } catch (error) {
      console.error('Error fetching precios:', error)
      toast.error('Error al cargar los precios escolares.')
    } finally {
      setIsLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    document.title = `Precios - GDM Admin`

    fetchPrecios()
  }, [fetchPrecios])

  useEffect(() => {
    if (selectedEscolaridad > 0 && precios.length > 0) {
      setSelectedPrecio(precios[selectedEscolaridad - 1] ?? DEFAULT_PRECIOS)
    }
  }, [selectedEscolaridad, precios])

  const handleInputChange = (e) => {
    const { type, value, name } = e.target

    if (type === 'number') {
      const numberValue = Number(value)

      // Rechazar NaN, espacios, letras, emojis y demás hechicerías
      if (Number.isNaN(numberValue)) return
    }

    setSelectedPrecio((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      const res = await fetchWithAuth('/inscripcion/precios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPrecio)
      })

      if (!res.ok) {
        throw new Error('Error al actualizar el precio de la escolaridad')
      }

      fetchPrecios()

      toast.success(
        `Precio de ${selectedPrecio.escolaridad.charAt(0).toUpperCase() + selectedPrecio.escolaridad.slice(1)} actualizado correctamente`
      )
    } catch (error) {
      console.error('Error fetching precios:', error)
      toast.error('Error al actualizar el precio de la escolaridad')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mt-10 flex flex-col items-center justify-center space-y-6'>
      <h3 className='text-3xl font-bold'>Precios</h3>
      <select
        value={selectedEscolaridad}
        disabled={isLoading}
        className='select w-full max-w-xs'
        onChange={(e) => {
          setSelectedEscolaridad(Number(e.target.value))
        }}
      >
        <option
          disabled={true}
          value='0'
        >
          Selecciona una escolaridad...
        </option>
        <option value='1'>Preescolar</option>
        <option value='2'>Primaria</option>
        <option value='3'>Secundaria</option>
        <option value='4'>Bachillerato</option>
      </select>

      <div className='card bg-base-100 mx-auto w-full border border-white px-0 shadow-sm lg:px-8'>
        <div className='card-body'>
          <h2 className='card-title mb-6 items-center justify-center text-3xl'>
            {selectedPrecio.escolaridad.charAt(0).toUpperCase() +
              selectedPrecio.escolaridad.slice(1)}
          </h2>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {!isLoading && (
              <>
                <TextInputForm
                  label='costo_mensualidad'
                  placeholder='costo_mensualidad'
                  value={selectedPrecio.costo_mensualidad}
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  name='costo_mensualidad'
                  required={true}
                  type='number'
                />

                <TextInputForm
                  label='costo_inscripcion'
                  placeholder='costo_inscripcion'
                  value={selectedPrecio.costo_inscripcion}
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  name='costo_inscripcion'
                  required={true}
                  type='number'
                />

                <TextInputForm
                  label='costo_inicial'
                  placeholder='costo_inicial'
                  value={selectedPrecio.costo_inicial}
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  name='costo_inicial'
                  required={true}
                  type='number'
                />

                <TextInputForm
                  label='costo_descuento'
                  placeholder='costo_descuento'
                  value={selectedPrecio.costo_descuento}
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  name='costo_descuento'
                  required={true}
                  type='number'
                />

                <TextInputForm
                  label='numero_contacto'
                  placeholder='numero_contacto'
                  value={selectedPrecio.numero_contacto}
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  name='numero_contacto'
                  required={true}
                  type='tel'
                />

                <TextInputForm
                  label='email_contacto'
                  placeholder='email_contacto'
                  value={selectedPrecio.email_contacto}
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  name='email_contacto'
                  required={true}
                  type='email'
                />

                <TextInputForm
                  label='nombre_contacto'
                  placeholder='nombre_contacto'
                  value={selectedPrecio.nombre_contacto}
                  onChange={(e) => {
                    handleInputChange(e)
                  }}
                  name='nombre_contacto'
                  required={true}
                />
              </>
            )}
            <div className='card-actions mt-4 justify-end'>
              <button
                className='btn btn-primary transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                onClick={handleUpdate}
                disabled={isLoading || selectedEscolaridad === 0}
              >
                {isLoading ? (
                  <span className='loading loading-spinner loading-sm'></span>
                ) : (
                  'Actualizar'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Precios
