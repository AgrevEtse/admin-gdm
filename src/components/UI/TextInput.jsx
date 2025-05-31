const TextInput = ({
  label = '',
  type = 'text',
  value = '',
  placeholder = '',
  onChange
}) => {
  return (
    <label className='floating-label w-full mx-auto'>
      <span className=''>{label}</span>
      <input
        className='input input-md mx-auto'
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  )
}

export default TextInput
