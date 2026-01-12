import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { en } from 'vuetify/locale'
import i18n from './i18n'

export default createVuetify({
  theme: {
    defaultTheme: 'system',
  },
  locale: {
    adapter: createVueI18nAdapter({
      i18n,
      useI18n: () => i18n.global, // 🔥 INI KUNCINYA
    }),
    locale: 'en',
    messages: {
      en,
    },
  },
})