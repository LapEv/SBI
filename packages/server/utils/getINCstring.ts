const getINCstring = (number, maxLength) => {
  let id = ''
  while (number < maxLength) {
    maxLength = maxLength / 10
    id += '0'
  }
  return (id += number)
}
