# Fase Implementasi — Website Zahir Surabaya

Rancangan lengkap: `RENCANA-WEBSITE-ZAHIR.md`. Sumber konten: `../konten-situs-lama.md` dan `../riset-zahir.md`.

## Fase 1 — Fondasi
- [x] Struktur folder (css, js, img, produk, support, tips-trik, promo, download, partner, kontak)
- [x] `css/style.css` — design tokens, navbar glass, hero, tombol, kartu, tabel, FAQ accordion, footer gelap, tombol WA mengambang, animasi reveal, responsif mobile-first
- [x] `js/main.js` — menu mobile, efek scroll navbar, animasi reveal (IntersectionObserver), FAQ accordion, form demo ke WhatsApp, tahun footer

## Fase 2 — Halaman inti
- [x] `index.html` — beranda: hero gradient, CTA ganda, grid 7 produk, keunggulan, statistik, segmen industri, CTA akhir
- [x] `kontak/index.html` — info kontak, peta, formulir Permintaan Demo & Presentasi

## Fase 3 — Halaman produk
- [x] `produk/index.html` — ringkasan + tabel perbandingan 7 edisi + rekomendasi per jenis usaha
- [x] `produk/small-business.html`
- [x] `produk/flexy-trade.html`
- [x] `produk/personal.html`
- [x] `produk/standart.html`
- [x] `produk/enterprise.html`
- [x] `produk/enterprise-plus.html`
- [x] `produk/online.html`

## Fase 4 — Halaman pendukung
- [x] `support/index.html` — pengantar + FAQ accordion
- [x] `support/versi-5.html`
- [x] `support/versi-6.html`
- [x] `tips-trik/index.html` — placeholder
- [x] `promo/index.html` — placeholder
- [x] `download/index.html` — placeholder
- [x] `partner/index.html` — placeholder

## Fase 5 — Uji coba
- [x] Buka semua halaman di browser, tidak ada error
- [x] Cek responsif mobile (hamburger menu, grid, tabel scroll)
- [x] Cek semua link internal & tombol WhatsApp
- [x] Centang semua item di atas selesai

## Catatan
- Semua halaman statis berbagi header/footer yang sama; path relatif menyesuaikan subfolder (`../css/style.css` dst.).
- Placeholder gambar memakai div berstyling (tanpa file gambar) sampai pengguna menyiapkan logo/screenshot.