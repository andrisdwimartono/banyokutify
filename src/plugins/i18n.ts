import { createI18n } from 'vue-i18n'
import en from '@/locales/en-lang.ts'
import id from '@/locales/id-lang.ts'

const messages = {
  en: {
    ...en,
    $vuetify: {
      ...en,
    },
  },
  id: {
    ...id,
    $vuetify: {
      ...id,
    },
  },
}

export default createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
