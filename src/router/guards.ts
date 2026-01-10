import { useAuthStore } from '@/stores/auth.store'
import { pinia } from '@/plugins/pinia'

export function authGuard(to: any, from: any, next: any) {
  const auth = useAuthStore(pinia)

  // ✅ Public routes (login, 403, 404, etc.)
  if (!to.meta.requiresAuth) {
    return next()
  }

  // ✅ Auth check
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'login' })
  }

  // // ✅ Role check
  const roles = to.meta.roles as string[] | undefined
  if (roles && !auth.hasRole(roles)) {
    // ⛔ prevent redirect loop
    if (to.path !== '/403') {
      return next({ path: '/403' })
    }
    return next()
  }

  next()
}