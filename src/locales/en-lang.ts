export default {
  sidebar: {
    home: 'Home',
    dashboard: 'Dashboard',

    stock: {
      _label: 'Stock',

      master: {
        _label: 'Master',
        product: 'Product',
        warehouse: 'Warehouse',
        category: 'Category',
      },

      transaction: {
        _label: 'Transaction',
        transferWarehouse: 'Transfer Warehouse',
        stockEntry: 'Stock Entry',
      },

      tools: {
        _label: 'Tools',
        stockOpname: 'Stock Opname',
        rebuildStock: 'Rebuild Stock',
      },

      report: {
        _label: 'Report',
        stockBalance: 'Stock Balance',
        stockCard: 'Stock Card',
      },
    },

    accounting: {
      _label: 'Accounting',

      master: {
        _label: 'Master',
        codeOfAccount: 'Code of Account',
      },

      transaction: {
        _label: 'Transaction',
        journal: 'Journal',
      },

      report: {
        _label: 'Report',
        balanceSheet: 'Balance Sheet',
        profitLoss: 'Profit and Loss',
      },
    },

    administration: {
      _label: 'Administration',
      master: {
        _label: 'Master',
        user: {
          _label: 'User',
          list: 'User List',
          add: 'Add User',
          edit: 'Edit User',
          delete: 'Delete User',
          create: 'Create User',
          email: 'Email',
          password: 'Password',
          passwordConfirmation: 'Password Confirmation',
          roles: 'Roles',
          fullName: 'Full Name',
          profilePicture: 'Profile Picture',
          merchantId: 'Merchant ID',
          merchantName: 'Merchant Name',
        },
      },
    },
  },

  login: {
    signIn: 'Sign In',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    register: 'Register',
    forgotPassword: 'Forgot Password',
    invalidEmailOrPassword: 'Invalid email or password',
    orLoginUsing: 'Or login using',
    title: 'Trading Management System',
  },

  dataFooter: {
    itemsPerPageText: 'Items per page',
    pageText: '{0}-{1} of {2}',
    itemsPerPageAll: 'All',
    firstPage: 'First page',
    lastPage: 'Last page',
    nextPage: 'Next page',
    prevPage: 'Previous page',
  },
  pagination: {
    ariaLabel: {
      root: 'Pagination',
      next: 'Next',
      previous: 'Previous',
      first: 'First',
      last: 'Last',
    },
  },
  dataIterator: {
    loadingText: 'Loading...',
  },
  input: {
    clear: 'Clear',
  },
  validation: {
    required: 'Required',
  },
  noDataText: 'No data',
  save: 'Save',
  open: 'Open',
  close: 'Close',
  search: 'Search',
  no: 'No',
  id: 'ID',
  merchant: 'Merchant',
}