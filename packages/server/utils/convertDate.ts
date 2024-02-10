export const convertINCStringToDateTime = (date: string) => {
  const dateTimeParts = date.split(/[\s,]+/)
  const dateParts = dateTimeParts[0].split('.')
  const timeParts = dateTimeParts[1].split(':')
  return new Date(
    +dateParts[2],
    +dateParts[1] - 1,
    +dateParts[0],
    +timeParts[0],
    +timeParts[1],
    +timeParts[2]
  )
}
