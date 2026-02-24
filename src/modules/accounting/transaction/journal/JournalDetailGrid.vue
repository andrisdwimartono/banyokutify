<template>
  <div class="banyoku-grid-wrapper" :class="{ 'grid-dark': isDark }">
    <RevoGrid
      ref="gridRef"
      :columns="columns"
      :source="source"
      :columnTypes="columnTypes"
      :use-clipboard="true"
      :theme="isDark ? 'darkCompact' : 'compact'"
      :stretch="true"
      :hide-attribution="true"
      @afteredit="onAfterEdit"
    />

    <!-- Custom Account Autocomplete Overlay -->
    <Teleport to="body">
      <div
        v-if="autocomplete.visible"
        class="coa-autocomplete-backdrop"
        @click="closeAutocomplete"
      />
      <div
        v-if="autocomplete.visible"
        class="coa-autocomplete"
        :class="{ 'coa-dark': isDark }"
        :style="autocomplete.style"
      >
        <input
          ref="searchInput"
          v-model="autocomplete.search"
          class="coa-search-input"
          :placeholder="t('banyoku.accounting.transaction.journal.searchAccount')"
          @input="onSearchAccount"
          @keydown.down.prevent="navigateDown"
          @keydown.up.prevent="navigateUp"
          @keydown.enter.prevent="selectHighlighted"
          @keydown.escape="closeAutocomplete"
        />
        <div class="coa-list">
          <div
            v-for="(item, idx) in autocomplete.items"
            :key="item.id"
            class="coa-item"
            :class="{ 'coa-item-active': idx === autocomplete.highlightIndex }"
            @click="selectAccount(item)"
            @mouseenter="autocomplete.highlightIndex = idx"
          >
            <span class="coa-code">{{ item.code }}</span>
            <span class="coa-name">{{ item.name }}</span>
          </div>
          <div v-if="autocomplete.items.length === 0" class="coa-empty">
            Tidak ada hasil
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import RevoGrid from '@revolist/vue3-datagrid'
import NumberColumnType from '@revolist/revogrid-column-numeral'
import { useI18n } from 'vue-i18n'
import type { JournalDetailRequest } from '@/types/accounting/transaction/journal/journal.request'
import { codeOfAccountApi } from '@/services/api/accounting/master/code_of_account/codeOfAccount.api'
import type { CodeOfAccount } from '@/types/accounting/master/code_of_account/codeOfAccount.entity'

const { t } = useI18n()

const isDark = defineModel<boolean>('isDark');
const source = defineModel<JournalDetailRequest[]>('source');

const gridRef = ref<InstanceType<typeof RevoGrid> | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)

// All COA data loaded once (for cell display lookup)
const coaMap = ref<Map<string, CodeOfAccount>>(new Map())

const columnTypes = {
  numeric: new NumberColumnType('0,0'),
}

// Autocomplete state
const autocomplete = reactive({
  visible: false,
  search: '',
  items: [] as CodeOfAccount[],
  rowIndex: -1,
  highlightIndex: 0,
  style: {} as Record<string, string>,
})

// Load initial COA list for display mapping
onMounted(async () => {
  const res = await codeOfAccountApi.getLookup({ limit: 100 })
  res.data.forEach(a => coaMap.value.set(a.id, a))
})

// Assign rowNo automatically
watch(source, (val) => {
  val?.forEach((row, index) => {
    row.rowNo = index + 1
  })
})

// Cell display: show "code - name" for accountId column
const getAccountDisplay = (id: string) => {
  const acc = coaMap.value.get(id)
  return acc ? `${acc.code} - ${acc.name}` : id
}

// Handle cell edits from RevoGrid (for non-account columns)
const onAfterEdit = (e: CustomEvent) => {
  const { rowIndex, prop, val } = e.detail
  if (prop === 'accountId') return // handled by autocomplete
  if (source.value && source.value[rowIndex] != null) {
    ;(source.value[rowIndex] as any)[prop] = val
  }
}

// Open autocomplete from cell click
const openAutocomplete = (rowIndex: number, event: MouseEvent) => {
  const cellEl = (event.target as HTMLElement).closest('.rgCell') as HTMLElement | null
  const gridEl = gridRef.value?.$el as HTMLElement

  const rect = cellEl
    ? cellEl.getBoundingClientRect()
    : gridEl?.getBoundingClientRect() ?? { bottom: 0, left: 0, width: 320 }

  autocomplete.rowIndex = rowIndex
  autocomplete.search = ''
  autocomplete.highlightIndex = 0
  autocomplete.style = {
    position: 'fixed',
    top: `${rect.bottom}px`,
    left: `${rect.left}px`,
    width: `${Math.max(rect.width, 320)}px`,
    zIndex: '9999',
  }
  autocomplete.visible = true

  // Load initial list
  searchAccounts('')

  nextTick(() => {
    searchInput.value?.focus()
  })
}

const searchAccounts = async (query: string) => {
  const res = await codeOfAccountApi.getLookup({ search: query, limit: 10 })
  autocomplete.items = res.data
  autocomplete.highlightIndex = 0
}

let searchTimer: ReturnType<typeof setTimeout> | null = null
const onSearchAccount = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    searchAccounts(autocomplete.search)
  }, 150) // debounce 150ms
}

const selectAccount = (item: CodeOfAccount) => {
  const row = source.value?.[autocomplete.rowIndex]
  if (row) {
    row.accountId = item.id
    // Update map so display resolves
    coaMap.value.set(item.id, item)
    // Reassign array to trigger RevoGrid re-render
    source.value = [...(source.value ?? [])]
  }
  closeAutocomplete()
}

const selectHighlighted = () => {
  const item = autocomplete.items[autocomplete.highlightIndex]
  if (item) {
    selectAccount(item)
  }
}

