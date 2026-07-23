# Project: Visualisasi Pengeluaran & Anggaran

## Deskripsi
Aplikasi web sederhana untuk mencatat dan memvisualisasikan pengeluaran harian. Dibangun menggunakan HTML, CSS, dan JavaScript vanilla dengan Chart.js untuk grafik pie chart.

## Stack Teknologi
- **HTML5** — struktur halaman (`index.html`)
- **CSS3** — styling responsif (`css/style.css`)
- **JavaScript (Vanilla ES6+)** — logika aplikasi (`js/app.js`)
- **Chart.js** (via CDN) — visualisasi data pie chart
- **localStorage** — penyimpanan data di browser (tanpa backend)

## Struktur Proyek
```
/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

## Konvensi Kode

### JavaScript
- Gunakan `let` / `const`, hindari `var`
- Nama fungsi: camelCase (contoh: `renderTransactions`, `updateChart`)
- Nama variabel: camelCase (contoh: `categoryTotals`, `itemName`)
- Komentar menggunakan Bahasa Indonesia atau Inggris
- Validasi input selalu dilakukan sebelum menyimpan data
- Data disimpan ke `localStorage` setiap ada perubahan

### CSS
- Gunakan CSS custom variables jika menambah warna baru
- Warna utama: `#667eea` (ungu biru), `#764ba2` (ungu)
- Border-radius standar: `10px` untuk input, `15px` untuk card
- Semua animasi menggunakan `transition: all 0.3s ease`
- Responsif mobile menggunakan breakpoint `max-width: 600px`

### HTML
- `lang="id"` (Bahasa Indonesia)
- Semua teks UI dalam Bahasa Indonesia
- Gunakan semantic HTML (`header`, `section`, `form`)

## Kategori Pengeluaran
| Value | Label | Warna |
|-------|-------|-------|
| `Food` | 🍔 Makanan | Kuning (`#fff3cd`) |
| `Transport` | 🚗 Transport | Biru muda (`#d1ecf1`) |
| `Fun` | 🎉 Hiburan | Merah muda (`#f8d7da`) |

## Fitur Utama
1. Tambah transaksi (nama, jumlah, kategori)
2. Hapus transaksi dengan konfirmasi
3. Tampil total pengeluaran di balance card
4. Pie chart distribusi per kategori (Chart.js)
5. Notifikasi sukses setelah aksi
6. Data persisten via `localStorage`
7. Tampilan responsif mobile

## Panduan Pengembangan
- Jangan tambahkan dependensi npm/build tools — proyek ini pure static HTML
- Jika menambah kategori baru, update `categoryLabels`, `colorMap`, dan `<select>` di HTML sekaligus
- Jaga agar aplikasi tetap bisa dibuka langsung lewat browser (file://) tanpa server
- Gunakan `formatCurrency()` untuk semua tampilan angka Rupiah
- Gunakan `showNotification()` untuk feedback aksi pengguna
