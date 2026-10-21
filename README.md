# Portofolio Ananda Fahreza Najeri

Website portofolio akademik, jurnalistik, dan publikasi karya tulis dengan Eleventy, Markdown, Decap CMS, GitHub, dan Vercel. Antarmuka menggunakan bahasa Indonesia dan pendekatan editorial minimalis.

> **Status proyek:** source code dan build lokal disiapkan untuk dapat dijalankan. Dashboard CMS memerlukan Site ID Decap Turbo dan koneksi repositori milik pemilik. Deployment publik, autentikasi, domain produksi, dan verifikasi Google Search Console belum dilakukan dari proyek ini.

## Fitur

- Halaman beranda, profil penulis, arsip karya, halaman artikel individual, dan 404.
- HTML statis hasil build Eleventy. Isi utama artikel tersedia tanpa JavaScript di browser.
- Artikel disimpan sebagai Markdown dengan front matter.
- Dashboard Decap CMS untuk membuat dan mengedit artikel, mengelola metadata SEO, kategori, tag, kata kunci, gambar, sumber, dan profil penulis.
- Decap Turbo `turbo-github` untuk autentikasi terkelola. CMS tidak memuat antarmuka editor ketika Site ID masih berupa placeholder.
- Editorial workflow untuk draft, review, dan publikasi melalui branch/pull request GitHub.
- Pencarian dan filter kategori di arsip karya.
- Title tag, meta description, canonical, Open Graph, Twitter Card, JSON-LD `Person`, `WebSite`, `BlogPosting`, `BreadcrumbList`, `robots.txt`, dan sitemap XML.
- Desain responsif, skip link, navigasi keyboard, status hasil pencarian, dan dukungan reduced motion.
- SVG orisinal untuk monogram, ilustrasi editorial, dan social card. Tidak menggunakan library ikon.

## 1. Kebutuhan lokal

- Node.js 20 LTS atau versi stabil yang kompatibel dengan Eleventy 3.
- npm.
- Git untuk mengirim source code ke GitHub.

Periksa versi:

```bash
node --version
npm --version
```

## 2. Menjalankan di komputer lokal

Dari folder proyek:

```bash
npm install
npm run start
```

Buka `http://localhost:8080`. Untuk membuat hasil build tanpa menjalankan server:

```bash
npm run build
```

Hasil website statis tersimpan di `_site/`. Folder ini dibuat otomatis dan tidak perlu dimasukkan ke repositori Git.

Secara lokal, canonical menggunakan `http://localhost:8080`. Jangan mengirim hasil build lokal ke produksi. Vercel akan meminta `SITE_URL` agar metadata produksi tidak memakai URL placeholder.

## 3. Struktur proyek

```text
.
├── admin/
│   ├── config.yml              # Konfigurasi Decap CMS dan backend Turbo
│   └── index.html              # Dashboard dengan pemeriksaan konfigurasi
├── assets/
│   ├── images/                 # SVG orisinal
│   └── uploads/                # Media yang diunggah melalui CMS
├── css/site.css                # Gaya responsif
├── js/site.js                  # Menu seluler, pencarian, filter arsip
├── scripts/clean.js
├── src/
│   ├── _data/site.js           # Identitas dan URL situs
│   ├── _includes/
│   │   ├── layouts/            # Layout utama, artikel, profil
│   │   └── partials/           # Header, footer, kartu artikel
│   ├── karya/                  # Sumber Markdown artikel
│   ├── profil.md               # Data profil yang dapat diedit lewat CMS
│   ├── index.njk               # Beranda
│   ├── arsip.njk               # Arsip karya di /karya/
│   ├── 404.njk
│   ├── robots.njk
│   └── sitemap.njk
├── .env.example
├── .gitignore
├── eleventy.config.js
├── package.json
├── vercel.json
└── README.md
```

## 4. Mengatur URL produksi

File `src/_data/site.js` membaca environment variable `SITE_URL`. Vercel build akan gagal dengan pesan yang jelas jika variable ini belum diatur. Ini sengaja dibuat agar canonical dan sitemap tidak diam-diam memakai domain contoh.

Setelah proyek Vercel dibuat, buka **Project Settings → Environment Variables** dan tambahkan:

- Name: `SITE_URL`
- Value: URL HTTPS produksi yang benar, misalnya `https://nama-proyek-anda.vercel.app`
- Environment: Production. Jika ingin preview deployment dapat dibangun, atur variable ini juga untuk Preview. Canonical di preview tetap mengarah ke URL produksi.

Jangan menggunakan URL preview yang berubah-ubah sebagai URL kanonis produksi. Setelah mengubah variable, jalankan redeploy.

## 5. Mengunggah ke GitHub

1. Buat atau masuk ke akun GitHub.
2. Buat repositori baru, misalnya `ananda-fahreza-najeri`. Pilih branch utama `main`.
3. Jika draft atau naskah belum terbit perlu dirahasiakan, gunakan repositori **private**. Branch draft di repositori publik dapat dibaca publik.
4. Unggah **isi folder proyek** ke root repositori. Jangan mengunggah file ZIP sebagai satu file.
5. Pastikan `package.json`, `eleventy.config.js`, `vercel.json`, folder `src/`, dan folder `admin/` berada di root repositori.
6. Commit dan push ke branch `main`.

