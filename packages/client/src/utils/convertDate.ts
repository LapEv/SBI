export const convertDate = (date: string) => {
  const dateArr = date.split('.')
  return dateArr.reverse().join('-')
}

export const convetStringToDate = (date: string, separator: string) => {
  const dateParts = date.split(separator)
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  // return new Date(dateJS)
}
