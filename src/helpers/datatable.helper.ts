import type { DataTableOptions } from '@/types/datatable'

export interface PageableParams {
  page: number
  size: number
  sortBy: string
  sortDir: 'asc' | 'desc'
  search?: string
}

export function mapVuetifyToPageable(
  options: DataTableOptions,
  defaultSort = 'id'
): PageableParams {
  const sort = options.sortBy?.[0]

  return {
    page: options.page - 1, // Vuetify 1-based → Backend 0-based
    size: options.itemsPerPage,
    sortBy: sort?.key ?? defaultSort,
    sortDir: sort?.order ?? 'asc',
    search: options.search ?? '',
  }
}