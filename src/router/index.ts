import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'
import generalRoutes from '@/modules/routes'
import authRoutes from '@/modules/administration/routes'
import salesRoutes from '@/modules/sales/routes'
import stockRoutes from '@/modules/stock/routes'
import accountingRoutes from '@/modules/accounting/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...generalRoutes,
    ...authRoutes,
    ...salesRoutes,
    ...stockRoutes,
    ...accountingRoutes
  ],
})

router.beforeEach(authGuard)

// Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
//     if (localStorage.getItem('vuetify:dynamic-reload')) {
//       console.error('Dynamic import error, reloading page did not fix it', err)
//     } else {
//       console.log('Reloading page to fix dynamic import error')
//       localStorage.setItem('vuetify:dynamic-reload', 'true')
//       location.assign(to.fullPath)
//     }
//   } else {
//     console.error(err)
//   }
// })

// router.isReady().then(() => {
//   localStorage.removeItem('vuetify:dynamic-reload')
// })

// list of routes for sidebar
export const sidebarMenu = router.options.routes

export default router
