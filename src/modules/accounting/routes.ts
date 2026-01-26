import CodeOfAccountList from './pages/CodeOfAccountList.vue'

export default [
  {
    path: '/accounting',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN'],
      layout: 'main',
      title: 'banyoku.accounting',
    },
    children: [
      {
        path: '/accounting/code-of-accounts',
        icon: 'mdi-account-multiple-outline',
        name: 'codeOfAccount.list',
        component: CodeOfAccountList,
        meta: {
          requiresAuth: true,
          roles: ['ADMIN'],
          layout: 'main',
          title: 'banyoku.codeOfAccount',
        }
      }
    ]
  }
]