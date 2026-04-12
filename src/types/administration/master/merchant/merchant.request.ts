export interface MerchantRequest {
  id: string
  merchantName: string
  logoFileId?: string | null
  ownerUserId: string | null
  status: number
}
