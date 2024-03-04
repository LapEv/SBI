import { useMemo } from 'react'

export const useFilteredData = <T>(
  data: T[],
  filterText: string,
  key: string
): T[] => {
  const filtered = useMemo(() => {
    return filterText
      ? /* eslint-disable @typescript-eslint/no-explicit-any */
        data.filter((item: any) =>
          /* eslint-enable @typescript-eslint/no-explicit-any */
          item[key].toLowerCase().includes(filterText.toLowerCase())
        )
      : data
  }, [data, filterText])
  return filtered
}
