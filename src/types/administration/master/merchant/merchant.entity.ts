export interface Merchant {
  id: string
  merchantName: string
  merchantLogo: string | null
  owner: {
    id: string
    name: string
  } | null
  status: number
}
