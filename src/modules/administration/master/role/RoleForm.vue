<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
    >
        <v-row>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-text-field
                    :model-value="roleRequest?.id"
                    @update:model-value="roleRequest!.id = $event"
                    :label="t('id')"
                    :rules="[v => !!v || t('validation.required')]"
                    :readonly="!!routeId"
                    hint="e.g. ADMIN, SALES, MANAGER"
                    persistent-hint
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-text-field
                    :model-value="roleRequest?.roleName"
                    @update:model-value="roleRequest!.roleName = $event"
                    :label="t('banyoku.administration.master.role.roleName')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-select
                    :model-value="roleRequest?.status"
                    @update:model-value="roleRequest!.status = $event"
                    :label="t('banyoku.administration.master.role.status')"
                    :items="statusOptions"
                    item-title="label"
                    item-value="value"
                    :rules="[v => v !== null && v !== undefined || t('validation.required')]"
                ></v-select>
            </v-col>
        </v-row>
        <SaveButton
            @submit="submit"
        />
    </v-form>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { useRoute } from 'vue-router';
    import { useI18n } from 'vue-i18n'
    import { roleApi } from '@/services/api/administration/master/role/role.api'
    import type { RoleRequest } from '@/types/administration/master/role/role.request'
    import SaveButton from '@/layouts/form_components/SaveButton.vue'
    import { useSnackbarStore } from '@/stores/snackbar.store'

    const route = useRoute();
    const { id: routeId } = route.params as { id?: string }

    const snackbar = useSnackbarStore()
    
    const { t } = useI18n()

    const valid = ref(false)

    const roleRequest = ref<RoleRequest>({
        id: '',
        roleName: '',
        status: 1,
    })

    const statusOptions = computed(() => [
        { label: t('banyoku.administration.master.role.active'), value: 1 },
        { label: t('banyoku.administration.master.role.inactive'), value: 0 },
    ])

    // id if edit, null if create
    const id = ref<string | null>(null)
    
    onMounted(() => {
        if (routeId) {
            id.value = routeId
            loadRole(routeId)
        }
    })

    
    const loadRole = async (id: string) => {
        try {
            const res = await roleApi.getRole(id)
            roleRequest.value = res.data.data
        } catch (err: any) {
            snackbar.error(t(err.response.data.code))
        }
    }
    
    const submit = async () => {
        if (!roleRequest.value) return

        try {
            if (id.value) {
                const res = await roleApi.update(id.value, roleRequest.value)
                snackbar.show('Success', t(res.data.code), 'success')
            } else {
                const res = await roleApi.create(roleRequest.value)
                snackbar.show('Success', t(res.data.code), 'success')
            }
        } catch (err: any) {
            snackbar.show('Error', t(err.response.data.code), 'error')
        }
    }

</script>

<style scoped></style>
