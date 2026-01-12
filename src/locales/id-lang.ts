export default {
  sidebar: {
    home: 'Beranda',
    dashboard: 'Dashboard',

    stock: {
      _label: 'Stok',

      master: {
        _label: 'Master',
        product: 'Produk',
        warehouse: 'Gudang',
        category: 'Kategori',
      },

      transaction: {
        _label: 'Transaksi',
        transferWarehouse: 'Transfer Gudang',
        stockEntry: 'Penyesuaian Stok',
      },

      tools: {
        _label: 'Tools',
        stockOpname: 'Stock Opname',
        rebuildStock: 'Rebuild Stock',
      },

      report: {
        _label: 'Laporan',
        stockBalance: 'Saldo Stok',
        stockCard: 'Kartu Stok',
      },
    },

    accounting: {
      _label: 'Akuntansi',

      master: {
        _label: 'Master',
        codeOfAccount: 'Kode Akun',
      },

      transaction: {
        _label: 'Transaksi',
        journal: 'Jurnal',
      },

      report: {
        _label: 'Laporan',
        balanceSheet: 'Neraca',
        profitLoss: 'Laba Rugi',
      },
    },

    auth: {
      _label: 'Auth',
      master: {
        _label: 'Master',
        user: 'Pengguna',
      },
    },
  },

  login: {
    signIn: 'Masuk',
    email: 'Email',
    password: 'Kata Sandi',
    login: 'Masuk',
    register: 'Daftar',
    forgotPassword: 'Lupa Kata Sandi',
    invalidEmailOrPassword: 'Email atau Kata Sandi salah',
    orLoginUsing: 'Atau Masuk dengan',
    title: 'Trading Management System',
  },

  dataFooter: {
    itemsPerPageText: 'Element per halaman:',
    pageText: '{0}-{1} dari {2}',
    },
    pagination: {
    ariaLabel: {
        root: 'Pengaturan halaman',
        next: 'Halaman berikutnya',
        previous: 'Halaman sebelumnya',
        first: 'Halaman pertama',
        last: 'Halaman terakhir',
    },
  },
}