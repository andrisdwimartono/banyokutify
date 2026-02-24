export interface Journal {
  id: string
  journalNo: string
  date: string
  reference: string
  description: string
  journalDetails: JournalDetail[]
}

export interface JournalDetail {
  id: string
  journalId: string
  accountId: string
  accountName: string
  debit: number
  credit: number
  description: string
  rowNo: number
}