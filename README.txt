PASAR LOKAL — Katalog Produk UMKM Aceh
Kelompok 2 — Tugas Akhir Pemrograman Web 1
========================================

ISI FOLDER
- index.html        -> halaman utama
- style.css          -> semua styling
- script.js          -> semua logika (render produk, search, filter, validasi form, keranjang)
- data-produk.json   -> data utama produk (id, namaProduk, kategori, harga, stok, penjual, deskripsi, gambar)
- img/               -> ilustrasi produk (SVG, tidak perlu internet)

CARA MENJALANKAN
Karena script.js memuat data-produk.json menggunakan fetch(), sebagian
browser (terutama Chrome) akan memblokir permintaan tersebut jika file
dibuka langsung dengan cara double-click (protokol file://). Ada 2 cara
menjalankannya:

1) CARA PALING MUDAH (tanpa server)
   Cukup buka index.html langsung di browser. Jika fetch gagal karena
   dibuka lewat file://, script.js otomatis memakai data cadangan
   (FALLBACK_DATA) yang isinya identik dengan data-produk.json, jadi
   website tetap berjalan normal.

2) CARA DIREKOMENDASIKAN (via server lokal, supaya fetch JSON asli jalan)
   - Jika pakai VS Code: install extension "Live Server", klik kanan
     index.html -> "Open with Live Server".
   - Atau lewat terminal (butuh Python terpasang):
       python -m http.server 8000
     lalu buka http://localhost:8000 di browser.

STRUKTUR 6 HALAMAN (BERANDA)
  1. Beranda   -> hero, statistik singkat, produk Best Seller
  2. Produk    -> etalase 12 produk lengkap dengan search & filter
  3. Keranjang -> daftar produk yang ditambahkan, ubah jumlah, checkout simulasi
  4. Pesan     -> form pemesanan sederhana + ringkasan pesanan
  5. Tentang   -> tema, latar belakang, dan target pengguna website
  6. Kelompok  -> data anggota Kelompok 2 (Widia Erika, Dina Syahirah, Liza Marfirah)

Navigasi ada di header (klik menu 1-6). Di layar kecil, menu bisa dibuka
lewat ikon hamburger (☰).

FITUR YANG SUDAH DIIMPLEMENTASI
Wajib:
  - Menampilkan produk dalam bentuk card (12 produk UMKM khas Aceh)
  - Pencarian produk berdasarkan nama (dari Beranda maupun halaman Produk)
  - Filter kategori: Makanan, Minuman, Kerajinan, Fashion
  - Filter stok: Tersedia, Habis (dihitung otomatis dari jumlah stok)
  - Form pemesanan sederhana (nama, no HP, produk, jumlah)
  - Validasi form: nama wajib, no HP wajib angka, produk wajib dipilih,
    jumlah minimal 1, dan tidak melebihi stok yang tersedia
  - Ringkasan pesanan otomatis tampil setelah form valid

Tambahan (opsional):
  - Format harga dalam Rupiah (Intl.NumberFormat)
  - Stok ditampilkan sebagai angka riil per produk (bukan cuma teks)
  - Halaman Keranjang penuh: tambah/kurangi jumlah, hapus item, total
    otomatis, checkout simulasi, dengan validasi tidak boleh melebihi stok
  - Label "Best Seller" pada produk tertentu + ditampilkan khusus di Beranda

CARA MENAMBAH / MENGUBAH PRODUK
Edit file data-produk.json, tambahkan objek baru dengan format yang
sama seperti data yang sudah ada. Gambar bisa ditaruh di folder img/
lalu tulis path-nya di properti "gambar".

DATABASE (folder database/)
Selain data-produk.json (dipakai langsung oleh website), folder ini
juga menyediakan versi database SQL dari data yang sama, untuk
keperluan tugas/laporan yang meminta struktur database (ERD, query,
dsb):

- pasar_lokal_mysql.sql   -> script untuk MySQL / MariaDB.
                             Import lewat phpMyAdmin, atau terminal:
                               mysql -u root -p < pasar_lokal_mysql.sql

- pasar_lokal_sqlite.sql  -> script yang sama, versi SQLite.

- pasar_lokal.sqlite      -> file database SQLite yang SUDAH JADI
                             (hasil generate dari script di atas), bisa
                             langsung dibuka pakai "DB Browser for SQLite"
                             tanpa perlu install/setup server apa pun.

Struktur tabel:
  produk  (id, nama_produk, kategori, harga, stok_jumlah, stok,
           penjual, deskripsi, gambar, best_seller)
  pesanan (id, nama_pembeli, no_hp, produk_id, jumlah, total_harga,
           status, dibuat_pada) -> terhubung ke tabel produk lewat
           foreign key produk_id, merepresentasikan data dari
           halaman "Pesan".

Catatan: website ini (index.html/script.js) tetap membaca DATA PRODUK
dari data-produk.json, BUKAN dari file database SQL — karena murni
HTML/CSS/JS tanpa server backend, browser tidak bisa konek langsung
ke MySQL/SQLite. File-file di folder database/ ini disediakan sebagai
representasi database terpisah (misalnya untuk dilampirkan di laporan
atau dipakai kalau nanti proyek ini dikembangkan dengan backend
seperti PHP/Node.js).

DATABASE PESANAN (BERJALAN NYATA DI BROWSER)
Berbeda dengan data produk, data PESANAN (checkout dari Keranjang
maupun submit dari halaman Pesan) benar-benar TERSIMPAN, menggunakan
localStorage bawaan browser sebagai "database" — bukan cuma tampilan
kosong. Strukturnya sama persis dengan tabel `pesanan` di file SQL:
  id, nama_pembeli, no_hp, produk_id, nama_produk, jumlah,
  total_harga, status, dibuat_pada

Cara kerjanya:
  - Isi Nama Pembeli & No HP di halaman Keranjang, lalu klik
    "Checkout (Simulasi)" -> setiap item di keranjang otomatis
    tersimpan sebagai satu baris data pesanan.
  - Mengisi & submit form di halaman Pesan juga tersimpan ke
    database yang sama.
  - Semua data yang tersimpan tampil di tabel "Riwayat Pesanan
    (Database)" di bagian bawah halaman Keranjang. Data ini tetap
    ada meskipun halaman di-refresh atau browser ditutup (karena
    disimpan di localStorage, per-browser/per-perangkat).
  - Tombol "Unduh Database (.sql)" mengekspor seluruh riwayat
    pesanan menjadi file pesanan_export.sql (statement INSERT INTO
    pesanan ...), siap diimpor ke MySQL/SQLite sungguhan atau
    dilampirkan ke laporan tugas.
  - Tombol "Kosongkan Riwayat" menghapus seluruh data pesanan dari
    localStorage (dipakai untuk reset saat demo/testing).