Contoh jika Git tersedia di komputer:

```bash
git init
git add .
git commit -m "Build portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Ganti `USERNAME` dan `REPOSITORY` dengan alamat repositori milik Anda.

## 6. Deployment di Vercel

1. Buat atau masuk ke akun Vercel.
2. Pilih **Add New → Project**, lalu impor repositori GitHub.
3. Pastikan pengaturan build mengikuti `vercel.json`:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: `_site`
4. Setelah URL produksi proyek ditentukan, tambahkan environment variable `SITE_URL` seperti dijelaskan pada bagian sebelumnya. Jika build pertama gagal karena variable belum ada, tambahkan variable lalu jalankan redeploy.
5. Deploy branch `main`.
6. Buka URL produksi dan uji beranda, `/profil/`, `/karya/`, `/404.html`, `/robots.txt`, dan `/sitemap.xml`.
7. Setiap commit baru pada branch produksi akan memicu build/deployment otomatis sesuai integrasi Git Vercel.

Domain khusus bersifat opsional. Subdomain `vercel.app` sudah cukup untuk memulai jika tersedia bagi proyek Anda.

## 7. Mengaktifkan dashboard Decap CMS

Dashboard berada di `/admin/`. File CMS sengaja belum dianggap aktif sampai Site ID diisi dan integrasi eksternal selesai.

### A. Membuat site di Decap Turbo

1. Buka dokumentasi dan dashboard resmi [Decap Turbo](https://decapcms.org/turbo/), lalu buat akun.
2. Buat organisasi atau gunakan organisasi yang sudah tersedia.
3. Buka bagian **Git connection** dan instal Decap Turbo GitHub App pada akun/organisasi GitHub yang memiliki repositori website. Batasi akses aplikasi hanya ke repositori yang diperlukan.
4. Buat site baru di Decap Turbo dengan provider GitHub, repositori yang benar, branch `main`, dan config path `admin/config.yml`.
5. Pada **Admin interface URL(s)**, masukkan URL dashboard produksi, misalnya `https://nama-proyek-anda.vercel.app/admin/`. Tambahkan origin lokal jika memang diperlukan untuk pengujian lokal.
6. Simpan site dan salin **Site ID** dari tab Overview.

### B. Memasukkan Site ID

1. Buka `admin/config.yml` di repositori.
2. Ganti nilai berikut dengan Site ID yang disalin dari Decap Turbo:

```yaml
backend:
  name: turbo-github
  turbo_site_id: REPLACE_WITH_DECAP_TURBO_SITE_ID
  branch: main
```

3. Commit dan push perubahan ke GitHub.
4. Pastikan deployment Vercel berhasil.
5. Berikan akses kepada akun editor yang sesuai melalui pengaturan anggota Decap Turbo.
6. Buka `/admin/`. Jika konfigurasi masih berisi placeholder atau Site ID bukan UUID, halaman akan menampilkan petunjuk konfigurasi dan tidak memuat antarmuka CMS. Setelah Site ID yang benar dimasukkan, Decap CMS akan dimuat dan menampilkan proses login Turbo.

Site ID bukan token rahasia, tetapi tetap harus sesuai dengan site, repo, branch, dan URL admin yang terdaftar di Decap Turbo. Jangan menambahkan password, GitHub token, client secret, atau kredensial pribadi ke `config.yml` atau source code.

### C. Alur penerbitan

- Buat artikel melalui koleksi **Karya Tulis**.
- Lengkapi judul, deskripsi SEO, abstrak, tanggal, kategori, tag, kata kunci, gambar, isi, dan sumber.
- Simpan sebagai draft melalui **Editorial Workflow**.
- Periksa perubahan pada branch/pull request yang dibuat Decap CMS.
- Tinjau preview deployment jika tersedia, lalu setujui dan gabungkan perubahan ketika siap diterbitkan.
- Setelah perubahan masuk ke `main`, Vercel membangun ulang website. Artikel dengan `published: true` muncul di arsip dan sitemap.

Kolom **Tampilkan di arsip publik** mengatur apakah artikel masuk arsip dan sitemap. Jika dimatikan, halaman tetap dapat dihasilkan dan diberi `noindex`; pengaturan itu **bukan kontrol akses** untuk konten rahasia. Gunakan editorial workflow dan repositori private untuk melindungi draft yang belum boleh dibaca publik.

## 8. Mengelola konten

### Artikel

Artikel disimpan di `src/karya/` sebagai Markdown dengan front matter. CMS membuat file Markdown baru di folder ini. Template membentuk URL berdasarkan nama file, misalnya:

`src/karya/strategi-literasi-digital.md` → `/karya/strategi-literasi-digital/`

