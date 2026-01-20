import type { ApiContentResponse } from "./apiContentResponse"

export interface ApiSelectResponse<T> {
    success: boolean
    code: string
    message: string
    data: ApiContentResponse<T>
    errors: string[]
}