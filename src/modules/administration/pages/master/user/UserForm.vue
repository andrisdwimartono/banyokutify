<template>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-plus"></v-icon> &nbsp;
      {{ t('sidebar.administration.master.user.create') }}
       <v-spacer></v-spacer>
    </v-card-title>
    
    <v-form ref="form" v-model="valid" :lazy-validation="true">
        <v-row>
            <!-- star red for required field -->
            <v-col cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="userRequest?.email"
                    @update:model-value="userRequest!.email = $event"
                    :label="t('sidebar.administration.master.user.email')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="userRequest?.fullName"
                    @update:model-value="userRequest!.fullName = $event"
                    :label="t('sidebar.administration.master.user.fullName')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <MerchantAutocomplete
                    v-model="userRequest.merchantId"
                    :label="t('merchant')"
                />
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="userRequest?.profilePicture"
                    @update:model-value="userRequest!.profilePicture = $event"
                    :label="t('sidebar.administration.master.user.profilePicture')"
                    
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="userRequest?.password"
                    @update:model-value="userRequest!.password = $event"
                    :label="t('sidebar.administration.master.user.password')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6" xxl="6" sm="12">
                <v-text-field
                    :model-value="userRequest?.passwordConfirmation"
                    @update:model-value="userRequest!.passwordConfirmation = $event"
                    :label="t('sidebar.administration.master.user.passwordConfirmation')"
                    :rules="[v => !!v || t('validation.required')]"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-btn
            color="primary"
            @click="submit"
            class="float-right"
        >
            {{ t('save') }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { userApi } from '@/services/api/administration/master/user/user.api'
    import type { UserRequest } from '@/types/administration/master/user/user.request'
    import MerchantAutocomplete from '@/layouts/form_components/MerchantAutocomplete.vue'
    
    const { t } = useI18n()

    const valid = ref(false)
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
        if (id.value) {
            loadUser(id.value)
        }
    })
    
    const loadUser = async (id: string) => {
        const res = await userApi.getUser(id)
        // map data from User to UserUpdate
        userRequest.value = res.data
    }
    
    const submit = async () => {
        if (!userRequest.value) return
        if (id.value) {
            await userApi.update(id.value, userRequest.value)
        } else {
            const res = await userApi.create(userRequest.value!)
            if (res.status === 201) {
                
            }
        }
    }
    
</script>

<style scoped></style>