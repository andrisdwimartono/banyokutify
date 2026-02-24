export interface JournalRequest {
  journalNo: string
  date: string
  reference: string
  description: string
  journalDetails: JournalDetailRequest[]
}

export interface JournalDetailRequest {
  accountId: string
  debit: number
  credit: number
  description: string
  rowNo: number
}