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

export const convertDateToStringFromDB = (dateTime: string) => {
  if (!dateTime) return
  const dateTimeArr = dateTime.split(/T/)
  const dateArr = dateTimeArr[0].split('-')
  const timeArr = dateTimeArr[1].split(':')
  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]} ${timeArr[0]}:${
    timeArr[1]
  }:${timeArr[2].split('.')[0]}`
}
