export const convertDate = (date: string) => {
  const dateArr = date.split('.')
  return dateArr.reverse().join('-')
}
