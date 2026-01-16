import SalesList from '@/modules/sales/pages/SalesList.vue'

export default [
  {
    path: '/sales',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN', 'SALES', 'MANAGER'],
      layout: 'main',
      title: 'sidebar.sales._label',
    },
    children: [
      {
        path: '/sales/list',
        name: 'sales.list',
        icon: 'mdi-account-multiple-outline',
        component: SalesList,
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'SALES', 'MANAGER'],
          layout: 'main',
          title: 'sidebar.sales.list',
        }
      }
    ]
  }
]
