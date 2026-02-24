<template>
    <v-card-title class="d-flex align-center pe-2">
      <!-- <v-icon icon="mdi-format-list-bulleted"></v-icon> &nbsp;
      {{ t('banyoku.administration.master.user.list') }} -->
       <!-- button add -->
       <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="$router.push('/administration/master/user/create')"
      >
        {{ t('banyoku.administration.master.user.add') }}
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
    <!-- border table -->
    <v-data-table-server
        :search="search"
        :headers="headers"
        :items="usersList"
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

    <!-- 🖼 COLUMN: PROFILE PICTURE -->
    <template #item.profilePicture="{ value, item }">
      <v-avatar v-if="value" size="40">
        <v-img :src="value" :alt="item.fullName" />
      </v-avatar>
      <span v-else>-</span>
    </template>

    <!-- ACTION COLUMN -->
    <template #item.action="{ item }">
      <v-icon
        icon="mdi-pencil-outline"
        color="primary"
        @click="$router.push(`/administration/master/user/${item.id}`)"
      ></v-icon>
    </template>
    </v-data-table-server>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { userApi } from '@/services/api/administration/master/user/user.api'
    import type { User } from '@/types/administration/master/user/user.entity'
    import type { ApiContentResponse } from '@/types/api/apiContentResponse'
    import { useI18n } from 'vue-i18n'
    import { mapVuetifyToPageable } from '@/helpers/datatable.helper'
    const { t } = useI18n()

    const users = ref<ApiContentResponse<User>>()
    const usersList = ref<User[]>([])
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

    // hide column id, merchantId
    const headers = computed(() => [
        // { title: t('id'), key: 'id' },
        {
            title: t('no'),
            key: 'no',
            sortable: false,
        },
        { title: t('banyoku.administration.master.user.email'), key: 'email' },
        { title: t('banyoku.administration.master.user.roles'), key: 'roles', sortable: false },
        { title: t('banyoku.administration.master.user.fullName'), key: 'fullName' },
        // show as image if not null
        { title: t('banyoku.administration.master.user.profilePicture'), key: 'profilePicture', sortable: false, 
            cellRenderer: (params: { value: string, row: { data: { fullName: string } } }) => {
                if (params.value) {
                    return `<img src="${params.value}" alt="${params.row.data.fullName}" style="width: 40px; height: 40px; border-radius: 50%;">`
                }
                return ''
            }
        },
        { title: t('banyoku.administration.master.user.merchantName'), key: 'merchantName' },
        // action
        { title: t('action'), key: 'action', sortable: false},
    ])

    onMounted(() => {
        loadItems({
            page: pagination.value.page,
            itemsPerPage: pagination.value.itemsPerPage,
            search: search.value,
            sortBy: 'email',
            sortDir: 'asc',
        })
    })

    const loadItems = async (options: any) => {
        loading.value = true

        pagination.value.page = options.page
        pagination.value.itemsPerPage = options.itemsPerPage

        const pageable = mapVuetifyToPageable(options, 'email')

        const res = await userApi.getAll(pageable)

        usersList.value = res.data.data
        totalElements.value = res.data.meta.totalElements

        loading.value = false
    }
</script>

<style scoped></style>