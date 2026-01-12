export interface ApiListResponse<T> {
  data: T[]
  meta?: {
    total: number
    page: number
    perPage: number
  }
}