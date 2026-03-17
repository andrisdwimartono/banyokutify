import UserList from '@/modules/administration/master/user/UserList.vue'
import UserForm from '@/modules/administration/master/user/UserForm.vue'
import RoleList from '@/modules/administration/master/role/RoleList.vue'
import RoleForm from '@/modules/administration/master/role/RoleForm.vue'
import MerchantList from '@/modules/administration/master/merchant/MerchantList.vue'
import MerchantForm from '@/modules/administration/master/merchant/MerchantForm.vue'
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
        title: 'banyoku.profile',
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
      title: 'banyoku.administration._label',
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
          title: 'banyoku.administration.master._label',
        },
        children: [
          // ------------------ USER -----------------------
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
              title: 'banyoku.administration.master.user._label',
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
              title: 'banyoku.administration.master.user.edit',
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
              title: 'banyoku.administration.master.user.create',
            },
          },
          // ------------------ ROLE -----------------------
          {
            path: 'role',
            name: 'role.list',
            icon: 'mdi-shield-account-outline',
            component: RoleList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: true,
              title: 'banyoku.administration.master.role._label',
            },
          },
          {
            path: 'role/:id',
            name: 'banyoku.administration.master.role.edit',
            icon: 'mdi-shield-account-outline',
            component: RoleForm,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: false,
              title: 'banyoku.administration.master.role.edit',
            },
          },
          {
            path: 'role/create',
            name: 'banyoku.administration.master.role.create',
            icon: 'mdi-shield-account-outline',
            component: RoleForm,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: false,
              title: 'banyoku.administration.master.role.create',
            },
          },
          // ------------------ MERCHANT -----------------------
          {
            path: 'merchant',
            name: 'merchant.list',
            icon: 'mdi-store-outline',
            component: MerchantList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: true,
              title: 'banyoku.administration.master.merchant._label',
            },
          },
          {
            path: 'merchant/:id',
            name: 'banyoku.administration.master.merchant.edit',
            icon: 'mdi-store-outline',
            component: MerchantForm,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: false,
              title: 'banyoku.administration.master.merchant.edit',
            },
          },
          {
            path: 'merchant/create',
            name: 'banyoku.administration.master.merchant.create',
            icon: 'mdi-store-outline',
            component: MerchantForm,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              layout: 'main',
              isSidebar: false,
              title: 'banyoku.administration.master.merchant.create',
            },
          },
        ]
      }
    ]
  }
]