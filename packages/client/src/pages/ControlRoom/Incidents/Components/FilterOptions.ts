import { INC_Column } from '../interfaces'

export const FilterOptions = () => {
  const { name, direction } = JSON.parse(
    localStorage.getItem('sortColumn') as string
  )
  const limit = JSON.parse(localStorage.getItem('numberOfRows') as string) ?? 15
  const page = JSON.parse(localStorage.getItem('currentPage') as string) ?? 1
  const filterOptions =
    JSON.parse(localStorage.getItem('filterOptions') as string) ?? []

  return {
    limit,
    nameSort: name ?? 'incident',
    direction: direction ?? 'asc',
    page,
    filterOptions,
  }
}

export const setFilter = (INCColumn: INC_Column[], filterList: string[][]) => {
  const columnsData = INCColumn.map(({ name }) => name)

  const filterData =
    filterList && filterList.length
      ? filterList
          .map((item: string[], index: number) => {
            if (item && item.length > 0) {
              return item.map(value => {
                return {
                  [columnsData[index]]: value,
                }
              })
            }
          })
          .filter(item => item)
      : []
  const filterOptions = filterData && filterData.length ? filterData : []
  localStorage.setItem('filterOptions', JSON.stringify(filterOptions))
  return filterOptions
}
