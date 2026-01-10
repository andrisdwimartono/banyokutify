import CodeOfAccountList from './pages/CodeOfAccountList.vue'

export default [
  {
    path: '/accounting',
    titleKey: 'sidebar.accounting',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN'],
      layout: 'main'
    },
    children: [
      {
        path: '/accounting/code-of-accounts',
        titleKey: 'sidebar.codeOfAccount',
        icon: 'mdi-account-multiple-outline',
        name: 'codeOfAccount.list',
        component: CodeOfAccountList,
        meta: {
          requiresAuth: true,
          roles: ['ADMIN'],
          layout: 'main'
        }
      }
    ]
  }
]