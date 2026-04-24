<template>
  <v-autocomplete
    v-model="modelValue"
    :items="items"
    item-title="fullName"
    item-value="id"
    :loading="loading"
    :search="search"
    clearable
    :label="label"
    @update:search="onSearch"
    return-object
  >
    <!-- Custom item -->
    <template #item="{ props, item }">
      <v-list-item v-bind="props">
        <v-list-item-subtitle>
          ID: {{ item.id }}
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
        <span class="ms-2 text-caption">{{ t('loading') }}</span>
      </div>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue'
    import { userApi } from '@/services/api/administration/master/user/user.api'
    import type { UserSelect } from '@/types/administration/master/user/user.select'
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()

    defineProps<{ label?: string }>()

    const modelValue = defineModel<UserSelect | null>()

    const items = ref<UserSelect[]>([])
    const loading = ref(false)
    const search = ref('')
    const page = ref(0)
    const size = 10
    const totalElements = ref(0)

    const hasNextPage = ref(true)

    let fetchId = 0
    let searchTimeout: ReturnType<typeof setTimeout> | null = null

    /**
     * Load user dari API
     */
    const loadUsers = async (reset = false) => {
        if (reset) {
            page.value = 0
            items.value = []
            hasNextPage.value = true
        } else {
            if (loading.value || !hasNextPage.value) return
        }

        const currentFetchId = ++fetchId
        loading.value = true

        try {
            const res = await userApi.select({
                page: page.value,
                size,
                search: search.value || '',
            })

            if (currentFetchId !== fetchId) return // Request superseded

            const content = res.data.data.content
            totalElements.value = res.data.data.totalElements

            items.value.push(...content)
            page.value++

            if (items.value.length >= totalElements.value) {
                hasNextPage.value = false
            }
        } finally {
            if (currentFetchId === fetchId) {
                loading.value = false
            }
        }
    }

    /**
     * Search handler
     */
    const onSearch = (val: string) => {
        search.value = val || ''
        if (searchTimeout) clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
            loadUsers(true)
        }, 300)
    }

    /**
     * Trigger saat sentinel muncul (scroll mentok)
     */
    const onIntersect = (isIntersecting: boolean) => {
        if (isIntersecting) {
            loadUsers()
        }
    }

    // Pastikan reset saat di-clear manual
    watch(modelValue, (newVal) => {
        if (!newVal && search.value) {
            search.value = ''
            if (searchTimeout) clearTimeout(searchTimeout)
            loadUsers(true)
        }
    })

    onMounted(() => {
        loadUsers(true)
    })
</script>
