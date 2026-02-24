import api from '../../../axios'
import type { Journal } from '@/types/accounting/transaction/journal/journal.entity'
import type { JournalRequest } from '@/types/accounting/transaction/journal/journal.request'
import type { ApiResponse } from '@/types/api/apiResponse'
import type { ApiListResponse } from '@/types/api/apiListResponse'

export const journalApi = {
  getAll(params: any) {
    return api.get<ApiListResponse<Journal>>('/journals', { params })
  },
  getJournal(id: string) {
    return api.get<ApiResponse<JournalRequest>>(`/journals/${id}`)
  },
  create(payload: JournalRequest) {
    return api.post<ApiResponse<JournalRequest>>('/journals', payload)
  },
  update(id: string, payload: JournalRequest) {
    return api.put<ApiResponse<JournalRequest>>(`/journals/${id}`, payload)
  },
  delete(id: string) {
    return api.delete<ApiResponse<Journal>>(`/journals/${id}`)
  }
}