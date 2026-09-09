# potrait.net - Instagram Link-in-Bio Hub & Katalog Interaktif Studio Foto

Website landing page *mobile-first* resmi untuk **Potrait Digital Foto Studio & Potrait Selfi di Semarang** (Tembalang UNDIP & Sekaran UNNES), dibangun menggunakan **React 18 + Tailwind CSS + Vite** dengan standar mutu antarmuka **UI/UX Pro Max**.

---

## 🌟 Fitur Utama

1. **Mobile-First Instagram Bio Architecture:**
   - Profil studio dengan avatar monogram & indikator status buka real-time.
   - Sapaan hangat dan metrik reputasi (10.000+ sesi, rating 4.9/5 di Google Maps).
2. **Hero Special Promo Banner:**
   - Sorotan penawaran wisuda hemat: *Special Offer Wisuda Rp 299.000* (Diskon 33%).
   - Direct CTA ke WhatsApp dengan teks pra-isi promo.
3. **Interactive Category Tabs & Search Bar:**
   - Tab navigasi sticky horizontal: *Semua*, *Wisuda*, *Couple & PSN*, *Group*, *Potrait Selfi*, *Pas Foto*, *Cetak & Frame*.
   - Filter instan live search pencarian nama paket atau fasilitas.
4. **Bento Grid Pricing Cards (UI/UX Pro Max Standard):**
   - Sudut halus `rounded-2xl`, shadow lembut, dan touch target minimum $\ge 44\text{px}$.
   - Rincian fasilitas transparan (durasi, jumlah orang, master edit, cetak fisik, bonus properti).
   - Tombol pesan satu pintu ke WhatsApp Pusat (`085640752597`) dengan auto pre-filled string.
5. **Branch Locator (3 Cabang Semarang):**
   - **Potrait BQ Square:** Ruko BQ Square Jl. Banjarsari No. 1, Tembalang (Buka 09.00–20.00).
   - **Potrait Prof. Soedarto:** Ruko Dahlia Kav. C Jl. Prof. Soedarto No. 1, Tembalang (Buka 09.00–20.00).
   - **Potrait Sekaran:** Jl. Taman Siswa No. 35, Sekaran, Gunungpati (Buka 09.00–17.00/20.00).
   - Dilengkapi navigasi Google Maps dan WhatsApp langsung tiap cabang.
6. **Form Booking Khusus (Interactive Modal Assistant):**
   - Memungkinkan klien memilih cabang favorit, rencana tanggal sesi, estimasi jumlah orang, dan request catatan sebelum dialihkan ke WhatsApp.
7. **FAQ Accordion & Tips Sesi:**
   - Jawaban praktis mengenai reservasi, durasi softcopy, cetak frame, dan kostum.
8. **Floating WhatsApp Bottom Bar:**
   - Bar melayang di bagian bawah dengan dukungan *safe-area-inset* untuk perangkat seluler.

---

## 🛠️ Tech Stack & Standar Desain

- **Framework:** React 18, Vite 6
- **Styling:** Tailwind CSS 3 (Charcoal `#111111`, Warm Beige `#FAF8F5`, WhatsApp `#25D366`)
- **Icons:** Lucide React (100% SVG vektor tanpa emoji struktural sesuai panduan UI/UX Pro Max)
- **Typography:** Plus Jakarta Sans & Inter
- **SEO & Performance:** Skor performa tinggi, bundle size gzip ~65 kB, Open Graph meta tags, meta keywords lokal Semarang/Tembalang/Sekaran.

---

## 🚀 Panduan Menjalankan Proyek

### 1. Mode Pengembangan (Development)
```bash
npm run dev
```
Akses di browser pada: `http://localhost:3000`

### 2. Membangun Proyek (Production Build)
```bash
npm run build
```
Hasil build produksi yang dioptimalkan akan tersimpan di direktori `dist/`.

### 3. Menjalankan Preview Build
```bash
npm run preview
```
Akses di browser pada: `http://localhost:4173`

---

## 🌐 Panduan Deployment ke Vercel

1. Buat repositori Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: potrait.net website"
   ```
2. Hubungkan ke GitHub / GitLab / Bitbucket.
3. Buka [vercel.com](https://vercel.com), pilih **Add New Project**, lalu impor repositori ini.
4. Vercel secara otomatis mendeteksi konfigurasi Vite dan menjalankan perintah `npm run build` dengan output `dist`.
5. Website siap diakses secara global dalam hitungan detik.
