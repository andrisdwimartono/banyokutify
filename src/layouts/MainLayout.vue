<template>
  <v-app>
    <SideBar
      v-model:drawer="drawer"
      v-model:rail="rail"
      v-model:mobile="mobile"
    />

    <AppBar
      v-model:drawer="drawer"
      v-model:rail="rail"
      v-model:mobile="mobile"
      v-model:theme="theme"
      v-model:locale="locale"
    />

    <v-main>
      <v-container
        fluid
        class="d-flex flex-column align-start"
      >
        <PageInformation />
        <v-card
          class="w-100"
          rounded="lg"
          :style="{ padding: '1rem'}"
          :elevation="2"
        >
          <router-view />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'

import AppBar from './main_components/AppBar.vue'
import SideBar from './main_components/SideBar.vue'
import PageInformation from './main_components/PageInformation.vue'

const drawer = ref(true)
const rail = ref(true)
const theme = ref('dark')
const locale = ref('en')

const { mobile } = useDisplay()
const themeProvider = useTheme()
const { locale: i18nLocale } = useI18n()

watch(drawer, v => localStorage.setItem('drawer', JSON.stringify(v)))
watch(rail, v => localStorage.setItem('rail', JSON.stringify(v)))
watch(theme, v => {
  localStorage.setItem('theme', JSON.stringify(v))
//   themeProvider.global.name.value = v
  themeProvider.change(v)
})
watch(locale, v => {
  localStorage.setItem('locale', JSON.stringify(v))
  i18nLocale.value = v
})

onMounted(() => {
  drawer.value = JSON.parse(localStorage.getItem('drawer') ?? 'true')
  rail.value = JSON.parse(localStorage.getItem('rail') ?? 'true')
  theme.value = JSON.parse(localStorage.getItem('theme') ?? '"dark"')
  locale.value = JSON.parse(localStorage.getItem('locale') ?? '"en"')

//   themeProvider.global.name.value = theme.value
  themeProvider.change(theme.value)
  i18nLocale.value = locale.value
})
</script>