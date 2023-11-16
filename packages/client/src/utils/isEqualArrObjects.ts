import { deepEqual } from './deepEqual'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEqualArrObjects = (array1: any, array2: any) => {
  if (!array2 || array2.length < 0) return false
  const arr1 = [...array1]
  const arr2 = [...array2]
  arr1.sort()
  arr2.sort()
  return arr1.findIndex((item, index) => !deepEqual(item, arr2[index])) >= 0
    ? false
    : true
}
