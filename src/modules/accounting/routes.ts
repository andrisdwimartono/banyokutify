import CodeOfAccountList from './pages/CodeOfAccountList.vue'
import JournalList from './transaction/journal/JournalList.vue'
import JournalForm from './transaction/journal/JournalForm.vue'

export default [
  {
    path: '/accounting',
    icon: 'mdi-account-multiple-outline',
    meta: {
      requiresAuth: true,
      roles: ['ADMIN'],
      layout: 'main',
      isSidebar: true,
      title: 'banyoku.accounting._label',
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
          title: 'banyoku.accounting.master._label',
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
              title: 'banyoku.accounting.master.codeOfAccounts._label',
            }
          }
        ],
      },
      {
        path: 'transaction',
        icon: 'mdi-book',
        meta: {
          requiresAuth: true,
          roles: ['ADMIN'],
          layout: 'main',
          isSidebar: true,
          title: 'banyoku.accounting.transaction._label',
        },
        children: [
          {
            path: '/accounting/transaction/journal',
            icon: 'mdi-account-multiple-outline',
            name: 'journal.list',
            component: JournalList,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              isSidebar: true,
              layout: 'main',
              title: 'banyoku.accounting.transaction.journal._label',
            }
          },
          {
            path: '/accounting/transaction/journal/create',
            icon: 'mdi-account-multiple-outline',
            name: 'journal.create',
            component: JournalForm,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              isSidebar: false,
              layout: 'main',
              title: 'banyoku.accounting.transaction.journal.create',
            }
          },
          {
            path: '/accounting/transaction/journal/:id/edit',
            icon: 'mdi-account-multiple-outline',
            name: 'journal.edit',
            component: JournalForm,
            meta: {
              requiresAuth: true,
              roles: ['ADMIN'],
              isSidebar: false,
              layout: 'main',
              title: 'banyoku.accounting.transaction.journal.edit',
            }
          }
        ],
      },
    ],
  }
]