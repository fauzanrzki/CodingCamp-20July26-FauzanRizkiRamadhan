# Requirement Document
## Aplikasi Visualisasi Pengeluaran & Anggaran

**Nama Proyek:** Pengeluaran Saya  
**Dibuat oleh:** Fauzan Rizki Ramadhan  
**Tanggal:** 23 Juli 2026

---

## 1. Deskripsi Proyek

Aplikasi web berbasis client-side untuk mencatat, mengelola, dan memvisualisasikan pengeluaran harian. Pengguna dapat menambahkan transaksi pengeluaran, melihat distribusi per kategori dalam bentuk grafik, dan mengelola riwayat transaksi — semua tersimpan secara lokal di browser.

---

## 2. Tujuan

- Membantu pengguna memantau pengeluaran harian secara mudah dan visual.
- Memberikan gambaran distribusi pengeluaran per kategori melalui chart interaktif.
- Menyimpan data secara persisten di browser tanpa membutuhkan backend.

---

## 3. Pengguna Target

Individu (pelajar/mahasiswa/umum) yang ingin mencatat pengeluaran pribadi secara sederhana melalui browser.

---

## 4. Functional Requirements

### FR-01: Tambah Transaksi
- Pengguna dapat menambahkan transaksi baru melalui form input.
- Input yang diperlukan:
  - **Nama Item** (teks, wajib diisi)
  - **Jumlah** (angka dalam Rupiah, wajib diisi, minimum Rp 1)
  - **Kategori** (pilih salah satu: Makanan, Transport, Hiburan, wajib dipilih)
- Setelah berhasil ditambahkan, form direset otomatis.
- Notifikasi sukses ditampilkan selama 3 detik.

### FR-02: Tampilkan Total Pengeluaran
- Total seluruh pengeluaran ditampilkan secara otomatis dan diperbarui setiap ada perubahan data.
- Format tampilan menggunakan format mata uang Rupiah (IDR).

### FR-03: Visualisasi Grafik Pie
- Pengeluaran ditampilkan dalam bentuk **pie chart** berdasarkan kategori.
- Grafik menampilkan persentase dan nominal setiap kategori pada tooltip.
- Jika belum ada data, grafik disembunyikan dan pesan kosong ditampilkan.

### FR-04: Riwayat Transaksi
- Daftar seluruh transaksi ditampilkan, diurutkan dari yang terbaru.
- Setiap item menampilkan: nama item, label kategori, dan nominal.

### FR-05: Hapus Transaksi
- Pengguna dapat menghapus transaksi satu per satu.
- Konfirmasi dialog ditampilkan sebelum penghapusan dilakukan.
- Total pengeluaran dan grafik diperbarui otomatis setelah penghapusan.

### FR-06: Persistensi Data
- Semua data transaksi disimpan di **localStorage** browser.
- Data tetap tersedia setelah halaman di-refresh atau browser ditutup dan dibuka kembali.

---

## 5. Non-Functional Requirements

### NFR-01: Performa
- Aplikasi harus merespons input pengguna dalam waktu < 200ms.
- Chart dirender ulang hanya saat ada perubahan data.

### NFR-02: Kompatibilitas
- Aplikasi berjalan di browser modern: Chrome, Firefox, Safari, Edge (versi terbaru).
- Tidak membutuhkan instalasi atau koneksi internet (kecuali untuk load library CDN pertama kali).

### NFR-03: Responsif
- Tampilan menyesuaikan layar mobile (min-width: 320px) dan desktop.
- Layout mobile menggunakan pendekatan single-column.

### NFR-04: Aksesibilitas
- Semua form memiliki label yang terhubung dengan input.
- Warna teks memiliki kontras yang cukup untuk keterbacaan.

### NFR-05: Keamanan Data
- Data hanya disimpan secara lokal di perangkat pengguna (localStorage).
- Tidak ada data yang dikirim ke server manapun.

---

## 6. Batasan

- Kategori pengeluaran bersifat tetap (tidak dapat ditambah/diubah oleh pengguna).
- Tidak ada fitur login atau multi-user.
- Tidak ada fitur ekspor data (CSV, PDF, dll.).
- Tidak ada fitur edit transaksi (hanya tambah dan hapus).

---

## 7. Kategori Pengeluaran

| Kode     | Label       | Ikon |
|----------|-------------|------|
| Food     | Makanan     | 🍔   |
| Transport| Transport   | 🚗   |
| Fun      | Hiburan     | 🎉   |
