<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
    <GlobalSnackbar />
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import GlobalSnackbar from '@/layouts/form_components/GlobalSnackbar.vue'

const route = useRoute()

const layout = computed(() => {
  switch (route.meta.layout) {
    case 'auth':
      return AuthLayout
    case 'blank':
      return BlankLayout
    default:
      return MainLayout
  }
})
</script>