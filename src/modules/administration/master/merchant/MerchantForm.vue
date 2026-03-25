<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
    >
        <v-row>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <!-- hidden id -->
                <v-text-field
                    v-show="false"
                    :model-value="merchantRequest?.id"
                    @update:model-value="merchantRequest!.id = $event"
                    :label="t('id')"
                    :rules="[v => !!v || t('validation.required')]"
                    :readonly="!!routeId"
                    hint="Auto-generated if left blank"
                    persistent-hint
                ></v-text-field>
                <v-text-field
                    :model-value="merchantRequest?.merchantName"
                    @update:model-value="merchantRequest!.merchantName = $event"
                    :label="t('banyoku.administration.master.merchant.merchantName')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <UserAutocomplete
                    :model-value="merchantRequest?.owner"
                    @update:model-value="merchantRequest!.owner = $event || null"
                    :label="t('banyoku.administration.master.merchant.owner')"
                    :rules="[(v: any) => !!v || t('validation.required')]"
                />
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-file-input
                    v-model="logoFile"
                    :label="t('banyoku.administration.master.merchant.merchantLogo')"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    show-size
                ></v-file-input>
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-select
                    :model-value="merchantRequest?.status"
                    @update:model-value="merchantRequest!.status = $event"
                    :label="t('banyoku.administration.master.merchant.status')"
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
    import { useRoute, useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n'
    import { merchantApi } from '@/services/api/administration/master/merchant/merchant.api'
    import type { UserSelect } from '@/types/administration/master/user/user.select'
    import SaveButton from '@/layouts/form_components/SaveButton.vue'
    import UserAutocomplete from '@/layouts/form_components/UserAutocomplete.vue'
    import { useSnackbarStore } from '@/stores/snackbar.store'

    const route = useRoute();
    const router = useRouter();
    
    const { id: routeId } = route.params as { id?: string }

    const snackbar = useSnackbarStore()
    
    const { t } = useI18n()

    const valid = ref(false)

    interface MerchantFormModel {
        id: string
        merchantName: string
        merchantLogo: string | null
        owner: UserSelect | null
        status: number
    }

    const merchantRequest = ref<MerchantFormModel>({
        id: '',
        merchantName: '',
        merchantLogo: null,
        owner: null,
        status: 1,
    })

    const logoFile = ref<File | File[] | null>(null)

    const statusOptions = computed(() => [
        { label: t('banyoku.administration.master.merchant.active'), value: 1 },
        { label: t('banyoku.administration.master.merchant.inactive'), value: 0 },
    ])

    // id if edit, null if create
    const id = ref<string | null>(null)
    
    onMounted(() => {
        if (routeId) {
            id.value = routeId
            loadMerchant(routeId)
        }
    })

const loadMerchant = async (id: string) => {
        try {
            const res = await merchantApi.getMerchant(id)
            const data = res.data.data
            merchantRequest.value.id = data.id
            merchantRequest.value.merchantName = data.merchantName
            merchantRequest.value.merchantLogo = data.merchantLogo
            merchantRequest.value.status = data.status
            if(data.ownerUserId) {
                merchantRequest.value.owner = {
                    id: data.ownerUserId,
                    fullName: data.ownerName || '',
                    email: data.ownerEmail || '',
                }
            }
        } catch (err: any) {
            snackbar.error(t(err.response?.data?.code || 'Error'))
        }
    }
    
    const submit = async () => {
        if (!merchantRequest.value) return

        try {
            const formData = new FormData()
            if (merchantRequest.value.id) formData.append('id', merchantRequest.value.id)
            formData.append('merchantName', merchantRequest.value.merchantName)
            formData.append('status', merchantRequest.value.status.toString())

            // Append owner details properly
            if (merchantRequest.value.owner) {
                formData.append('ownerUserId', merchantRequest.value.owner.id)
            }

            // Append logo file if it was uploaded
            const file = Array.isArray(logoFile.value) ? logoFile.value[0] : logoFile.value
            if (file instanceof File) {
                formData.append('merchantLogo', file)
            }

            if (id.value) {
                let res: any
                if (file instanceof File) {
                    res = await merchantApi.updateWithLogo(formData)
                } else {
                    // change formData to json
                    const json = Object.fromEntries(formData.entries())
                    res = await merchantApi.update(id.value, json)
                }
                snackbar.show('Success', t(res.data.code || 'Success'), 'success')
                router.push({ path: '/administration/master/merchant/' + id.value })
            } else {
                let res: any
                if (file instanceof File) {
                    res = await merchantApi.createWithLogo(formData)
                } else {
                    // change formData to json
                    const json = Object.fromEntries(formData.entries())
                    res = await merchantApi.create(json)
                }
                snackbar.show('Success', t(res.data.code || 'Success'), 'success')
                router.push({ path: '/administration/master/merchant/' + res.data.data.id })
            }
        } catch (err: any) {
            snackbar.show('Error', t(err.response?.data?.code || 'Error'), 'error')
        }
    }

</script>

<style scoped></style>
