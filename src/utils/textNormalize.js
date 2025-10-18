// This function takes a string and normalizes it by removing accents and converting it to lowercase
export const textNormalize = (text) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
