import Home from '@/modules/Home.vue'

export default [
  {
    path: '/',
    titleKey: 'sidebar.home',
    icon: 'mdi-warehouse',
    component: Home,
    meta: {
      requiresAuth: true,
      // stay empty to allow all roles
      roles: [],
      layout: 'main',
      isSidebar: true
    }
  },
]