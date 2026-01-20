<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card rounded="xl" elevation="2">
        <!-- Header -->
        <v-card-title class="d-flex align-center gap-4">
          <v-avatar size="72">
            <v-img
              :src="user.profilePictureUrl || defaultAvatar"
              alt="Profile Picture"
            />
          </v-avatar>
          
          <div class="ml-2">
            <div class="text-h6">{{ user.fullName }}</div>
            <div class="text-body-2 text-medium-emphasis">
              {{ user.email }}
            </div>
          </div>
        </v-card-title>

        <v-divider />

        <!-- Content -->
        <v-card-text>
          <v-list density="comfortable">
            <v-list-item>
              <v-list-item-title>Merchant</v-list-item-title>
              <v-list-item-subtitle>
                {{ user.merchantName || 'Not Set' }}{{ user.merchantId ? ` (${user.merchantId})` : '' }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Profile Picture</v-list-item-title>
              <v-list-item-subtitle>
                {{ user.profilePicture || 'Not Set' }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Profile Picture URL</v-list-item-title>
              <v-list-item-subtitle class="text-break">
                {{ user.profilePictureUrl || 'Not Set' }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-divider />

        <!-- Actions -->
        <v-card-actions class="justify-end">
          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-pencil"
            disabled
          >
            Edit Profile
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { profileApi } from '@/services/api/administration/profile.api'

    const defaultAvatar =
      'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'
    // {{url}}/api/users/me
    const user = ref<any>({})
    onMounted(async () => {
        user.value = await profileApi.getProfile().then((res) => {
            return res.data
        })
    })
</script>

<style scoped></style>
