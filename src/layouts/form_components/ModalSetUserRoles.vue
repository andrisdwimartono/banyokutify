<template>
  <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-form
        ref="form"
        @submit.prevent="submit"
        v-model="valid"
        lazy-validation
      >
      <v-card>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon
            icon="mdi-account-key-outline"
          ></v-icon>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            variant="plain"
            class=""
            @click="dialog = false"
          ></v-btn>
        </v-card-title>
        <v-card-text>
          <span class="text-h6">{{ t('banyoku.administration.master.user.assignRole') }} <v-icon icon="mdi-arrow-right"></v-icon> {{ selectedUser?.fullName }}</span>
          <v-container>
            <v-row>
              <v-col cols="12">
                <template v-for="roleUserWithStatus in allRolesWithUserRolesStatusList" :key="roleUserWithStatus.roleId">
                  <v-checkbox
                    v-model="selectedRoles"
                    :label="roleUserWithStatus.roleName"
                    :value="roleUserWithStatus.roleId"
                  />
                </template>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-row>
              <v-col cols="12" md="12" lg="12" xl="12" xxl="12" sm="12">
                  <BackButton
                      @click="dialog = false"
                      :url="'#'"
                  />
                  <SaveButton
                      @submit="submit"
                  />
              </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import type { AllRolesWithUserRolesStatus } from '@/types/administration/master/user_role/all_role_available_user.entity'
  import type { User } from '@/types/administration/master/user/user.entity'
  import { userRoleApi } from '@/services/api/administration/master/user_role/user_role.api'
  import { useI18n } from 'vue-i18n'
  import BackButton from '@/layouts/form_components/BackButton.vue'
  import SaveButton from '@/layouts/form_components/SaveButton.vue'
  import { useSnackbarStore } from '@/stores/snackbar.store'

  const { t } = useI18n()
  
  const allRolesWithUserRolesStatusList = ref<AllRolesWithUserRolesStatus[]>([])
  const selectedRoles = ref<string[]>([])
  const snackbar = useSnackbarStore()
  
  const item = defineModel<User>('item')

  const selectedUser = ref<User>()
  const dialog = ref(false)
  const valid = ref(false)
  const emit = defineEmits(['setNoneSelectedUser'])

  const getAllRolesWithUserRolesStatus = async (item: User) => {
    const res = await userRoleApi.getAllRolesWithUserRolesStatus(item.id)
    allRolesWithUserRolesStatusList.value = res.data.data
  }

  const submit = async () => {
    if (!selectedUser.value) return

    try {
        const payload: any = {
            userId: selectedUser.value.id,
            roles: selectedRoles.value.map(roleId => {
                return {
                    roleId
                }
            })
        }

        const res = await userRoleApi.updateUserRoles(selectedUser.value.id, payload)
        snackbar.show('Success', t(res.data.message), 'success')
        dialog.value = false
    } catch (err: any) {
        snackbar.show('Error', t(err.response?.data?.code || 'Error'), 'error')
    }
  }

  watch(item, (newVal) => {
    if(newVal && newVal !== undefined){
      selectedUser.value = newVal
      getAllRolesWithUserRolesStatus(selectedUser.value)
      dialog.value = true
    }
  })

  watch(allRolesWithUserRolesStatusList, () => {
    selectedRoles.value = allRolesWithUserRolesStatusList.value
      .filter(x => x.isAssigned)
      .map(x => x.roleId)
  }, { immediate: true })

  watch(dialog, (newVal) => {
    if(!newVal){
      item.value = undefined
      selectedUser.value = undefined
      selectedRoles.value = []
      allRolesWithUserRolesStatusList.value = []

      emit('setNoneSelectedUser')
    }
  })
</script>