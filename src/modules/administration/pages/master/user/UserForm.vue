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
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="userRequest?.email"
                    @update:model-value="userRequest!.email = $event"
                    :label="t('banyoku.administration.master.user.email')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="userRequest?.fullName"
                    @update:model-value="userRequest!.fullName = $event"
                    :label="t('banyoku.administration.master.user.fullName')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <MerchantAutocomplete
                    v-model="userRequest.merchantId"
                    :label="t('merchant')"
                />
            </v-col>
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="userRequest?.profilePicture"
                    @update:model-value="userRequest!.profilePicture = $event"
                    :label="t('banyoku.administration.master.user.profilePicture')"
                    
                ></v-text-field>
            </v-col>
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
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
            <v-col class="pb-6" cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
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
        <SaveButton
            @submit="submit"
        />
    </v-form>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    import { useI18n } from 'vue-i18n'
    import { userApi } from '@/services/api/administration/master/user/user.api'
    import type { UserRequest } from '@/types/administration/master/user/user.request'
    import MerchantAutocomplete from '@/layouts/form_components/MerchantAutocomplete.vue'
    import SaveButton from '@/layouts/form_components/SaveButton.vue'
    import { useSnackbarStore } from '@/stores/snackbar.store'

    const route = useRoute();
    const { id: routeId } = route.params as { id?: string }

    const snackbar = useSnackbarStore()
    
    const { t } = useI18n()

    const valid = ref(false)
    const showPassword = ref(false)
    const showPasswordConfirmation = ref(false)

    // const userRequest = ref<UserRequest>()
    const userRequest = ref<UserRequest>({
        email: '',
        roles: [],
        fullName: '',
        profilePicture: '',
        profilePictureUrl: '',
        merchantId: '',
        merchantName: '',
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
            userRequest.value = res.data.data
        } catch (err: any) {
            snackbar.error(t(err.response.data.code))
        }
    }
    
    const submit = async () => {
        if (!userRequest.value) return

        try {
            if (id.value) {
                const res = await userApi.update(id.value, userRequest.value)
                snackbar.show('Success', t(res.data.code), 'success')
            } else {
                const res = await userApi.create(userRequest.value)
                snackbar.show('Success', t(res.data.code), 'success')
            }
        } catch (err: any) {
            snackbar.show('Error', t(err.response.data.code), 'success')
        }
    }

</script>

<style scoped></style>