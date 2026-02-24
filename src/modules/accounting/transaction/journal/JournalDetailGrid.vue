<template>
  <RevoGrid
    :columns="columns"
    :source="source"
    :columnTypes="columnTypes"
    :use-clipboard="true"
    :theme="isDark ? 'darkCompact' : 'compact'"
    :stretch="true"
    :hide-attribution="true"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import RevoGrid from '@revolist/vue3-datagrid'
import NumberColumnType from '@revolist/revogrid-column-numeral'
import { useI18n } from 'vue-i18n'
import type { JournalDetailRequest } from '@/types/accounting/transaction/journal/journal.request'
import { codeOfAccountApi } from '@/services/api/accounting/master/code_of_account/codeOfAccount.api'
import type { CodeOfAccount } from '@/types/accounting/master/code_of_account/codeOfAccount.entity'

const { t } = useI18n()

const isDark = defineModel<boolean>('isDark');
const source = defineModel<JournalDetailRequest[]>('source');

const columnTypes = {
  numeric: new NumberColumnType('0,0')
}

watch(source, (val) => {
  val?.forEach((row, index) => {
    row.rowNo = index + 1
  })
})

// computed columns
const columns = computed(() => [
  {
    name: '#',
    prop: 'rowNumber',
    size: 60,
    readonly: true,
  },
  {
    name: t("banyoku.accounting.transaction.journal.account"),
    prop: 'accountId',
    editor: 'select',
    columnType: 'select',
    source: coaList.value.map(c => ({
      label: c.name,
      value: c.id
    })),
    size: 300,
  },
  {
    prop: 'debit',
    name: t("banyoku.accounting.transaction.journal.debit"),
    columnType: 'numeric',
    editor: 'numeric',
    size: 250,
  },
  {
    prop: 'credit',
    name: t("banyoku.accounting.transaction.journal.credit"),
    columnType: 'numeric',
    editor: 'numeric',
    size: 250,
  },
  {
    prop: 'description',
    name: t("banyoku.accounting.transaction.journal.description"),
    columnType: 'text',
    editor: 'text',
    size: 400,
  }
])

const coaList = ref<CodeOfAccount[]>([])

onMounted(async () => {
  const res = await codeOfAccountApi.getAll({page: 1, limit: 1000})
  coaList.value = res.data.data
})
</script>
<style scoped>
.attribution {
  display: none !important;
}
revogr-attribution{
    display: none !important;
}
</style>