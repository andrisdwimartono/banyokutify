<template>
    <!-- <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-plus"></v-icon> &nbsp;
      {{ t('banyoku.administration.master.user.create') }}
       <v-spacer></v-spacer>
    </v-card-title> -->
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
    >
        <v-row>
            <!-- star red for required field -->
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-text-field
                    :model-value="userRequest?.email"
                    @update:model-value="userRequest!.email = $event"
                    :label="t('banyoku.administration.master.user.email')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-text-field
                    :model-value="userRequest?.fullName"
                    @update:model-value="userRequest!.fullName = $event"
                    :label="t('banyoku.administration.master.user.fullName')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <MerchantAutocomplete
                    :model-value="userRequest?.merchant"
                    @update:model-value="userRequest!.merchant = $event || null"
                    :label="t('merchant')"
                />
            </v-col>
            <v-col class="pb-6" cols="4" md="4" lg="4" xl="4" xxl="4" sm="12">
                <FileUpload
                    v-model="userRequest!.profilePictureFileId"
                    :label="t('banyoku.administration.master.user.profilePicture')"
                    subtitle="only jpg, png, jpeg"
                    accept="image/jpeg,image/png,image/jpg"
                    subDirectory="user"
                />
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-text-field
                    :model-value="userRequest?.password"
                    @update:model-value="userRequest!.password = $event"
                    :label="t('banyoku.administration.master.user.password')"
                    :rules="[v => !!v || t('validation.required')]"
                    :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="4" lg="4" xl="4" xxl="4" sm="12">
                <v-text-field
                    :model-value="userRequest?.passwordConfirmation"
                    @update:model-value="userRequest!.passwordConfirmation = $event"
                    :label="t('banyoku.administration.master.user.passwordConfirmation')"
                    :rules="[v => !!v || t('validation.required')]"
                    :type="showPasswordConfirmation ? 'text' : 'password'"
                    :append-inner-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPasswordConfirmation = !showPasswordConfirmation"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12" lg="12" xl="12" xxl="12" sm="12">
                <BackButton
                    :url="'/administration/master/user'"
                />
                <SaveButton
                    @submit="submit"
                />
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    import { useI18n } from 'vue-i18n'
    import { userApi } from '@/services/api/administration/master/user/user.api'
    import MerchantAutocomplete from '@/layouts/form_components/MerchantAutocomplete.vue'
    import BackButton from '@/layouts/form_components/BackButton.vue'
    import FileUpload from '@/layouts/form_components/FileUpload.vue'
    import SaveButton from '@/layouts/form_components/SaveButton.vue'
    import { useSnackbarStore } from '@/stores/snackbar.store'
    import type { MerchantSelect } from '@/types/administration/master/merchant/merchant.select'
    import { useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const { id: routeId } = route.params as { id?: string }

    const snackbar = useSnackbarStore()
    
    const { t } = useI18n()

    const valid = ref(false)
    const showPassword = ref(false)
    const showPasswordConfirmation = ref(false)

    interface UserFormModel {
        id: string
        email: string
        roles: string[]
        fullName: string
        profilePictureFileId: string
        merchant: MerchantSelect | null
        password: string
        passwordConfirmation: string
    }

    // const userRequest = ref<UserRequest>()
    const userRequest = ref<UserFormModel>({
        id: '',
        email: '',
        roles: [],
        fullName: '',
        profilePictureFileId: '',
        merchant: null,
        password: '',
        passwordConfirmation: '',
    })


    // id if edit, null if create
    const id = ref<string | null>(null)
    
    onMounted(() => {
        if (routeId) {
            id.value = routeId
            loadUser(routeId)
        }
    })

    
    const loadUser = async (id: string) => {
        try {
            const res = await userApi.getUser(id)
            const data = res.data.data
            userRequest.value.id = data.id
            userRequest.value.email = data.email
            userRequest.value.roles = data.roles
            userRequest.value.fullName = data.fullName
            userRequest.value.profilePictureFileId = data.profilePictureFileId
            if(data.merchantId) {
                userRequest.value.merchant = {
                    id: data.merchantId,
                    merchantName: data.merchantName || '',
                }
            }
        } catch (err: any) {
            snackbar.error(t(err.response.data.code))
        }
    }
    
    const submit = async () => {
        if (!userRequest.value) return

        try {
            const payload: any = {
                email: userRequest.value.email,
                fullName: userRequest.value.fullName,
                roles: [],
                profilePictureFileId: '',
                merchantId: null,
                password: '',
                passwordConfirmation: '',
            }

            if (userRequest.value.merchant) {
                payload.merchantId = userRequest.value.merchant.id
            }

            if (userRequest.value.profilePictureFileId) {
                payload.profilePictureFileId = userRequest.value.profilePictureFileId
            }

            if (userRequest.value.password) {
                payload.password = userRequest.value.password
                payload.passwordConfirmation = userRequest.value.passwordConfirmation
            }

            if (id.value) {
                payload.id = id.value
                const res = await userApi.update(id.value, payload)
                snackbar.show('Success', t(res.data.code || 'Success'), 'success')
                router.push({ path: '/administration/master/user/' + id.value })
            } else {
                const res = await userApi.create(payload)
                snackbar.show('Success', t(res.data.code || 'Success'), 'success')
                router.push({ path: '/administration/master/user/' + res.data.data.id })
            }
        } catch (err: any) {
            snackbar.show('Error', t(err.response?.data?.code || 'Error'), 'error')
        }
    }

</script>

<style scoped></style>