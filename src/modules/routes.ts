import Home from '@/modules/Home.vue'

export default [
  {
    path: '/',
    name: 'home',
    icon: 'mdi-warehouse',
    component: Home,
    meta: {
      requiresAuth: true,
      // stay empty to allow all roles
      roles: [],
      layout: 'main',
      isSidebar: true,
      title: 'sidebar.home',
    }
  },
]