# Design Document
## Aplikasi Visualisasi Pengeluaran & Anggaran

**Nama Proyek:** Pengeluaran Saya  
**Dibuat oleh:** Fauzan Rizki Ramadhan  
**Tanggal:** 23 Juli 2026

---

## 1. Arsitektur Aplikasi

Aplikasi ini adalah **Single Page Application (SPA)** berbasis client-side murni tanpa backend.

```
├── index.html      → Struktur dan markup halaman
├── css/
│   └── style.css   → Styling dan layout (responsive)
└── js/
    └── app.js      → Logic aplikasi, manajemen state, DOM manipulation
```

**Teknologi yang digunakan:**
- HTML5 — struktur halaman
- CSS3 — styling, animasi, responsive layout
- JavaScript (Vanilla ES6+) — logika aplikasi
- [Chart.js](https://www.chartjs.org/) (v4, via CDN) — visualisasi grafik
- localStorage API — persistensi data

---

## 2. Struktur Data

### Model: Transaction

```javascript
{
  id: Number,        // Unix timestamp (Date.now()) sebagai unique ID
  name: String,      // Nama item pengeluaran
  amount: Number,    // Nominal dalam Rupiah (integer positif)
  category: String,  // "Food" | "Transport" | "Fun"
  date: String       // ISO 8601 date string (new Date().toISOString())
}
```

### State Global

```javascript
let transactions = [];  // Array of Transaction objects
let chart = null;       // Referensi instance Chart.js aktif
```

### localStorage

- **Key:** `"transactions"`
- **Value:** JSON string dari array `transactions`

---

## 3. Desain UI / Layout

### 3.1 Struktur Halaman

```
┌─────────────────────────────────┐
│           HEADER                │
│  💰 Pengeluaran Saya            │
│  ┌───────────────────────────┐  │
│  │  Total Pengeluaran: Rp X  │  │  ← Balance Card
│  └───────────────────────────┘  │
├─────────────────────────────────┤
│         FORM SECTION            │
│  Nama Item: [____________]      │
│  Jumlah:    [____________]      │
│  Kategori:  [____________▼]     │
│  [  + Tambah Transaksi  ]       │
├─────────────────────────────────┤
│         CHART SECTION           │
│  Distribusi Pengeluaran         │
│  ┌─────────────────────────┐    │
│  │      Pie Chart          │    │
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│       TRANSACTION LIST          │
│  Riwayat Transaksi              │
│  ┌──────────────────────────┐   │
│  │ Nama     Kategori  Rp X  │   │
│  │ ...                      │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

### 3.2 Color Palette

| Elemen              | Warna                          |
|---------------------|--------------------------------|
| Background gradient | `#667eea` → `#764ba2` (ungu)   |
| Primary accent      | `#667eea`                      |
| Card background     | `#ffffff`                      |
| Text utama          | `#333333`                      |
| Text sekunder       | `#666666`                      |
| Tombol hapus        | `#ff4757`                      |
| Notifikasi sukses   | `#28a745`                      |

### 3.3 Warna Kategori

| Kategori  | Badge Background | Badge Text |
|-----------|-----------------|------------|
| Food      | `#fff3cd`        | `#856404`  |
| Transport | `#d1ecf1`        | `#0c5460`  |
| Fun       | `#f8d7da`        | `#721c24`  |

### 3.4 Warna Chart (Pie)

| Kategori  | Warna Chart                    |
|-----------|-------------------------------|
| Food      | `rgba(255, 206, 86, 0.8)` — kuning |
| Transport | `rgba(54, 162, 235, 0.8)` — biru   |
| Fun       | `rgba(255, 99, 132, 0.8)` — merah  |

---

## 4. Alur Kerja (User Flow)

### 4.1 Menambah Transaksi

```
Pengguna mengisi form
       ↓
Submit form → validasi input
       ↓
[Valid] → buat objek transaction → push ke array
       ↓
saveToLocalStorage()
       ↓
renderTransactions() + updateBalance() + updateChart()
       ↓
Reset form + tampilkan notifikasi sukses
```

### 4.2 Menghapus Transaksi

```
Klik tombol "Hapus"
       ↓
Tampilkan konfirmasi dialog
       ↓
[Konfirmasi] → filter array (hapus by id)
       ↓
saveToLocalStorage()
       ↓
renderTransactions() + updateBalance() + updateChart()
       ↓
Tampilkan notifikasi sukses
```

### 4.3 Inisialisasi Halaman

```
DOMContentLoaded
       ↓
loadFromLocalStorage() → isi array transactions
       ↓
renderTransactions()
updateBalance()
updateChart()
```

---

## 5. Desain Komponen / Fungsi

### app.js — Fungsi Utama

| Fungsi                   | Deskripsi                                                   |
|--------------------------|-------------------------------------------------------------|
| `loadFromLocalStorage()` | Membaca dan parse data dari localStorage ke array           |
| `saveToLocalStorage()`   | Stringify dan simpan array ke localStorage                  |
| `renderTransactions()`   | Render ulang seluruh daftar transaksi ke DOM                |
| `deleteTransaction(id)`  | Hapus transaksi by ID, update state dan UI                  |
| `updateBalance()`        | Hitung total dan update teks di DOM                         |
| `updateChart()`          | Destroy chart lama, buat chart baru berdasarkan data terkini|
| `formatCurrency(amount)` | Format angka ke format Rupiah (IDR) menggunakan `Intl`      |
| `showNotification(msg)`  | Tampilkan toast notification dengan animasi slide           |

---

## 6. Desain Responsif

### Breakpoint

| Layar    | Max Width | Perubahan Layout                                     |
|----------|-----------|------------------------------------------------------|
| Desktop  | > 600px   | Layout penuh, transaction item horizontal            |
| Mobile   | ≤ 600px   | Padding dikurangi, transaction item menjadi vertikal |

### Perubahan Mobile

- `header h1`: `2rem` → `1.5rem`
- `.balance-amount`: `2.5rem` → `2rem`
- `.transaction-item`: `flex-direction: row` → `column`
- `.chart-container height`: `300px` → `250px`

---

## 7. Animasi & Feedback

| Trigger             | Animasi / Efek                              |
|---------------------|---------------------------------------------|
| Item transaksi baru | `slideIn` dari kiri (fade + translateX)     |
| Hover balance card  | `translateY(-5px)` (naik sedikit)           |
| Hover transaction   | `translateX(5px)` (geser kanan)             |
| Tombol primary      | `translateY(-2px)` + shadow saat hover      |
| Notifikasi sukses   | `slideInRight` masuk, `slideOutRight` keluar|

---

## 8. Validasi Input

| Field      | Aturan Validasi                         |
|------------|-----------------------------------------|
| Nama Item  | Tidak boleh kosong (required + trim)    |
| Jumlah     | Tidak boleh kosong, harus > 0 (number)  |
| Kategori   | Harus memilih salah satu opsi (required)|

Error ditampilkan melalui `alert()` browser bawaan.
