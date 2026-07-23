# Requirements
## Aplikasi Visualisasi Pengeluaran & Anggaran

## Overview

Aplikasi web client-side untuk mencatat dan memvisualisasikan pengeluaran harian secara personal. Pengguna dapat menambah transaksi, melihat distribusi pengeluaran per kategori melalui pie chart, dan mengelola riwayat — semua tersimpan lokal di browser tanpa backend.

## Requirements

### Requirement 1: Tambah Transaksi

**User Story:** Sebagai pengguna, saya ingin menambahkan pengeluaran baru dengan nama, jumlah, dan kategori agar pengeluaran saya tercatat.

**Acceptance Criteria:**

1. WHEN pengguna mengisi form dan menekan tombol submit THEN transaksi baru ditambahkan ke daftar
2. WHEN form berhasil disubmit THEN form direset ke kondisi awal
3. WHEN pengguna tidak mengisi salah satu field THEN sistem menampilkan pesan error
4. WHEN jumlah yang diisi adalah 0 atau negatif THEN sistem menampilkan pesan error
5. WHEN transaksi berhasil ditambahkan THEN notifikasi sukses ditampilkan selama 3 detik

### Requirement 2: Tampilkan Total Pengeluaran

**User Story:** Sebagai pengguna, saya ingin melihat total keseluruhan pengeluaran saya agar tahu berapa banyak yang sudah dikeluarkan.

**Acceptance Criteria:**

1. WHEN halaman dimuat THEN total pengeluaran ditampilkan di balance card
2. WHEN transaksi baru ditambahkan THEN total diperbarui secara otomatis
3. WHEN transaksi dihapus THEN total diperbarui secara otomatis
4. THEN total ditampilkan dalam format mata uang Rupiah (IDR)

### Requirement 3: Visualisasi Grafik Pie

**User Story:** Sebagai pengguna, saya ingin melihat distribusi pengeluaran per kategori dalam bentuk grafik agar mudah dipahami secara visual.

**Acceptance Criteria:**

1. WHEN ada minimal satu transaksi THEN pie chart ditampilkan berdasarkan kategori
2. WHEN tidak ada transaksi THEN pie chart disembunyikan dan pesan kosong ditampilkan
3. WHEN hovering segmen chart THEN tooltip menampilkan nama kategori, nominal, dan persentase
4. WHEN transaksi baru ditambahkan atau dihapus THEN chart diperbarui otomatis

### Requirement 4: Riwayat Transaksi

**User Story:** Sebagai pengguna, saya ingin melihat daftar semua transaksi yang sudah dicatat agar bisa memantau riwayat pengeluaran.

**Acceptance Criteria:**

1. WHEN ada transaksi THEN daftar menampilkan nama item, kategori, dan nominal
2. THEN transaksi diurutkan dari yang paling baru
3. WHEN tidak ada transaksi THEN pesan empty state ditampilkan
4. THEN setiap kategori ditampilkan dengan warna badge yang berbeda

### Requirement 5: Hapus Transaksi

**User Story:** Sebagai pengguna, saya ingin menghapus transaksi yang tidak diperlukan agar daftar tetap akurat.

**Acceptance Criteria:**

1. WHEN pengguna menekan tombol hapus THEN dialog konfirmasi ditampilkan
2. WHEN pengguna mengkonfirmasi THEN transaksi dihapus dari daftar
3. WHEN pengguna membatalkan THEN transaksi tidak dihapus
4. WHEN transaksi dihapus THEN total dan chart diperbarui otomatis
5. WHEN transaksi berhasil dihapus THEN notifikasi sukses ditampilkan

### Requirement 6: Persistensi Data

**User Story:** Sebagai pengguna, saya ingin data transaksi tetap tersimpan meski halaman di-refresh agar tidak perlu mengisi ulang.

**Acceptance Criteria:**

1. WHEN transaksi ditambahkan THEN data disimpan ke localStorage
2. WHEN transaksi dihapus THEN perubahan disimpan ke localStorage
3. WHEN halaman dimuat ulang THEN data transaksi sebelumnya dimuat dari localStorage
4. THEN data hanya tersimpan lokal di perangkat pengguna

### Requirement 7: Responsif Mobile

**User Story:** Sebagai pengguna, saya ingin aplikasi bisa digunakan di smartphone agar bisa mencatat kapan saja.

**Acceptance Criteria:**

1. WHEN diakses di layar ≤ 600px THEN layout menyesuaikan menjadi single-column
2. WHEN diakses di mobile THEN semua fitur tetap dapat digunakan
3. THEN ukuran teks dan elemen menyesuaikan layar kecil
