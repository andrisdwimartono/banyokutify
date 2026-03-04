<template>
    <v-card-title class="d-flex align-center pe-2">
       <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="$router.push('/administration/master/role/create')"
      >
        {{ t('banyoku.administration.master.role.add') }}
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
        :items="rolesList"
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
        {{ value === 1 ? t('banyoku.administration.master.role.active') : t('banyoku.administration.master.role.inactive') }}
      </v-chip>
    </template>

    <!-- ACTION COLUMN -->
    <template #item.action="{ item }">
      <v-icon
        icon="mdi-pencil-outline"
        color="primary"
        @click="$router.push(`/administration/master/role/${item.id}`)"
      ></v-icon>
    </template>
    </v-data-table-server>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { roleApi } from '@/services/api/administration/master/role/role.api'
    import type { Role } from '@/types/administration/master/role/role.entity'
    import type { ApiContentResponse } from '@/types/api/apiContentResponse'
    import { useI18n } from 'vue-i18n'
    import { mapVuetifyToPageable } from '@/helpers/datatable.helper'
    const { t } = useI18n()

    const roles = ref<ApiContentResponse<Role>>()
    const rolesList = ref<Role[]>([])
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
        { title: t('banyoku.administration.master.role.roleName'), key: 'roleName' },
        { title: t('banyoku.administration.master.role.status'), key: 'status', sortable: false },
        { title: t('action'), key: 'action', sortable: false },
    ])

    onMounted(() => {
        loadItems({
            page: pagination.value.page,
            itemsPerPage: pagination.value.itemsPerPage,
            search: search.value,
            sortBy: 'roleName',
            sortDir: 'asc',
        })
    })

    const loadItems = async (options: any) => {
        loading.value = true

        pagination.value.page = options.page
        pagination.value.itemsPerPage = options.itemsPerPage

        const pageable = mapVuetifyToPageable(options, 'roleName')

        const res = await roleApi.getAll(pageable)

        rolesList.value = res.data.data
        totalElements.value = res.data.meta.totalElements

        loading.value = false
    }
</script>

<style scoped></style>
