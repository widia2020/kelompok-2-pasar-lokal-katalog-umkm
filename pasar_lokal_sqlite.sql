-- =========================================================
-- PASAR LOKAL — Database Katalog Produk UMKM Aceh
-- Kelompok 2 — Tugas Akhir Pemrograman Web 1
-- Kompatibel dengan: SQLite
-- =========================================================

DROP TABLE IF EXISTS pesanan;
DROP TABLE IF EXISTS produk;

-- ---------------------------------------------------------
-- Tabel: produk
-- ---------------------------------------------------------
CREATE TABLE produk (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_produk   TEXT NOT NULL,
  kategori      TEXT NOT NULL,
  harga         INTEGER NOT NULL,
  stok_jumlah   INTEGER NOT NULL DEFAULT 0,
  stok          TEXT NOT NULL,          -- 'Tersedia' / 'Habis'
  penjual       TEXT NOT NULL,
  deskripsi     TEXT,
  gambar        TEXT,
  best_seller   INTEGER NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------
-- Tabel: pesanan (untuk halaman "Pesan")
-- ---------------------------------------------------------
CREATE TABLE pesanan (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_pembeli  TEXT NOT NULL,
  no_hp         TEXT NOT NULL,
  produk_id     INTEGER NOT NULL,
  jumlah        INTEGER NOT NULL,
  total_harga   INTEGER NOT NULL,
  status        TEXT NOT NULL DEFAULT 'Diproses',
  dibuat_pada   TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (produk_id) REFERENCES produk(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------
-- Data produk (12 produk UMKM khas Aceh)
-- ---------------------------------------------------------
INSERT INTO produk
  (id, nama_produk, kategori, harga, stok_jumlah, stok, penjual, deskripsi, gambar, best_seller)
VALUES
  (1,  'Keripik Pisang Sale Aceh',  'Makanan',   15000, 42, 'Tersedia', 'Warung Pisang Bu Cut',
       'Keripik pisang tipis renyah, digoreng dengan minyak kelapa dan diberi taburan gula aren khas Aceh.',
       'img/keripik-pisang.svg', 1),

  (2,  'Kopi Sanger Gayo',          'Minuman',   18000, 30, 'Tersedia', 'Kedai Kupi Gayo',
       'Racikan kopi robusta Gayo dengan susu kental manis, diaduk khas gaya sanger warung kopi Aceh.',
       'img/kopi-sanger.svg', 1),

  (3,  'Tas Anyaman Pandan Aceh',   'Kerajinan', 95000, 12, 'Tersedia', 'Kerajinan Ibu Ratna',
       'Tas anyaman dari daun pandan kering pilihan, dianyam manual dengan motif tradisional Aceh.',
       'img/tas-anyaman.svg', 0),

  (4,  'Kain Kerawang Gayo',        'Fashion',  250000,  0, 'Habis',    'Tenun Gayo Lestari',
       'Kain bermotif kerawang Gayo dengan sulaman benang emas, cocok untuk acara adat maupun formal.',
       'img/kain-kerawang.svg', 0),

  (5,  'Meuseukat Khas Aceh',       'Makanan',   35000, 20, 'Tersedia', 'Dapur Meuseukat Bunda',
       'Kue tradisional Aceh berbahan dasar nanas dan telur, digulung dan dihias motif bunga.',
       'img/meuseukat.svg', 1),

  (6,  'Es Timun Serut Aceh',       'Minuman',   10000,  0, 'Habis',    'Kedai Segar Banda Aceh',
       'Minuman segar dari timun suri serut, sirup merah, dan es serut, favorit saat berbuka puasa.',
       'img/es-timun.svg', 0),

  (7,  'Sirup Markisa Aceh',        'Minuman',   32000, 25, 'Tersedia', 'Home Industri Bu Nur',
       'Sirup markisa asli tanpa pengawet berlebih, cocok untuk minuman segar sehari-hari maupun acara keluarga.',
       'img/sirup-markisa.svg', 0),

  (8,  'Kerupuk Melinjo Aceh',      'Makanan',   22000,  0, 'Habis',    'UD Melinjo Jaya',
       'Kerupuk melinjo tipis dan gurih, digoreng garing, cocok jadi camilan maupun pelengkap makan.',
       'img/kerupuk-melinjo.svg', 0),

  (9,  'Tikar Pandan Aceh',         'Kerajinan', 120000,  8, 'Tersedia', 'Kerajinan Ibu Ratna',
       'Tikar anyaman pandan dengan motif kotak-kotak khas, kuat dan nyaman untuk lantai maupun lapak.',
       'img/tikar-pandan.svg', 0),

  (10, 'Peci Songkok Aceh',         'Fashion',   65000, 17, 'Tersedia', 'Konveksi Barokah',
       'Peci beludru hitam dengan bordir emas halus, biasa dipakai untuk acara resmi dan keagamaan.',
       'img/peci-songkok.svg', 0),

  (11, 'Gelang Rencong Aceh',       'Kerajinan', 28000,  0, 'Habis',    'Souvenir Aceh Kreatif',
       'Gelang unik dengan liontin mini berbentuk rencong, cocok jadi oleh-oleh khas Aceh.',
       'img/gelang-rencong.svg', 0),

  (12, 'Kaos Motif Pintu Aceh',     'Fashion',   85000, 33, 'Tersedia', 'Distro Meukah Aceh',
       'Kaos katun combed dengan sablon motif ukiran Pintu Aceh, nyaman dipakai untuk kegiatan sehari-hari.',
       'img/kaos-pintu-aceh.svg', 1);
