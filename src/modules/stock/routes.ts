import ProductsList from './pages/master/ProductsList.vue'
import WarehousesList from './pages/master/WarehousesList.vue'

export default [
  {
    path: '/stock',
    icon: 'mdi-warehouse',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN', 'ABC'],
      layout: 'main',
      isSidebar: true,
      title: 'banyoku.stock._label',
    },
    children: [
      {
        path: 'master',
        icon: 'mdi-database',
        meta: {
          requiresAuth: true,
          roles: ['ADMIN', 'ABC'],
          layout: 'main',
          isSidebar: true,
          title: 'banyoku.stock.master._label',
        },
        children: [
          {
            path: 'product',
            name: 'banyoku.stock.master.product',
            icon: 'mdi-package-variant',
            component: ProductsList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN', 'ABC'],
              layout: 'main',
              isSidebar: true,
              title: 'banyoku.stock.master.product',
            }
          },
          {
            path: 'warehouse',
            name: 'banyoku.stock.master.warehouse',
            icon: 'mdi-home-group',
            component: WarehousesList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN', 'ABC'],
              layout: 'main',
              isSidebar: true,
              title: 'banyoku.stock.master.warehouse',
            }
          }
        ]
      }
    ]
  }
]