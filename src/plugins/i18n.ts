import { createI18n } from 'vue-i18n'
import en from '@/locales/en-lang.ts'
import id from '@/locales/id-lang.ts'

const messages = {
  en: {
    ...en,
    $vuetify: {
      ...en,
      dataIterator: {
        rowsPerPageText: 'Items per page:',
        pageText: '{0}-{1} of {2}',
      },
    },
  },
  id: {
    ...id,
    $vuetify: {
      ...id,
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} av {2}',
      },
    },
  },
}

export default createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'id',
  fallbackLocale: 'en',
  messages,
})
