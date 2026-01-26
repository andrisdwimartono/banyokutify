export interface ApiListResponse<T> {
  success: boolean
  code: string
  message: string
  data: T[]
  errors: string[]
  meta: {
    totalElements: number
    pageSize: number
    totalPages: number
    number: number
    size: number
    numberOfElements: number
    first: boolean
    last: boolean
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
  }
}