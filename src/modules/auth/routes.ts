import UserList from '@/modules/auth/pages/master/UserList.vue'
import Login from '@/modules/auth/pages/Login.vue'

export default [
    {
        path: '/login',
        name: 'login',
        titleKey: 'login',
        icon: 'mdi-login',
        component: Login,
        meta: {
            layout: 'auth',
            requiresAuth: false,
            roles: [],
            isSidebar: false
        }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      titleKey: 'forbidden',
      icon: 'mdi-lock',
      component: () => import('@/modules/auth/pages/Forbidden.vue'),
      meta: {
        layout: 'auth',
        requiresAuth: false,
        roles: [],
        isSidebar: false
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
        requiresAuth: true,
        roles: [],
        isSidebar: false
      }
    },
    {
    path: '/auth',
    titleKey: 'sidebar.auth._label',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN'],
      layout: 'main',
      isSidebar: true
    },
    children: [
      {
        path: 'master',
        titleKey: 'sidebar.auth.master._label',
        icon: 'mdi-database',
        meta: {
          requiresAuth: true,
          roles: ['ADMIN'],
          layout: 'main',
          isSidebar: true
        },
        children: [
          {
            path: 'user',
            name: 'user.list',
            titleKey: 'sidebar.auth.master.user',
            icon: 'mdi-account-multiple-outline',
            component: UserList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: true
            },
          },
        ]
      }
    ]
  }
]