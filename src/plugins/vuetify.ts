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
      useI18n: () => i18n.global,
    }),
    locale: 'en',
    messages: {
      en,
    },
  },
  // all are apple style
  defaults: {
    VTextField: {
      variant: 'solo',
      rounded: 'lg',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VAutocomplete: {
      variant: 'solo',
      rounded: 'lg',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VBtn: {
      rounded: 'lg',
      height: 44,
    },
    VCard: {
      rounded: 'xl',
    }
  },
})