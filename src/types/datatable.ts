export interface DataTableSort {
  key: string
  order: 'asc' | 'desc'
}

export interface DataTableOptions {
  page: number
  itemsPerPage: number
  sortBy?: DataTableSort[]
  search?: string
}