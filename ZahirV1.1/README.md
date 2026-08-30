# Website Zahir Accounting Surabaya

Website statis multi-halaman pengganti `https://zahirsby.wordpress.com/`. Dibangun dengan HTML + CSS + JavaScript murni — tanpa framework dan tanpa build tool.

## Cara membuka

Buka file `index.html` langsung di browser (double-click), atau jalankan server lokal agar semua fitur bekerja optimal:

```bash
# Jika punya Python
python -m http.server 8000

# Jika punya Node.js
npx serve .
```

Lalu buka `http://localhost:8000`.

## Struktur

| Direktori | Isi |
|---|---|
| `index.html` | Beranda (hero, grid produk, keunggulan, statistik, CTA) |
| `css/style.css` | Satu stylesheet bersama (design tokens, komponen, responsif) |
| `js/main.js` | Menu mobile, efek scroll navbar, animasi reveal, accordion FAQ, form demo, tahun footer |
| `produk/` | `index.html` (perbandingan) + 7 halaman edisi: Small Business, Flexy Trade, Personal, Standart, Enterprise, Enterprise Plus, Online |
| `support/` | Pusat bantuan + halaman Versi 5 & Versi 6 |
| `tips-trik/`, `promo/`, `download/`, `partner/` | Placeholder "konten sedang diperbarui" |
| `kontak/` | Info kontak, peta Google Maps, formulir Permintaan Demo & Presentasi |
| `docs/` | Riset (`riset-zahir.md`, `konten-situs-lama.md`) dan rencana (`plans/`) |

## Formulir demo

Formulir di `kontak/index.html` saat ini **mengirim data ke WhatsApp** (wa.me/628117577444) — data form dirangkai menjadi pesan teks lalu membuka WhatsApp pengguna. Ini solusi tanpa backend yang langsung bekerja.

Jika nanti ingin pengiriman ke email/database sungguhan, beberapa opsi tanpa mengubah banyak kode:

1. **Formspree / Getform** — ganti atribut `action` form ke endpoint layanan mereka; tanpa kode tambahan.
2. **Google Apps Script** — buat Web App sederhana yang menerima POST dan menulis ke Google Sheets.
3. **Backend sendiri (PHP/Node)** — tambah file handler dan arahkan `action` form ke sana; logika validasi di `js/main.js` bisa dipertahankan.

## Yang masih perlu disiapkan (konten)

- Logo resmi Zahir Surabaya (saat ini pakai kotak "Z" sederhana di `.logo-kotak` — ganti dengan `<img>`).
- Screenshot produk untuk halaman produk (placeholder sudah disiapkan).
- Isi halaman Tips & Trik, Promo & Event, Update & Download, dan Partner bila konten sudah ada.
- Tautan sosial media yang tepat (saat ini masih mengarah ke halaman umum facebook.com / twitter.com / linkedin.com / youtube.com).

## Hosting

Karena sepenuhnya statis, website ini bisa di-hosting gratis di:

- **GitHub Pages** — push repo ini, aktifkan Pages.
- **Netlify / Vercel** — drag & drop folder, langsung online.
- **Hosting biasa (cPanel)** — unggah semua file ke `public_html`.