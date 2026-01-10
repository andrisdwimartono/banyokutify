import UserList from './pages/UserList.vue'
import Login from './Login.vue'

export default [
    {
        path: '/login',
        name: 'login',
        titleKey: 'sidebar.login',
        icon: 'mdi-login',
        component: Login,
        meta: {
            layout: 'auth',
            requiresAuth: false,
            roles: [],
        }
    },
    {
      path: '/403',
      name: '403',
      titleKey: 'sidebar.403',
      icon: 'mdi-lock',
      component: () => import('@/modules/auth/Forbidden.vue'),
      meta: {
        layout: 'auth',
        requiresAuth: false,
        roles: [],
      }
    },
    {
      path: '/profile',
      name: 'profile',
      titleKey: 'sidebar.profile',
      icon: 'mdi-account',
      component: () => import('@/modules/auth/pages/Profile.vue'),
      meta: {
        layout: 'main',
        requiresAuth: false,
        roles: [],
      }
    },
    {
    path: '/auth',
    titleKey: 'sidebar.auth',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN'],
      layout: 'main'
    },
    children: [
      {
        path: '/auth/user',
        name: 'user.list',
        titleKey: 'sidebar.user',
        icon: 'mdi-account-multiple-outline',
        component: UserList,
        meta: {
          requiresAuth: true,
          roles: ['ADMIN'],
          layout: 'main'
        }
      },
    ]
  }
]