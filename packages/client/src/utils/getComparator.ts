import { descendingComparator } from './descendingComparator'

type Order = 'asc' | 'desc'
/* eslint-disable @typescript-eslint/no-unused-vars */
export function getComparator<Key extends keyof any>(
  /* eslint-enable @typescript-eslint/no-unused-vars */
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
