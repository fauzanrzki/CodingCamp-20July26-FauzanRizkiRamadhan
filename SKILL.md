# SKILL.md
## Skill & Teknologi yang Digunakan
### Aplikasi Visualisasi Pengeluaran & Anggaran

**Nama Proyek:** Pengeluaran Saya  
**Dibuat oleh:** Fauzan Rizki Ramadhan  
**Tanggal:** 23 Juli 2026

---

## 1. HTML5

**File:** `index.html`

Skill HTML yang diterapkan dalam proyek ini:

| Skill | Penerapan |
|-------|-----------|
| Semantic HTML | Menggunakan tag `<header>`, `<section>`, `<form>`, `<label>` sesuai fungsinya |
| Form & Input | `<input type="text">`, `<input type="number">`, `<select>` dengan atribut `required` |
| Accessibility | Setiap `<input>` memiliki `<label>` yang terhubung via atribut `for` dan `id` |
| External Script | Menyertakan Chart.js dari CDN dengan `<script src="...">` |
| Meta & Viewport | Penggunaan `<meta charset>` dan `<meta name="viewport">` untuk responsivitas mobile |
| Canvas Element | `<canvas id="expenseChart">` sebagai wadah rendering Chart.js |
| Atribut Form | `min`, `step`, `placeholder`, `required` untuk validasi bawaan browser |

---

## 2. CSS3

**File:** `css/style.css`

Skill CSS yang diterapkan dalam proyek ini:

| Skill | Penerapan |
|-------|-----------|
| CSS Reset | `* { margin: 0; padding: 0; box-sizing: border-box; }` |
| CSS Custom Properties (implicit) | Nilai warna konsisten digunakan ulang di berbagai selector |
| Flexbox | Layout `.transaction-item` dan `.transaction-details` menggunakan `display: flex` |
| CSS Gradient | `background: linear-gradient(135deg, #667eea, #764ba2)` pada body dan tombol |
| Box Shadow | `box-shadow` untuk efek kedalaman pada card dan tombol |
| Border Radius | Sudut melengkung pada card, input, tombol |
| CSS Transitions | `transition: all 0.3s ease` untuk efek hover yang halus |
| CSS Animations (`@keyframes`) | `slideIn` untuk item baru, `slideInRight`/`slideOutRight` untuk notifikasi |
| Responsive Design (Media Query) | `@media (max-width: 600px)` untuk layout mobile |
| Pseudo-class | `:hover`, `:focus`, `:last-child`, `:active` |
| Custom Scrollbar | `::-webkit-scrollbar` untuk styling scrollbar daftar transaksi |
| Overflow & Scroll | `overflow-y: auto` dengan `max-height` pada daftar transaksi |

---

## 3. JavaScript (Vanilla ES6+)

**File:** `js/app.js`

Skill JavaScript yang diterapkan dalam proyek ini:

### 3.1 DOM Manipulation
| Skill | Penerapan |
|-------|-----------|
| `getElementById` | Mengakses elemen form, chart canvas, daftar transaksi |
| `innerHTML` | Render ulang daftar transaksi secara dinamis |
| `createElement` / `appendChild` | Membuat elemen notifikasi secara programatik |
| `removeChild` | Menghapus notifikasi dari DOM setelah timeout |
| `style.cssText` | Menerapkan inline style pada elemen notifikasi |
| `classList.add/remove` | Toggle class `.show` pada pesan kosong chart |

### 3.2 Event Handling
| Skill | Penerapan |
|-------|-----------|
| `addEventListener` | `DOMContentLoaded` dan `submit` pada form |
| `e.preventDefault()` | Mencegah reload halaman saat form disubmit |
| `onclick` (inline handler) | Tombol hapus pada setiap item transaksi |

### 3.3 Array & Data Manipulation
| Skill | Penerapan |
|-------|-----------|
| `Array.push()` | Menambahkan transaksi baru ke array |
| `Array.filter()` | Menghapus transaksi berdasarkan ID |
| `Array.reduce()` | Menghitung total pengeluaran |
| `Array.forEach()` | Iterasi untuk menghitung total per kategori |
| `Array.sort()` | Mengurutkan transaksi dari terbaru |
| Spread operator `[...arr]` | Membuat salinan array sebelum sorting |
| `Array.map()` + `.join('')` | Menghasilkan HTML string dari array transaksi |
| `Object.keys()` | Iterasi kategori pada `categoryTotals` |

### 3.4 String & Number
| Skill | Penerapan |
|-------|-----------|
| `String.trim()` | Membersihkan whitespace pada input nama item |
| `parseFloat()` | Konversi nilai input amount ke angka |
| `Intl.NumberFormat` | Format angka ke format mata uang Rupiah (IDR) |
| Template Literals | Membangun HTML string dan pesan dinamis |

### 3.5 Date & Time
| Skill | Penerapan |
|-------|-----------|
| `Date.now()` | Membuat unique ID berbasis timestamp |
| `new Date().toISOString()` | Menyimpan tanggal transaksi dalam format standar |
| `new Date(str)` | Parse string tanggal untuk operasi sorting |

### 3.6 Web Storage API
| Skill | Penerapan |
|-------|-----------|
| `localStorage.setItem()` | Menyimpan data transaksi ke localStorage |
| `localStorage.getItem()` | Membaca data transaksi dari localStorage |
| `JSON.stringify()` | Serialisasi array ke string JSON sebelum disimpan |
| `JSON.parse()` | Deserialisasi string JSON kembali ke array |

### 3.7 Async & Timer
| Skill | Penerapan |
|-------|-----------|
| `setTimeout()` | Menghapus notifikasi secara otomatis setelah 3 detik |

---

## 4. Chart.js (Library Eksternal)

**CDN:** `https://cdn.jsdelivr.net/npm/chart.js`

| Skill | Penerapan |
|-------|-----------|
| Inisialisasi Chart | `new Chart(ctx, config)` dengan canvas context |
| Tipe Chart | `type: 'pie'` untuk visualisasi distribusi kategori |
| Dataset Konfigurasi | `backgroundColor`, `borderColor`, `borderWidth` |
| Plugin: Legend | Posisi legend di bawah chart dengan padding dan font size |
| Plugin: Tooltip Custom | Callback `label` untuk menampilkan nominal + persentase |
| Responsive Chart | `responsive: true`, `maintainAspectRatio: false` |
| Destroy & Recreate | `chart.destroy()` sebelum membuat chart baru untuk mencegah memory leak |

---

## 5. Konsep Pemrograman Umum

| Konsep | Penerapan |
|--------|-----------|
| **Single Responsibility** | Setiap fungsi punya satu tugas (render, update, save, dll.) |
| **State Management** | State aplikasi terpusat di variabel `transactions` dan `chart` |
| **DRY (Don't Repeat Yourself)** | Fungsi `formatCurrency` dan `categoryLabels` digunakan ulang |
| **Separation of Concerns** | HTML (struktur), CSS (tampilan), JS (logika) dipisah per file |
| **Data Persistence** | Sinkronisasi state ↔ localStorage setiap ada perubahan data |
| **Defensive Programming** | Validasi input sebelum data diproses |
| **User Feedback** | Konfirmasi sebelum hapus, notifikasi setelah aksi berhasil |

---

## 6. Ringkasan Level Skill

| Teknologi | Level |
|-----------|-------|
| HTML5 | Menengah |
| CSS3 (Flexbox, Animasi, Responsive) | Menengah |
| JavaScript ES6+ (DOM, Array, Storage) | Menengah |
| Chart.js | Dasar–Menengah |
| Web API (localStorage, Intl, Date) | Dasar–Menengah |
