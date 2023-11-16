import { deepEqual } from './deepEqual'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const сheckArrObjects = (array1: any, array2: any) => {
  if (!array2 || array2.length < 0) return false
  const arr1 = [...array1]
  const arr2 = [...array2]
  arr1.sort()
  arr2.sort()
  return arr1
    .filter((item, index) => !deepEqual(item, arr2[index]))
    .map(item => {
      return {
        id: item.id,
        models: item.models,
      }
    })
}
