export default {
  banyoku: {
    home: 'Beranda',
    dashboard: 'Dashboard',
    profile: 'Profil',
    logout: 'Keluar',

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
        journal: {
          _label: 'Jurnal',
          create: 'Buat Jurnal',
          journalNo: 'No. Jurnal',
          date: 'Tanggal',
          reference: 'Referensi',
          description: 'Deskripsi',
          account: 'Akun',
          debit: 'Debit',
          credit: 'Kredit',
          searchAccount: 'Cari Akun',
          clickToSelect: 'Klik untuk memilih',
        }
      },

      report: {
        _label: 'Laporan',
        balanceSheet: 'Neraca',
        profitLoss: 'Laba Rugi',
      },
    },

    administration: {
      _label: 'Administrasi',
      master: {
        _label: 'Master',
        user: {
          _label: 'Pengguna',
          list: 'Daftar Pengguna',
          add: 'Tambah Pengguna',
          edit: 'Ubah Pengguna',
          delete: 'Hapus Pengguna',
          create: 'Buat Pengguna',
          email: 'Email',
          password: 'Kata Sandi',
          passwordConfirmation: 'Konfirmasi Kata Sandi',
          roles: 'Roles',
          fullName: 'Nama Lengkap',
          profilePicture: 'Foto Profil',
          merchantId: 'ID Merchant',
          merchantName: 'Nama Merchant',
          success: {
            _label: 'Success',
            getList: 'Daftar pengguna berhasil diambil',
            getDetail: 'Detail pengguna berhasil diambil',
            userCreated: 'Pengguna berhasil dibuat',
            userUpdated: 'Pengguna berhasil diubah',
            userDeleted: 'Pengguna berhasil dihapus',
          },
          error: {
            _label: 'Error',
            getList: 'Gagal mengambil daftar pengguna',
            getDetail: 'Gagal mengambil detail pengguna',
            emailExists: 'Email sudah terdaftar',
            passwordConfirmation: 'Kata sandi tidak sesuai', 
            userNotFound: 'Pengguna tidak ditemukan',
            createUser: 'Gagal membuat pengguna',
            updateUser: 'Gagal mengubah pengguna',
            deleteUser: 'Gagal menghapus pengguna',
          }
        },
        role: {
          _label: 'Role',
          list: 'Daftar Role',
          add: 'Tambah Role',
          edit: 'Ubah Role',
          delete: 'Hapus Role',
          create: 'Buat Role',
          roleName: 'Nama Role',
          status: 'Status',
          active: 'Aktif',
          inactive: 'Tidak Aktif',
          success: {
            _label: 'Success',
            getList: 'Daftar role berhasil diambil',
            getDetail: 'Detail role berhasil diambil',
            roleCreated: 'Role berhasil dibuat',
            roleUpdated: 'Role berhasil diubah',
            roleDeleted: 'Role berhasil dihapus',
          },
          error: {
            _label: 'Error',
            getList: 'Gagal mengambil daftar role',
            getDetail: 'Gagal mengambil detail role',
            roleNameExists: 'Nama role sudah terdaftar',
          },
          ROLE_CREATED: 'Role berhasil dibuat',
          ROLE_UPDATED: 'Role berhasil diubah',
          ROLE_DELETED: 'Role berhasil dihapus',
        },
        merchant: {
          _label: 'Merchant',
          list: 'Daftar Merchant',
          add: 'Tambah Merchant',
          edit: 'Ubah Merchant',
          delete: 'Hapus Merchant',
          create: 'Buat Merchant',
          merchantName: 'Nama Merchant',
          merchantLogo: 'Logo Merchant',
          owner: 'Pemilik',
          status: 'Status',
          active: 'Aktif',
          inactive: 'Tidak Aktif',
          success: {
            _label: 'Success',
            getList: 'Daftar merchant berhasil diambil',
            getDetail: 'Detail merchant berhasil diambil',
            merchantCreated: 'Merchant berhasil dibuat',
            merchantUpdated: 'Merchant berhasil diubah',
            merchantDeleted: 'Merchant berhasil dihapus',
          },
          error: {
            _label: 'Error',
            getList: 'Gagal mengambil daftar merchant',
            getDetail: 'Gagal mengambil detail merchant',
            merchantNameExists: 'Nama merchant sudah terdaftar',
          },
          MERCHANT_CREATED: 'Merchant berhasil dibuat',
          MERCHANT_UPDATED: 'Merchant berhasil diubah',
          MERCHANT_DELETED: 'Merchant berhasil dihapus',
        },
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
    itemsPerPageAll: 'Semua',
    firstPage: 'Halaman pertama',
    lastPage: 'Halaman terakhir',
    nextPage: 'Halaman berikutnya',
    prevPage: 'Halaman sebelumnya',
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
  dataIterator: {
    loadingText: 'Memuat...',
  },
  input: {
    clear: 'Hapus',
  },
  validation: {
    required: 'Harus diisi',
  },
  noDataText: 'Tidak ada data',
  save: 'Simpan',
  saving: 'Simpan...',
  loading: 'Memuat...',
  open: 'Buka',
  close: 'Tutup',
  search: 'Cari',
  no: 'No',
  id: 'ID',
  merchant: 'Mitra',
  action: 'Aksi',
  addRow: 'Tambah Baris',
  removeRow: 'Hapus Baris',
  back: 'Kembali',
  fileUpload: {
    title: 'Tarik dan lepas file di sini',
    divider: 'atau',
    browse: 'Pilih file',
  },
}