const TextInput = ({
  label = '',
  type = 'text',
  value = '',
  placeholder = '',
  name = '',
  autocomplete = '',
  onChange
}) => {
  return (
    <label className='floating-label mx-auto w-full'>
      <span className=''>{label}</span>
      <input
        className='input input-md mx-auto'
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        autoComplete={autocomplete}
        onChange={onChange}
      />
    </label>
  )
}

export default TextInput
