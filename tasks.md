# Tasks
## Aplikasi Visualisasi Pengeluaran & Anggaran

## Overview

Daftar task implementasi berdasarkan requirements dan design. Setiap task bersifat independen dan dapat diverifikasi secara terpisah.

---

- [x] 1. Setup struktur proyek dan file dasar

  - Buat file `index.html` dengan struktur HTML5 dasar
  - Buat folder `css/` dan file `style.css`
  - Buat folder `js/` dan file `app.js`
  - Hubungkan CSS dan JS ke HTML
  - Tambahkan Chart.js via CDN
  - **File:** `index.html`, `css/style.css`, `js/app.js`

- [x] 2. Buat markup HTML lengkap

  - Tambahkan `<header>` dengan balance card (`#totalBalance`)
  - Tambahkan form section dengan input nama, jumlah, kategori
  - Tambahkan chart section dengan `<canvas id="expenseChart">` dan pesan kosong
  - Tambahkan transaction list section (`#transactionList`)
  - Pastikan semua `<input>` memiliki `<label>` yang terhubung
  - **File:** `index.html`

- [x] 3. Implementasi state dan persistensi data

  - Deklarasikan variabel global `transactions` dan `chart`
  - Implementasi `saveToLocalStorage()` — stringify dan simpan ke key `"transactions"`
  - Implementasi `loadFromLocalStorage()` — parse dan isi array dari localStorage
  - Panggil `loadFromLocalStorage()` saat `DOMContentLoaded`
  - **File:** `js/app.js`

- [x] 4. Implementasi tambah transaksi

  - Tambahkan event listener `submit` pada `#transactionForm`
  - Ambil dan validasi nilai dari ketiga input field
  - Tampilkan alert jika ada field kosong atau jumlah ≤ 0
  - Buat objek transaksi dengan `id`, `name`, `amount`, `category`, `date`
  - Push ke array, save, update UI, reset form
  - **File:** `js/app.js`

- [x] 5. Implementasi render daftar transaksi

  - Implementasi `renderTransactions()` yang render ulang `#transactionList`
  - Tampilkan empty state jika array kosong
  - Urutkan transaksi dari terbaru menggunakan `sort()`
  - Render setiap item dengan nama, badge kategori, nominal, dan tombol hapus
  - **File:** `js/app.js`

- [x] 6. Implementasi hapus transaksi

  - Implementasi `deleteTransaction(id)` yang dapat dipanggil dari inline onclick
  - Tampilkan `confirm()` sebelum menghapus
  - Filter array, save, dan update seluruh UI
  - **File:** `js/app.js`

- [x] 7. Implementasi kalkulasi total pengeluaran

  - Implementasi `updateBalance()` menggunakan `Array.reduce()`
  - Update teks `#totalBalance` dengan hasil `formatCurrency()`
  - Implementasi `formatCurrency(amount)` menggunakan `Intl.NumberFormat` IDR
  - **File:** `js/app.js`

- [x] 8. Implementasi pie chart dengan Chart.js

  - Implementasi `updateChart()` yang membuat pie chart berdasarkan kategori
  - Hitung total per kategori, filter kategori dengan total 0
  - Destroy chart lama sebelum membuat yang baru
  - Sembunyikan canvas dan tampilkan `#noDataMessage` jika tidak ada data
  - Konfigurasi tooltip custom yang menampilkan nominal dan persentase
  - **File:** `js/app.js`

- [x] 9. Implementasi notifikasi toast

  - Implementasi `showNotification(message)` yang membuat elemen notifikasi dinamis
  - Terapkan styling inline dengan posisi fixed pojok kanan atas
  - Tambahkan animasi `slideInRight` saat muncul dan `slideOutRight` saat hilang
  - Hapus elemen dari DOM setelah 3 detik
  - **File:** `js/app.js`

- [x] 10. Implementasi styling dan layout

  - CSS reset dan base styles
  - Styling header, balance card, form section, chart section, transaction section
  - Styling badge kategori dengan warna berbeda per kategori (Food, Transport, Fun)
  - Styling tombol primary dan tombol hapus dengan efek hover
  - Animasi `slideIn` untuk item transaksi baru
  - Custom scrollbar untuk daftar transaksi
  - **File:** `css/style.css`

- [x] 11. Implementasi responsive design

  - Tambahkan media query `@media (max-width: 600px)`
  - Sesuaikan ukuran font heading dan balance amount
  - Ubah layout transaction item menjadi vertikal di mobile
  - Kurangi tinggi chart menjadi 250px di mobile
  - **File:** `css/style.css`
