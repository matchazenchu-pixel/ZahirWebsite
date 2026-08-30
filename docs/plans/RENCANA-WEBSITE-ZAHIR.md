# Rancangan Website Zahir Accounting Surabaya

**Status:** Disetujui pengguna — 28 Agustus 2026
**Tujuan:** Website multi-halaman modern pengganti `https://zahirsby.wordpress.com/` (blog distributor Zahir Accounting Surabaya yang terakhir diperbarui 2021).

## Keputusan yang sudah diambil

| Topik | Keputusan |
|---|---|
| Tujuan website | Marketing/katalog distributor Zahir Surabaya |
| Cakupan | Multi-halaman lengkap (produk, support, tips, promo, download, partner, kontak) |
| Nama edisi produk | Edisi LAMA: Small Business, Flexy Trade, Personal, Standart, Enterprise, Enterprise Plus, Online |
| Teknologi | HTML + CSS + JS murni, tanpa framework, tanpa build tool |
| Artikel blog lama | Tidak dipindahkan; Tips & Trik jadi placeholder |
| Desain | Modern 2025/2026 — gradient biru, kartu membulat, animasi halus, responsif |

## Arah desain modern

- Layout luas dengan whitespace, gradient biru Zahir, kartu sudut membulat + bayangan lembut.
- Font modern: Plus Jakarta Sans (Google Fonts), fallback sans-serif sistem.
- Hero besar dengan gradient, badge/tag fitur, ikon SVG, statistik (±100.000 pengguna, sejak 1996).
- Sticky navbar dengan efek blur (glassmorphism) saat di-scroll.
- Animasi fade-in/slide-up saat elemen masuk layar (IntersectionObserver), hover halus.
- Tombol mengambang WhatsApp di semua halaman.
- Mobile-first responsif: hamburger menu, grid adaptif, tabel perbandingan scroll horizontal di ponsel.
- Footer gelap; seksi selang-seling terang/gelap.

## Design tokens (CSS variables)

- Warna utama (biru Zahir): `#0d5bd8` — gelap `#0a3d8f`, terang/latar `#e8f0fe`.
- Aksen WhatsApp: `#25d366`.
- Teks: `#1a2233` (utama), `#5a6478` (sekunder).
- Latar: `#ffffff`, `#f5f8fc` (seksi selang-seling), `#0e1a2e` (footer/gelap).
- Radius kartu: 16px. Bayangan: `0 8px 24px rgba(13, 91, 216, .08)`.

## Struktur file

```
Website Zahir/
├── index.html                 # Beranda: hero, produk, keunggulan, statistik, CTA
├── css/style.css              # satu stylesheet bersama
├── js/main.js                 # menu mobile, animasi scroll, FAQ, form demo
├── img/                       # logo, ikon SVG, placeholder screenshot
├── produk/
│   ├── index.html             # Ringkasan + tabel perbandingan edisi
│   ├── small-business.html
│   ├── flexy-trade.html
│   ├── personal.html
│   ├── standart.html
│   ├── enterprise.html
│   ├── enterprise-plus.html
│   └── online.html
├── support/
│   ├── index.html             # Support Centre umum + FAQ accordion
│   ├── versi-5.html
│   └── versi-6.html
├── tips-trik/index.html       # placeholder modern
├── promo/index.html           # placeholder modern
├── download/index.html        # placeholder modern
├── partner/index.html         # placeholder modern
├── kontak/index.html          # kontak + formulir Permintaan Demo & Presentasi
└── docs/
    ├── plans/                 # rancangan ini + fase implementasi
    ├── riset-zahir.md
    └── konten-situs-lama.md   # sumber konten (dari situs lama)
```

## Konten per halaman

### Beranda
Hero gradient dengan judul + subjudul + CTA ganda (Chat WhatsApp 08117577444 & Jadwalkan Demo). Grid 7 kartu produk. Seksi keunggulan: user friendly, pengalaman sejak 1996, ±100.000 pengguna di Indonesia & Malaysia, ISO/IEC 27001. Seksi segmen industri: dagang & distribusi, jasa, manufaktur, kontraktor, ritel, nirlaba. CTA akhir.

### Halaman produk (7)
Masing-masing: posisi produk, target pengguna, daftar fitur persis dari `docs/konten-situs-lama.md`, ditampilkan sebagai kartu fitur berikon SVG. Bagian "screenshot fasilitas" berupa placeholder gambar (aset lama tidak tersedia). Tanpa harga — CTA ke WhatsApp/form demo. Detail konten per edisi ada di `docs/konten-situs-lama.md`.

### Ringkasan produk (produk/index.html)
Tabel perbandingan fitur antar 7 edisi + rekomendasi edisi per jenis usaha.

### Support Centre
Pengantar support Zahir versi 5 & 6, FAQ dengan accordion interaktif, CTA kontak. Detail teknis ditambahkan belakangan (placeholder terisi sebagian).

### Tips & Trik, Promo & Event, Update & Download, Partner
Halaman placeholder dengan desain tetap modern, teks "konten sedang diperbarui", dan CTA ke kontak/WhatsApp.

### Kontak
- Dua alamat: Jl. Klampis Harapan I No 10 Blok AA7 Surabaya; Jl. Dharmahusada Indahutara VI Blok U No.315, Mulyorejo, Surabaya 60115.
- Telepon 031-5910 444; WhatsApp 08117577444 (link wa.me/628117577444).
- Email: zahirsby@gmail.com, sby@zahiraccounting.com.
- Google Maps embed koordinat -7.267656, 112.780361.
- Formulir "Permintaan Demo & Presentasi": Nama Perusahaan, Email, Contact Person, Nomor Tlp/Hp, Jenis Usaha, Alamat. Tanpa backend — submit merangkai pesan lalu membuka WhatsApp (fallback mailto). Cara menambah backend dicatat di README bila perlu nanti.

## Elemen bersama

- **Navbar:** Beranda, Produk (dropdown 7 edisi + ringkasan), Support Centre, Tips & Trik, Promo, Download, Partner, Kontak. Sticky + blur saat scroll; hamburger di mobile.
- **Footer (gelap):** alamat, telepon/WA, email, sosial media (Facebook, Twitter/X, LinkedIn, YouTube), hak cipta dengan tahun otomatis.
- **Tombol mengambang WhatsApp** di semua halaman.

## Yang disiapkan pengguna nanti (tidak menghambat)

Logo Zahir Surabaya dan screenshot produk (sementara pakai placeholder), konten detail support & tips, daftar partner.