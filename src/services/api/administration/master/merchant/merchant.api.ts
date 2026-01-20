import http from '@/services/api/axios'
import type { ApiContentResponse } from '@/types/api/apiContentResponse'
import type { MerchantSelect } from '@/types/administration/master/merchant/merchant.select'

export const merchantApi = {
  async select(params: {
    page: number
    size: number
    search?: string
  }) {
    return http.get<ApiContentResponse<MerchantSelect>>(
      '/merchants/select',
      { params }
    )
  },
  async getById(id: string) {
    return http.get<ApiContentResponse<MerchantSelect>>(
      `/merchants/${id}`
    )
  },
}
