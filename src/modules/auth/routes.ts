import UserList from '@/modules/auth/pages/master/UserList.vue'
import UserForm from '@/modules/auth/pages/master/UserForm.vue'
import Login from '@/modules/auth/pages/Login.vue'

export default [
    {
        path: '/login',
        name: 'login',
        icon: 'mdi-login',
        component: Login,
        meta: {
            layout: 'auth',
            requiresAuth: false,
            roles: [],
            isSidebar: false,
            title: 'login',
        }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      icon: 'mdi-lock',
      component: () => import('@/modules/auth/pages/Forbidden.vue'),
      meta: {
        layout: 'auth',
        requiresAuth: false,
        roles: [],
        isSidebar: false,
        title: 'forbidden',
      }
    },
    {
      path: '/profile',
      name: 'profile',
      icon: 'mdi-account',
      component: () => import('@/modules/auth/pages/Profile.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true,
        roles: [],
        isSidebar: false,
        title: 'sidebar.profile',
      }
    },
    {
    path: '/auth',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN'],
      layout: 'main',
      isSidebar: true,
      title: 'sidebar.auth._label',
    },
    children: [
      {
        path: 'master',
        icon: 'mdi-database',
        meta: {
          requiresAuth: true,
          roles: ['ADMIN'],
          layout: 'main',
          isSidebar: true,
          title: 'sidebar.auth.master._label',
        },
        children: [
          {
            path: 'user',
            name: 'user.list',
            icon: 'mdi-account-multiple-outline',
            component: UserList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: true,
              title: 'sidebar.auth.master.user._label',
            },
          },
          {
            path: 'user/:id',
            name: 'user.edit',
            icon: 'mdi-account-multiple-outline',
            component: UserForm,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: false,
              title: 'sidebar.auth.master.user',
            },
          },
          {
            path: 'user/create',
            name: 'user.create',
            icon: 'mdi-account-multiple-outline',
            component: UserForm,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: false,
              title: 'sidebar.auth.master.user.create',
            },
          }
        ]
      }
    ]
  }
]