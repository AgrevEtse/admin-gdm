const TextInputForm = ({
  label = '',
  type = 'text',
  value = '',
  placeholder = '',
  name = '',
  required = false,
  onChange
}) => {
  return (
    <label className='input border-white mx-auto max-w-sm lg:min-w-sm'>
      <span className='label'>
        {label} {required && <span className='text-rose-600'>*</span>}
      </span>
      <input
        className='border-white'
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </label>
  )
}

export default TextInputForm
