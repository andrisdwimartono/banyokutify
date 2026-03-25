<template>
    <v-card-title class="d-flex align-center pe-2">
       <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="$router.push('/administration/master/merchant/create')"
      >
        {{ t('banyoku.administration.master.merchant.add') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        :label="t('search')"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>
    <v-data-table-server
        :search="search"
        :headers="headers"
        :items="merchantsList"
        :items-length="totalElements"
        :loading="loading"
        item-value="id"
        @update:search="loadItems"
        @update:options="loadItems"
        class="elevation-1"
        flat
    >
    <!-- 🔢 COLUMN: NO -->
    <template #item.no="{ index }">
      {{ index + 1 + pageOffset }}
    </template>

    <!-- 🔵 COLUMN: STATUS -->
    <template #item.status="{ value }">
      <v-chip
        :color="value === 1 ? 'success' : 'error'"
        size="small"
        label
      >
        {{ value === 1 ? t('banyoku.administration.master.merchant.active') : t('banyoku.administration.master.merchant.inactive') }}
      </v-chip>
    </template>

    <!-- ACTION COLUMN -->
    <template #item.action="{ item }">
      <v-icon
        icon="mdi-pencil-outline"
        color="primary"
        @click="$router.push(`/administration/master/merchant/${item.id}`)"
      ></v-icon>
    </template>
    </v-data-table-server>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { merchantApi } from '@/services/api/administration/master/merchant/merchant.api'
    import type { Merchant } from '@/types/administration/master/merchant/merchant.entity'
    import type { ApiContentResponse } from '@/types/api/apiContentResponse'
    import { useI18n } from 'vue-i18n'
    import { mapVuetifyToPageable } from '@/helpers/datatable.helper'
    const { t } = useI18n()

    const merchants = ref<ApiContentResponse<Merchant>>()
    const merchantsList = ref<Merchant[]>([])
    const totalElements = ref(0)
    const pagination = ref({
        page: 1,
        itemsPerPage: 10,
    })

    const pageOffset = computed(() => {
        return (pagination.value.page - 1) * pagination.value.itemsPerPage
    })

    const loading = ref(false)
    const search = ref('')

    const headers = computed(() => [
        {
            title: t('no'),
            key: 'no',
            sortable: false,
        },
        { title: t('id'), key: 'id' },
        { title: t('banyoku.administration.master.merchant.merchantName'), key: 'merchantName' },
        { title: t('banyoku.administration.master.merchant.status'), key: 'status', sortable: false },
        { title: t('action'), key: 'action', sortable: false },
    ])

    onMounted(() => {
        loadItems({
            page: pagination.value.page,
            itemsPerPage: pagination.value.itemsPerPage,
            search: search.value,
            sortBy: 'merchantName',
            sortDir: 'asc',
        })
    })

    const loadItems = async (options: any) => {
        loading.value = true

        pagination.value.page = options.page
        pagination.value.itemsPerPage = options.itemsPerPage

        const pageable = mapVuetifyToPageable(options, 'merchantName')

        const res = await merchantApi.getAll(pageable)

        merchantsList.value = res.data.data
        totalElements.value = res.data.meta.totalElements

        loading.value = false
    }
</script>

<style scoped></style>
