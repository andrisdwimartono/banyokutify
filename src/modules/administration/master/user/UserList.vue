<template>
    <v-card-title class="d-flex align-center pe-2">
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

    <!-- COLUMN: ROLES -->
    <template #item.roles="{ value }">
        {{ value }}
    </template>

    <!-- 🖼 COLUMN: PROFILE PICTURE -->
    <template #item.profilePictureFileId="{ value, item }">
      <v-avatar v-if="value" size="40">
        <v-img :src="fileManagementApi.getFileUrl(value)" :alt="item.fullName" />
      </v-avatar>
      <v-icon
          v-else
          icon="mdi-account"
          size="40"
          color="primary"
          style="background-color: rgba(var(--v-theme-on-surface), 0.08);"
          class="rounded-circle"
      />
    </template>

    <!-- ACTION COLUMN -->
    <template #item.action="{ item }">
      <v-icon
        icon="mdi-pencil-outline"
        color="primary"
        @click="$router.push(`/administration/master/user/${item.id}`)"
      ></v-icon>
      <!-- assign role -->
      <v-icon
        icon="mdi-account-key-outline"
        color="primary"
        @click="editRoles(item)"
      ></v-icon>
    </template>
    </v-data-table-server>

    <v-dialog
      v-model="dialog"
      max-width="80%"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Assign Role</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <template v-for="roleUserWithStatus in allRolesWithUserRolesStatusList">
                  <v-checkbox
                    v-if="roleUserWithStatus.isAssigned"
                    v-model="roleUserWithStatus.roleId" 
                    :label="roleUserWithStatus.roleName"
                    :value="roleUserWithStatus.roleId"
                  ></v-checkbox>
                  <v-checkbox
                    v-else
                    :label="roleUserWithStatus.roleName"
                    :value="roleUserWithStatus.roleId"
                  ></v-checkbox>
                </template>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="saveUserRoles"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue'
    import { userApi } from '@/services/api/administration/master/user/user.api'
    import type { User } from '@/types/administration/master/user/user.entity'
    import type { AllRolesWithUserRolesStatus } from '@/types/administration/master/user_role/all_role_available_user.entity'
    import type { ApiContentResponse } from '@/types/api/apiContentResponse'
    import { userRoleApi } from '@/services/api/administration/master/user_role/user_role.api'
    import { useI18n } from 'vue-i18n'
    import { mapVuetifyToPageable } from '@/helpers/datatable.helper'
    import { fileManagementApi } from '@/services/api/file-management/file-management.api'
    const { t } = useI18n()

    const users = ref<ApiContentResponse<User>>()
    const usersList = ref<User[]>([])
    const totalElements = ref(0)
    const pagination = ref({
        page: 1,
        itemsPerPage: 10,
    })
    const allRolesWithUserRolesStatusList = ref<AllRolesWithUserRolesStatus[]>([])

    const pageOffset = computed(() => {
        return (pagination.value.page - 1) * pagination.value.itemsPerPage
    })

    const loading = ref(false)
    const search = ref('')
    const dialog = ref(false)
    const roles = ref<string[]>([])

    const editRoles = async (item: User) => {
        dialog.value = true

        const res = await userRoleApi.getAllRolesWithUserRolesStatus(item.id)
        allRolesWithUserRolesStatusList.value = res.data.data
    }

    const saveUserRoles = () => {
        dialog.value = false
    }

    // hide column id, merchantId
    const headers = computed(() => [
        // { title: t('id'), key: 'id' },
        {
          title: t('no'),
          key: 'no',
          sortable: false,
        },
        { 
          title: t('banyoku.administration.master.user.email'),
          key: 'email'
        },
        {
          title: t('banyoku.administration.master.user.roles'),
          key: 'roles',
          sortable: false
        },
        {
          title: t('banyoku.administration.master.user.fullName'),
          key: 'fullName'
        },
        {
          title: t('banyoku.administration.master.user.profilePicture'),
          key: 'profilePictureFileId',
          sortable: false,
        },
        {
          title: t('banyoku.administration.master.user.merchantName'),
          key: 'merchantName'
        },
        {
          title: t('action'),
          key: 'action',
          sortable: false
        },
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