import { isEqualArr } from './isEqualArr'
import { isObject } from './isObject'
/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepEqual(object1: any, object2: any) {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  if (!isObject(object1) || !isObject(object2)) {
    return object1 === object2
  }

  const keys1: string[] = Object.keys(object1)
  const keys2: string[] = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (areObjects && !deepEqual(val1, val2)) {
      return false
    }
    if (!areObjects && val1 !== val2 && !Array.isArray(val1)) {
      return false
    }
    if (!areObjects && Array.isArray(val1) && !isEqualArr(val1, val2)) {
      return false
    }
  }
  return true
}
