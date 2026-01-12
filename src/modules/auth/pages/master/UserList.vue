<template>
    <h1>User List</h1>
    <v-data-table :headers="headers" :items="users" :loading="loading"></v-data-table>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { userApi } from '@/services/api/user.api'
    import type { User } from '@/types/user'

    const users = ref<User[]>([])
    const loading = ref(true)
    const headers = [
        { title: 'ID', key: 'id' },
        { title: 'Email', key: 'email' },
        { title: 'Roles', key: 'roles' },
        { title: 'Full Name', key: 'fullName' },
        { title: 'Profile Picture', key: 'profilePicture' },
        { title: 'Merchant ID', key: 'merchantId' },
        { title: 'Merchant Name', key: 'merchantName' },
    ]

    onMounted(async () => {
        const res = await userApi.getAll()
        users.value = res.data.data
        loading.value = false
    })
</script>

<style scoped></style>