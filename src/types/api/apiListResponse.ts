import type { ApiContentResponse } from "./apiContentResponse"

export interface ApiListResponse<T> {
  success: boolean
  code: string
  message: string
  data: ApiContentResponse<T>
  errors: string[]
}