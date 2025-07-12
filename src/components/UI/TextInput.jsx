const TextInput = ({
  label = '',
  type = 'text',
  value = '',
  placeholder = '',
  name = '',
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
        name={name}
        onChange={onChange}
      />
    </label>
  )
}

export default TextInput
