import SalesList from '@/modules/sales/pages/SalesList.vue'

export default [
  {
    path: '/sales',
    titleKey: 'sidebar.sales',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN', 'SALES', 'MANAGER'],
      layout: 'main'
    },
    children: [
      {
        path: '/sales/list',
        name: 'sales.list',
        titleKey: 'sidebar.sales',
        icon: 'mdi-account-multiple-outline',
        component: SalesList,
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'SALES', 'MANAGER'],
          layout: 'main'
        }
      }
    ]
  }
]
