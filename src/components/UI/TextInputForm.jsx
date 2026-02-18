const TextInputForm = ({
  label = '',
  type = 'text',
  value = '',
  placeholder = '',
  name = '',
  required = false,
  disabled = false,
  onChange
}) => {
  return (
    <label className='input border-base-content mx-auto max-w-sm lg:min-w-sm'>
      <span className='label'>
        {label} {required && <span className='text-rose-600'>*</span>}
      </span>
      <input
        className='border-base-content'
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
    </label>
  )
}

export default TextInputForm
