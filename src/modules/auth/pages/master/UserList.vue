<template>
    <v-data-table-server
        :headers="headers"
        :items="users?.content"
        :items-length="users?.totalElements ?? 0"
        :loading="loading"
        item-value="id"
        @update:options="loadItems"
    />
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { userApi } from '@/services/api/user.api'
    import type { User } from '@/types/user'
    import type { ApiContentResponse } from '@/types/apiContentResponse'

    const users = ref<ApiContentResponse<User>>()
    const loading = ref(false)
    const pagination = ref({
        page: 1,
        itemsPerPage: 10,
    })

    const headers = [
        { title: 'ID', key: 'id' },
        { title: 'Email', key: 'email' },
        { title: 'Roles', key: 'roles' },
        { title: 'Full Name', key: 'fullName' },
        { title: 'Profile Picture', key: 'profilePicture' },
        { title: 'Merchant ID', key: 'merchantId' },
        { title: 'Merchant Name', key: 'merchantName' },
    ]
    const search = ref('')

    onMounted(() => {
        loadItems({
            page: 1,
            itemsPerPage: 10,
            search: '',
        })
    })

    const loadItems = async (options: any) => {
        loading.value = true

        pagination.value.page = options.page
        pagination.value.itemsPerPage = options.itemsPerPage

        const res = await userApi.getAll({
            page: options.page - 1,      // backend pakai 0-based
            size: options.itemsPerPage,
            search: options.search,
        })

        users.value = res.data.data
        loading.value = false
    }

</script>

<style scoped></style>