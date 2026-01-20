import type { ApiSelectDataResponse } from '@/types/api/apiSelectDataResponse'
import type { MerchantSelectDTO } from '@/types/administration/master/merchant/merchant-select.dto'
import type { SelectOption } from '@/types/api/select'

export const mapMerchantToSelect = (
  merchants: ApiSelectDataResponse<MerchantSelectDTO>
): SelectOption<string>[] =>
  merchants.content.map(m => ({
    value: m.id,
    label: m.merchantName,
  }))