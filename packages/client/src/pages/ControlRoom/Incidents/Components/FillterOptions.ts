export const FillterOptions = () => {
  const { name, direction } = JSON.parse(
    localStorage.getItem('sortColumn') as string
  )
  const limit = JSON.parse(localStorage.getItem('numberOfRows') as string) ?? 15
  const page = JSON.parse(localStorage.getItem('currentPage') as string) ?? 1

  return {
    limit,
    nameSort: name ?? 'incident',
    direction: direction ?? 'asc',
    page,
  }
}
