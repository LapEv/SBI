export const convertDate = (date: string) => {
  const dateArr = date.split('.')
  return dateArr.reverse().join('-')
}

export const convetStringToDate = (date: string, separator: string) => {
  const dateParts = date.split(separator)
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
}

export const convertDateToStringDDMMYYYY = (date: string) => {
  const dateArr = date.split(/-|T/)
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
}

export const convertDateToStringYYYYMMDD = (date: string) => {
  const dateArr = date.split(/-|T/)
  return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`
}
