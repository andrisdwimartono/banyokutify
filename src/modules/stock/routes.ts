import ProductsList from './pages/master/ProductsList.vue'
import WarehousesList from './pages/master/WarehousesList.vue'

export default [
  {
    path: '/stock',
    titleKey: 'sidebar.stock._label',
    icon: 'mdi-warehouse',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN', 'ABC'],
      layout: 'main',
      isSidebar: true
    },
    children: [
      {
        path: 'master',
        titleKey: 'sidebar.stock.master._label',
        icon: 'mdi-database',
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'ABC'],
          layout: 'main',
          isSidebar: true
        },
        children: [
          {
            path: 'product',
            name: 'sidebar.stock.master.product',
            titleKey: 'sidebar.stock.master.product',
            icon: 'mdi-package-variant',
            component: ProductsList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN', 'ABC'],
              layout: 'main',
              isSidebar: true
            }
          },
          {
            path: 'warehouse',
            name: 'sidebar.stock.master.warehouse',
            titleKey: 'sidebar.stock.master.warehouse',
            icon: 'mdi-home-group',
            component: WarehousesList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN', 'ABC'],
              layout: 'main',
              isSidebar: true
            }
          }
        ]
      }
    ]
  }
]