const navigateDown = () => {
  if (autocomplete.highlightIndex < autocomplete.items.length - 1) {
    autocomplete.highlightIndex++
  }
}

const navigateUp = () => {
  if (autocomplete.highlightIndex > 0) {
    autocomplete.highlightIndex--
  }
}

const closeAutocomplete = () => {
  autocomplete.visible = false
  autocomplete.search = ''
  autocomplete.items = []
}

// Columns definition
const columns = computed(() => [
  {
    name: '#',
    prop: 'rowNo',
    size: 60,
    readonly: true,
  },
  {
    name: t("banyoku.accounting.transaction.journal.account"),
    prop: 'accountId',
    size: 300,
    readonly: true, // prevent default edit, we use custom autocomplete
    cellTemplate: (h: any, { model, prop, rowIndex }: any) => {
      const val = model[prop]
      const display = val ? getAccountDisplay(val) : ''
      return h('span', {
        style: {
          cursor: 'pointer',
          opacity: val ? '1' : '0.5',
          display: 'block',
          width: '100%',
          height: '100%',
          lineHeight: '32px',
        },
        onclick: (e: MouseEvent) => {
          e.stopPropagation()
          openAutocomplete(rowIndex, e)
        },
      }, display || t('banyoku.accounting.transaction.journal.clickToSelect'))
    },
  },
  {
    prop: 'debit',
    name: t("banyoku.accounting.transaction.journal.debit"),
    columnType: 'numeric',
    size: 250,
  },
  {
    prop: 'credit',
    name: t("banyoku.accounting.transaction.journal.credit"),
    columnType: 'numeric',
    size: 250,
  },
  {
    prop: 'description',
    name: t("banyoku.accounting.transaction.journal.description"),
    size: 400,
  }
])
</script>

<style scoped>
/* ── iOS-inspired grid styling ── */
.banyoku-grid-wrapper {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(142, 142, 147, 0.25);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

/* Attribution hide */
.attribution,
revogr-attribution {
  display: none !important;
}

/* ── Scoped deep overrides for RevoGrid cells ── */
.banyoku-grid-wrapper :deep(revogr-data .rgRow) {
  transition: background-color 0.15s ease;
}

.banyoku-grid-wrapper :deep(revogr-header .rgHeaderCell) {
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: rgba(142, 142, 147, 0.9);
}

.banyoku-grid-wrapper :deep(revogr-data .rgCell) {
  font-size: 14px;
  padding: 6px 12px;
  border-bottom: 1px solid rgba(142, 142, 147, 0.12);
}

/* Focus / edit state */
.banyoku-grid-wrapper :deep(revogr-data .rgCell.focused-cell),
.banyoku-grid-wrapper :deep(revogr-data .rgCell:focus) {
  outline: 2px solid rgba(0, 122, 255, 0.5);
  outline-offset: -2px;
  border-radius: 6px;
}

/* ── Dark mode overrides for active / edit cells ── */
.grid-dark :deep(revogr-edit) {
  background-color: #2c2c2e !important;
  color: #f2f2f7 !important;
}

.grid-dark :deep(revogr-edit input),
.grid-dark :deep(revogr-edit select),
.grid-dark :deep(revogr-edit textarea) {
  background-color: #2c2c2e !important;
  color: #f2f2f7 !important;
  border-color: rgba(142, 142, 147, 0.3) !important;
}

.grid-dark :deep(.rgCell.focused-cell) {
  background-color: #2c2c2e !important;
  color: #f2f2f7 !important;
}
</style>

<!-- Global styles for autocomplete overlay (Teleported to body) -->
<style>
/* ── Autocomplete backdrop ── */
.coa-autocomplete-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
}

/* ── Autocomplete container ── */
.coa-autocomplete {
  background: #ffffff;
  border: 1px solid rgba(142, 142, 147, 0.3);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
}

/* Dark variant */
.coa-autocomplete.coa-dark {
  background: #2c2c2e;
  border-color: rgba(142, 142, 147, 0.35);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* ── Search input ── */
.coa-search-input {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid rgba(142, 142, 147, 0.2);
  outline: none;
  background: transparent;
  color: #1c1c1e;
}

.coa-dark .coa-search-input {
  color: #f2f2f7;
  border-bottom-color: rgba(142, 142, 147, 0.3);
}

.coa-search-input::placeholder {
  color: rgba(142, 142, 147, 0.7);
}

/* ── List ── */
.coa-list {
  max-height: 240px;
  overflow-y: auto;
  padding: 4px 0;
}

.coa-list::-webkit-scrollbar {
  width: 4px;
}

.coa-list::-webkit-scrollbar-track {
  background: transparent;
}

.coa-list::-webkit-scrollbar-thumb {
  background: rgba(142, 142, 147, 0.3);
  border-radius: 2px;
}

/* ── Items ── */
.coa-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  font-size: 14px;
  color: #1c1c1e;
}

.coa-dark .coa-item {
  color: #f2f2f7;
}

.coa-item-active,
.coa-item:hover {
  background-color: rgba(0, 122, 255, 0.08);
}

.coa-dark .coa-item-active,
.coa-dark .coa-item:hover {
  background-color: rgba(0, 122, 255, 0.2);
}

.coa-code {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  min-width: 50px;
  color: rgba(0, 122, 255, 0.9);
}

.coa-dark .coa-code {
  color: rgba(10, 132, 255, 0.95);
}

.coa-name {
  flex: 1;
}

/* ── Empty state ── */
.coa-empty {
  padding: 12px 14px;
  text-align: center;
  font-size: 13px;
  color: rgba(142, 142, 147, 0.8);
}
</style>