// This function creates a date string in the format 'YYYY-MM-DD' for the current date
export const createCurrentDate = () => {
  const date = new Date()

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// This function takes a date string in the format 'YYYY-MM-DDTHH:mm:ss.sssZ' and returns it in the format 'YYYY-MM-DD'
export const formatDate = (date) => {
  return date.split('T')[0]
}
