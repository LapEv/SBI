import { useMemo } from 'react'
import { Addresses } from 'store/slices/addresses/interfaces'

export const useFilteredData = (data: Addresses[], filterText: string) => {
  const filtered = useMemo(() => {
    return data.filter((item: any) => item.address.includes(filterText))
  }, [data, filterText])
  return filtered
}