Untuk artikel yang terbit, pastikan `published: true`. Artikel dengan nilai `false` tidak masuk koleksi arsip dan sitemap serta mendapat meta robots `noindex, nofollow`.

### Profil penulis

Profil dapat diperbarui dari **Halaman Website → Profil Penulis** di CMS. Pendidikan, pengalaman, biografi, minat, dan tautan profesional hanya perlu diisi jika datanya akurat. Nilai awal adalah placeholder yang sengaja ditampilkan dengan jelas, bukan klaim tentang riwayat pemilik.

### Gambar

CMS menyimpan unggahan pada `assets/uploads/` dan mengaksesnya melalui `/assets/uploads/`. Isi alt text untuk gambar yang membawa informasi. Jangan menaruh file rahasia di folder media publik.

### Contoh artikel

`src/karya/contoh-artikel.md` adalah naskah uji template. Statusnya `published: false`, sehingga tidak masuk arsip atau sitemap. Sebelum peluncuran, ganti dengan karya yang memang akan dipublikasikan atau hapus file tersebut.

## 9. SEO dan Google Search Console

Fondasi SEO yang disiapkan:

- Title dan meta description per halaman.
- URL deskriptif dan canonical berdasarkan `SITE_URL`.
- Metadata Open Graph dan Twitter Card.
- JSON-LD `Person` dan `WebSite`, serta `BlogPosting` dan `BreadcrumbList` untuk artikel.
- `robots.txt` dan `sitemap.xml` otomatis dari konten yang terbit.
- Artikel yang tidak terbit dikecualikan dari arsip dan sitemap.
- Konten utama dihasilkan sebagai HTML statis.

Setelah domain produksi aktif:

1. Buka [Google Search Console](https://search.google.com/search-console/about).
2. Tambahkan properti Domain atau URL prefix. Verifikasi kepemilikan sesuai metode yang dipilih Google.
3. Buka bagian **Sitemaps** dan kirim `https://nama-proyek-anda.vercel.app/sitemap.xml`.
4. Gunakan **URL Inspection** untuk memeriksa beranda, halaman profil, arsip, dan artikel yang telah terbit.
5. Pantau laporan Pages/Indexing serta Performance untuk melihat impresi, klik, dan kueri.
6. Perbaiki masalah canonical, status HTTP, metadata, tautan rusak, atau konten tipis jika ditemukan.

Google tidak menjamin waktu crawling, indexing, atau posisi peringkat tertentu. Structured data membantu mesin pencari memahami konten, tetapi tidak menjamin rich results.

## 10. Pengujian dan pemecahan masalah

Jalankan build lokal:

```bash
npm install
SITE_URL=https://example.com npm run build
```

Pada Windows PowerShell, gunakan:

```powershell
$env:SITE_URL="https://example.com"; npm run build
```

Periksa file hasil build:

- `_site/index.html`
- `_site/profil/index.html`
- `_site/karya/index.html`
- `_site/karya/contoh-artikel/index.html`
- `_site/admin/index.html`
- `_site/robots.txt`
- `_site/sitemap.xml`
- `_site/404.html`

Jika CMS belum bisa login, periksa Site ID, konfigurasi site di Decap Turbo, GitHub App installation, branch, config path, dan URL admin yang terdaftar. Jangan menaruh token di browser untuk mengatasi masalah autentikasi.

Jika deployment gagal, buka **Vercel → Project → Deployments → Build Logs**. Pastikan `SITE_URL` sudah diatur dan build command/output directory benar.

## 11. Catatan keamanan dan batasan

- Halaman `/admin/` adalah shell dashboard statis. Login dan operasi repository ditangani backend Decap Turbo setelah dikonfigurasi; `noindex` bukan autentikasi.
- URL Site ID di konfigurasi bukan rahasia autentikasi. Jangan menambahkan token atau password ke source code.
- File artikel dengan `published: false` tetap dihasilkan sebagai halaman noindex. Jangan menyimpan data sensitif di dalamnya.
- Gunakan repositori private jika draft harus tetap privat sebelum digabungkan.
- Pastikan URL produksi dan Site ID diganti sebelum website digunakan.
- Deployment belum dijalankan dari akun GitHub/Vercel pemilik, sehingga tidak ada klaim bahwa website publik, CMS, atau Search Console sudah aktif.
- Core Web Vitals perlu diukur setelah deployment melalui PageSpeed Insights atau Lighthouse. Tidak ada skor performa yang diklaim tanpa pengujian nyata.

## 12. Referensi dokumentasi resmi

- [Eleventy: dokumentasi](https://www.11ty.dev/docs/)
- [Decap CMS: GitHub backend](https://decapcms.org/docs/github-backend/)
- [Decap Turbo: Getting started](https://decapcms.org/docs/turbo-getting-started/)
- [Decap Turbo: Connecting a site](https://decapcms.org/docs/turbo-connecting-a-site/)
- [Decap CMS: Editorial workflows](https://decapcms.org/docs/editorial-workflows/)
- [Vercel: dokumentasi](https://vercel.com/docs)
- [Google Search Central: sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
