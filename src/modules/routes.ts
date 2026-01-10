import Home from '@/modules/Home.vue'

export default [
  {
    path: '/',
    titleKey: 'sidebar.home',
    icon: 'mdi-warehouse',
    meta: {
      requiresAuth: true,
      roles: ['ABC'],
      layout: 'main'
    },
    component: Home
  },
]