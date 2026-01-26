/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'

// Styles
import 'unfonts.css'

import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

const app = createApp(App)

app.use(i18n)

registerPlugins(app)

app.use(createPinia())

app.use(vuetify)

app.mount('#app')
