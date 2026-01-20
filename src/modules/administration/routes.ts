import UserList from '@/modules/administration/pages/master/user/UserList.vue'
import UserForm from '@/modules/administration/pages/master/user/UserForm.vue'
import Login from '@/modules/administration/pages/Login.vue'

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
      component: () => import('@/modules/administration/pages/Forbidden.vue'),
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
      component: () => import('@/modules/administration/pages/Profile.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true,
        roles: [],
        isSidebar: false,
        title: 'sidebar.profile',
      }
    },
    {
    path: '/administration',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN'],
      layout: 'main',
      isSidebar: true,
      title: 'sidebar.administration._label',
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
          title: 'sidebar.administration.master._label',
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
              title: 'sidebar.administration.master.user._label',
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
              title: 'sidebar.administration.master.user',
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
              title: 'sidebar.administration.master.user.create',
            },
          }
        ]
      }
    ]
  }
]