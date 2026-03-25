export interface MerchantRequest {
  id: string
  merchantName: string
  merchantLogo?: File | string | null
  ownerUserId: string | null
  status: number
}
