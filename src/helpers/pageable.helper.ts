export interface Pageable {
  page: number
  size: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  search?: string
}

export const DEFAULT_PAGE_SIZE = 10

export const defaultPageable: Pageable = {
  page: 0,
  size: DEFAULT_PAGE_SIZE,
}