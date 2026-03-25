import api from '@/services/api/axios'
import type { ApiContentResponse } from '@/types/api/apiContentResponse'
import type { MerchantSelect } from '@/types/administration/master/merchant/merchant.select'
import type { ApiResponse } from '@/types/api/apiResponse'
import type { ApiListResponse } from '@/types/api/apiListResponse'
import type { Merchant } from '@/types/administration/master/merchant/merchant.entity'
import type { MerchantResponse } from '@/types/administration/master/merchant/merchant.response'

export const merchantApi = {
  async select(params: {
    page: number
    size: number
    search?: string
  }) {
    return api.get<ApiContentResponse<MerchantSelect>>(
      '/merchants/select',
      { params }
    )
  },
  async getById(id: string) {
    return api.get<ApiContentResponse<MerchantSelect>>(
      `/merchants/${id}`
    )
  },
  getAll(params: any) {
    return api.get<ApiListResponse<Merchant>>('/merchants', { params })
  },
  getMerchant(id: string) {
    return api.get<ApiResponse<MerchantResponse>>(`/merchants/${id}`)
  },
  create(payload: any) {
    return api.post<ApiResponse<MerchantResponse>>('/merchants', payload)
  },
  update(id: string, payload: any) {
    // method put
    return api.put<ApiResponse<MerchantResponse>>(`/merchants/${id}`, payload)
  },
  createWithLogo(payload: any) {
    return api.post<ApiResponse<MerchantResponse>>('/merchants/with-logo', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updateWithLogo(payload: any) {
    return api.post<ApiResponse<MerchantResponse>>(`/merchants/${payload.id}/with-logo`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  delete(id: string) {
    return api.delete<ApiResponse<Merchant>>(`/merchants/${id}`)
  }
}
