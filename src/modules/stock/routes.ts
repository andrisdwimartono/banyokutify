import ProductsList from './pages/master/ProductsList.vue'
import WarehousesList from './pages/master/WarehousesList.vue'

export default [
  {
    path: '/stock',
    titleKey: 'sidebar.stock',
    icon: 'mdi-warehouse',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN', 'ABC'],
      layout: 'main'
    },
    children: [
      {
        path: 'master',
        titleKey: 'sidebar.stock.master',
        icon: 'mdi-database',
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'ABC'],
          layout: 'main'
        },
        children: [
          {
            path: 'product',
            name: 'stock.master.product',
            titleKey: 'stock.master.products',
            icon: 'mdi-package-variant',
            meta: {
              requiresAuth: true,
              roles: ['ADMIN', 'ABC'],
              layout: 'main'
            },
            component: ProductsList
          },
          {
            path: 'warehouse',
            name: 'stock.master.warehouse',
            titleKey: 'stock.master.warehouse',
            icon: 'mdi-home-group',
            meta: {
              requiresAuth: true,
              roles: ['ADMIN', 'ABC'],
              layout: 'main'
            },
            component: WarehousesList
          }
        ]
      }
    ]
  }
]