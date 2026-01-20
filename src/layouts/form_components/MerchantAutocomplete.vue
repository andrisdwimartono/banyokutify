<template>
  <v-autocomplete
    v-model="modelValue"
    :items="items"
    item-title="merchantName"
    item-value="id"
    :loading="loading"
    :search="search"
    clearable
    :label="label"
    @update:search="onSearch"
  >
    <!-- Custom item -->
    <template #item="{ props, item }">
      <v-list-item v-bind="props">
        <v-list-item-subtitle>
          ID: {{ item.raw.id }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>

    <!-- ⬇️ INFINITE SCROLL SENTINEL -->
    <template #append-item>
      <div
        v-if="hasNextPage"
        v-intersect="onIntersect"
        class="pa-3 text-center"
      >
        <v-progress-circular
          indeterminate
          size="20"
          color="primary"
        />
        <span class="ms-2 text-caption">Memuat data...</span>
      </div>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { merchantApi } from '@/services/api/administration/master/merchant/merchant.api'
import type { MerchantSelect } from '@/types/administration/master/merchant/merchant.select'

defineProps<{ label?: string }>()

const modelValue = defineModel<string | null>()

const items = ref<MerchantSelect[]>([])
const loading = ref(false)
const search = ref('')
const page = ref(0)
const size = 10
const totalElements = ref(0)

const hasNextPage = ref(true)

/**
 * Load merchant dari API
 */
const loadMerchants = async (reset = false) => {
  if (loading.value || !hasNextPage.value) return
  loading.value = true

  if (reset) {
    page.value = 0
    items.value = []
    hasNextPage.value = true
  }

  const res = await merchantApi.select({
    page: page.value,
    size,
    search: search.value,
  })

  const content = res.data.data.content
  totalElements.value = res.data.data.totalElements

  items.value.push(...content)
  page.value++

  if (items.value.length >= totalElements.value) {
    hasNextPage.value = false
  }

  loading.value = false
}

/**
 * Search handler
 */
const onSearch = (val: string) => {
  search.value = val
  loadMerchants(true)
}

/**
 * Trigger saat sentinel muncul (scroll mentok)
 */
const onIntersect = (isIntersecting: boolean) => {
  if (isIntersecting) {
    loadMerchants()
  }
}

onMounted(() => {
  loadMerchants(true)
})
</script>