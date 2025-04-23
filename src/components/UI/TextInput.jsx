const TextInput = ({
  label = '',
  type = 'text',
  value = '',
  placeholder = '',
  onChange
}) => {
  return (
    <label className='floating-label'>
      <span>{label}</span>
      <input
        className='input input-md'
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  )
}

export default TextInput
