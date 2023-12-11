import { useMemo } from 'react'

export const useFilteredData = <T>(
  data: T[],
  filterText: string,
  key: string
): T[] => {
  const filtered = useMemo(() => {
    return filterText
      ? data.filter((item: any) =>
          item[key].toLowerCase().includes(filterText.toLowerCase())
        )
      : data
  }, [data, filterText])
  return filtered
}
