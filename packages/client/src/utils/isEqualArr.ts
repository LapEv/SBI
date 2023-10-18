/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEqualArr = (array1: any, array2: any) => {
  if (!array2 || array2.length < 0) return false
  array1.sort()
  array2.sort()
  return (
    array1.length === array2.length &&
    array1.every(function (element: any, index: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return element === array2[index]
    })
  )
}
