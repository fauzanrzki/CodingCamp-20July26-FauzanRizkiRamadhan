# Design
## Aplikasi Visualisasi Pengeluaran & Anggaran

## Overview

Aplikasi ini adalah Single Page Application (SPA) berbasis client-side murni. Tidak ada backend, tidak ada server — semua logic berjalan di browser pengguna menggunakan HTML, CSS, dan JavaScript vanilla, dengan Chart.js untuk visualisasi data.

## Architecture

```
CodingCamp-20July26-FauzanRizkiRamadhan/
├── index.html          # Struktur halaman dan markup
├── css/
│   └── style.css       # Styling, animasi, responsive layout
└── js/
    └── app.js          # State management, DOM manipulation, logic
```

**Dependency eksternal:**
- [Chart.js](https://cdn.jsdelivr.net/npm/chart.js) — visualisasi pie chart via CDN

**Storage:**
- `localStorage` browser — persistensi data transaksi

---

## Data Model

### Transaction Object

```javascript
{
  id: Number,        // Unix timestamp (Date.now()) — unique identifier
  name: String,      // Nama item pengeluaran
  amount: Number,    // Nominal dalam Rupiah (integer positif)
  category: String,  // "Food" | "Transport" | "Fun"
  date: String       // ISO 8601 — new Date().toISOString()
}
```

### Global State

```javascript
let transactions = [];  // Array of Transaction — sumber kebenaran tunggal
let chart = null;       // Referensi Chart.js instance yang aktif
```

### localStorage Schema

| Key            | Type   | Value                             |
|----------------|--------|-----------------------------------|
| `transactions` | String | `JSON.stringify(transactions[])`  |

---

## Component Design

### 1. Header — Balance Card

- Menampilkan total pengeluaran dalam format IDR
- Diperbarui setiap kali `updateBalance()` dipanggil
- Elemen target: `#totalBalance`

### 2. Form Section

Input fields:
- `#itemName` — text input, required, di-trim sebelum disimpan
- `#amount` — number input, min=0, step=1000, required
- `#category` — select dropdown, required

Validasi dilakukan di event handler `submit` sebelum data diproses.

### 3. Chart Section

- Canvas: `#expenseChart`
- Pesan kosong: `#noDataMessage` (toggle class `.show`)
- Chart tipe `pie` dari Chart.js
- Data dikelompokkan berdasarkan kategori, kategori dengan total 0 tidak ditampilkan
- Instance chart lama di-destroy sebelum membuat yang baru (mencegah memory leak)

### 4. Transaction List

- Container: `#transactionList`
- Dirender ulang penuh setiap ada perubahan data (`renderTransactions()`)
- Diurutkan dari transaksi terbaru berdasarkan field `date`
- Setiap item memiliki tombol hapus dengan `onclick="deleteTransaction(id)"`

### 5. Notification Toast

- Dibuat secara dinamis via `document.createElement()`
- Muncul di pojok kanan atas dengan animasi `slideInRight`
- Otomatis dihapus setelah 3 detik dengan animasi `slideOutRight`

---

## Function Design

| Fungsi | Input | Output | Side Effect |
|--------|-------|--------|-------------|
| `loadFromLocalStorage()` | — | — | Mengisi `transactions[]` dari localStorage |
| `saveToLocalStorage()` | — | — | Menulis `transactions[]` ke localStorage |
| `renderTransactions()` | — | — | Update `innerHTML` `#transactionList` |
| `updateBalance()` | — | — | Update `textContent` `#totalBalance` |
| `updateChart()` | — | — | Destroy + recreate Chart.js instance |
| `deleteTransaction(id)` | `Number` | — | Filter array, save, re-render semua UI |
| `formatCurrency(amount)` | `Number` | `String` | Tidak ada |
| `showNotification(msg)` | `String` | — | Append + remove DOM element |

---

## UI Design

### Layout Structure

```
┌─────────────────────────────────┐
│  💰 Pengeluaran Saya            │  ← h1, warna putih
│  ┌─────────────────────────┐    │
│  │  Total Pengeluaran      │    │  ← balance-card
│  │  Rp X.XXX.XXX           │    │
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│  Tambah Transaksi               │  ← form-section
│  [Nama Item          ]          │
│  [Jumlah (Rp)        ]          │
│  [Kategori        ▼  ]          │
│  [ + Tambah Transaksi ]         │
├─────────────────────────────────┤
│  Distribusi Pengeluaran         │  ← chart-section
│  ┌─────────────────────────┐    │
│  │       Pie Chart         │    │
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│  Riwayat Transaksi              │  ← transaction-section
│  ┌──────────────────────────┐   │
│  │ Nama Item  [Kategori]    │   │
│  │            Rp XX  [Hapus]│   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

### Color System

| Token | Nilai | Digunakan pada |
|-------|-------|----------------|
| Primary | `#667eea` | Accent, border focus, amount text |
| Secondary | `#764ba2` | Gradient ujung |
| Background | `linear-gradient(135deg, #667eea, #764ba2)` | Body |
| Surface | `#ffffff` | Semua card/section |
| Text Primary | `#333333` | Heading, nama item |
| Text Secondary | `#666666` | Label, kategori |
| Danger | `#ff4757` | Tombol hapus |
| Success | `#28a745` | Notifikasi sukses |

### Category Badge Colors

| Kategori | Background | Text |
|----------|-----------|------|
| Food | `#fff3cd` | `#856404` |
| Transport | `#d1ecf1` | `#0c5460` |
| Fun | `#f8d7da` | `#721c24` |

### Chart Colors

| Kategori | Fill |
|----------|------|
| Food | `rgba(255, 206, 86, 0.8)` |
| Transport | `rgba(54, 162, 235, 0.8)` |
| Fun | `rgba(255, 99, 132, 0.8)` |

---

## Responsive Breakpoints

| Breakpoint | Perubahan |
|-----------|-----------|
| `> 600px` | Layout default — transaction item horizontal |
| `≤ 600px` | Transaction item vertical, font lebih kecil, chart height 250px |

---

## User Flow

### Tambah Transaksi
```
Isi form → Submit → Validasi → Buat objek → Push ke array
→ saveToLocalStorage → renderTransactions + updateBalance + updateChart
→ Reset form → showNotification
```

### Hapus Transaksi
```
Klik Hapus → confirm() → Filter array → saveToLocalStorage
→ renderTransactions + updateBalance + updateChart → showNotification
```

### Load Halaman
```
DOMContentLoaded → loadFromLocalStorage
→ renderTransactions + updateBalance + updateChart
```
