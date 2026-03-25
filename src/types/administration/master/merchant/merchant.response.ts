export interface MerchantResponse {
  id: string
  merchantName: string
  merchantLogo: string | null
  ownerUserId: string | null
  ownerName: string | null
  ownerEmail: string | null
  status: number
}
