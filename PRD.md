# Product Requirement Document (PRD) - potrait.net

## 1. Executive Summary
**potrait.net** adalah web landing page mobile-first yang berfungsi sebagai *Instagram Link-in-Bio Hub* sekaligus katalog digital interaktif untuk Potrait Digital Foto Studio & Potrait Selfi di Semarang. Website ini dirancang agar pengguna dapat melihat pricelist lengkap, produk, informasi cabang, dan langsung melakukan *booking* instan via WhatsApp satu pintu.

## 2. Technical Stack
- **Framework:** Next.js (App Router) / Vite + React, Tailwind CSS.
- **Hosting & Infra:** Vercel (Deployment cepat dan stabil diakses via mobile).

## 3. Core Features & Capabilities
1. **Interactive Pricing & Package Tabs:** 
   - Tab navigasi kategori yang jelas: *Paket Wisuda*, *Couple & PSN*, *Group & Friendship*, *Potrait Selfi*, *Pas Foto & ID*, serta *Cetak & Frame*.
   - Setiap paket menampilkan detail durasi, jumlah orang, jumlah file edit, cetak fisik, dan bonus secara transparan.
2. **Instant WhatsApp Booking (One-Tap CTA):**
   - Setiap tombol "Pesan Sekarang" otomatis membuka WhatsApp pusat (`085640752597`) dengan format pesan pra-isi (*pre-filled text*) berisi nama paket yang dipilih.
3. **Branch Locator (Informasi Cabang Lengkap):**
   - **Potrait BQ Square:** Ruko BQ Square, Jl. Banjarsari No. 1, Tembalang (Buka setiap hari 09.00–20.00 WIB, WA: +6285866926297).
   - **Potrait Prof. Soedarto:** Ruko Dahlia Kav. C, Jl. Prof. Soedarto No. 1, Tembalang (Buka setiap hari 09.00–20.00 WIB, WA: +6285101223397).
   - **Potrait Sekaran:** Jl. Taman Siswa No. 35, Sekaran, Gunungpati (Buka Senin–Jumat 09.00–17.00 WIB, Sabtu–Minggu 09.00–20.00 WIB, WA: +6285600800697).
   - Dilengkapi tautan langsung ke Google Maps masing-masing cabang.
4. **SEO & Performance:**
   - Meta title dan meta description yang dioptimalkan untuk kata kunci lokal (*studio foto Tembalang*, *self photo Semarang*, *foto wisuda UNDIP*, *studio foto UNNES*).
   - Format gambar WebP dan *lazy loading* untuk performa muat halaman di bawah 2 detik.