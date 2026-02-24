import api from '../../../axios'
import type { CodeOfAccount } from '@/types/accounting/master/code_of_account/codeOfAccount.entity'
import type { CodeOfAccountRequest } from '@/types/accounting/master/code_of_account/codeOfAccount.request'
import type { ApiResponse } from '@/types/api/apiResponse'
import type { ApiListResponse } from '@/types/api/apiListResponse'

export const codeOfAccountApi = {
  getAll(params: any) {
    return api.get<ApiListResponse<CodeOfAccount>>('/code-of-accounts', { params })
  },
  getCodeOfAccount(id: string) {
    return api.get<ApiResponse<CodeOfAccount>>(`/code-of-accounts/${id}`)
  },
  create(payload: CodeOfAccountRequest) {
    return api.post<ApiResponse<CodeOfAccountRequest>>('/code-of-accounts', payload)
  },
  update(id: string, payload: CodeOfAccountRequest) {
    return api.put<ApiResponse<CodeOfAccountRequest>>(`/code-of-accounts/${id}`, payload)
  },
  delete(id: string) {
    return api.delete<ApiResponse<CodeOfAccount>>(`/code-of-accounts/${id}`)
  }
}