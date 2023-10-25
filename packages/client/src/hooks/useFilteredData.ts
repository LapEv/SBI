import { useMemo } from 'react'

export const useFilteredData = <T>(
  data: T[],
  filterText: string,
  key: string
): T[] => {
  console.log('data = ', data)
  console.log('filterText = ', filterText)
  const filtered = useMemo(() => {
    return data.filter((item: any) =>
      item[key].toLowerCase().includes(filterText.toLowerCase())
    )
  }, [data, filterText])
  return filtered
}
