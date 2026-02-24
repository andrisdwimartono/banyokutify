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
  },

  /**
   * Lookup untuk dropdown / select (bukan untuk datatable).
   * Saat ini menggunakan dummy data — ganti dengan API call jika backend sudah siap.
   * Mendukung search (filter by code/name) dan limit.
   */
  getLookup(params?: { search?: string; limit?: number }): Promise<{ data: CodeOfAccount[] }> {
    const allAccounts: CodeOfAccount[] = [
      { id: '1',  code: '1000', name: 'Kas',                   description: '' },
      { id: '2',  code: '1100', name: 'Bank BCA',              description: '' },
      { id: '3',  code: '1101', name: 'Bank Mandiri',          description: '' },
      { id: '4',  code: '1102', name: 'Bank BNI',              description: '' },
      { id: '5',  code: '1200', name: 'Piutang Usaha',         description: '' },
      { id: '6',  code: '1201', name: 'Piutang Karyawan',      description: '' },
      { id: '7',  code: '1300', name: 'Persediaan Barang',     description: '' },
      { id: '8',  code: '1400', name: 'Biaya Dibayar Dimuka',  description: '' },
      { id: '9',  code: '1500', name: 'Aset Tetap',            description: '' },
      { id: '10', code: '1501', name: 'Akumulasi Penyusutan',  description: '' },
      { id: '11', code: '2000', name: 'Hutang Usaha',          description: '' },
      { id: '12', code: '2100', name: 'Hutang Bank',           description: '' },
      { id: '13', code: '2200', name: 'Hutang Pajak',          description: '' },
      { id: '14', code: '2300', name: 'Hutang Gaji',           description: '' },
      { id: '15', code: '3000', name: 'Modal Disetor',         description: '' },
      { id: '16', code: '3100', name: 'Laba Ditahan',          description: '' },
      { id: '17', code: '4000', name: 'Pendapatan Usaha',      description: '' },
      { id: '18', code: '4100', name: 'Pendapatan Lain-lain',  description: '' },
      { id: '19', code: '5000', name: 'Beban Pokok Penjualan', description: '' },
      { id: '20', code: '6000', name: 'Beban Gaji',            description: '' },
      { id: '21', code: '6100', name: 'Beban Sewa',            description: '' },
      { id: '22', code: '6200', name: 'Beban Listrik & Air',   description: '' },
      { id: '23', code: '6300', name: 'Beban Telepon & Internet', description: '' },
      { id: '24', code: '6400', name: 'Beban Penyusutan',      description: '' },
      { id: '25', code: '6500', name: 'Beban Transportasi',    description: '' },
      { id: '26', code: '6600', name: 'Beban Operasional Lain', description: '' },
      { id: '27', code: '7000', name: 'Beban Bunga',           description: '' },
      { id: '28', code: '8000', name: 'Pendapatan Bunga',      description: '' },
    ]

    const search = params?.search?.toLowerCase() ?? ''
    const limit = params?.limit ?? 10

    const filtered = search
      ? allAccounts.filter(a =>
          a.code.toLowerCase().includes(search) ||
          a.name.toLowerCase().includes(search)
        )
      : allAccounts

    return Promise.resolve({ data: filtered.slice(0, limit) })
  }
}