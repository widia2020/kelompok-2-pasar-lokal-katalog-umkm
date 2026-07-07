-- =========================================================
-- PASAR LOKAL — Database Katalog Produk UMKM Aceh
-- Kelompok 2 — Tugas Akhir Pemrograman Web 1
-- Kompatibel dengan: MySQL / MariaDB
-- =========================================================

CREATE DATABASE IF NOT EXISTS pasar_lokal
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE pasar_lokal;

-- ---------------------------------------------------------
-- Tabel: produk
-- ---------------------------------------------------------
DROP TABLE IF EXISTS produk;
CREATE TABLE produk (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nama_produk   VARCHAR(150) NOT NULL,
  kategori      VARCHAR(50)  NOT NULL,
  harga         INT UNSIGNED NOT NULL,
  stok_jumlah   INT UNSIGNED NOT NULL DEFAULT 0,
  stok          VARCHAR(20)  NOT NULL,          -- 'Tersedia' / 'Habis'
  penjual       VARCHAR(150) NOT NULL,
  deskripsi     TEXT,
  gambar        VARCHAR(255),
  best_seller   TINYINT(1)   NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Tabel: pesanan (untuk halaman "Pesan")
-- ---------------------------------------------------------
DROP TABLE IF EXISTS pesanan;
CREATE TABLE pesanan (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nama_pembeli  VARCHAR(150) NOT NULL,
  no_hp         VARCHAR(20)  NOT NULL,
  produk_id     INT NOT NULL,
  jumlah        INT UNSIGNED NOT NULL,
  total_harga   INT UNSIGNED NOT NULL,
  status        VARCHAR(20)  NOT NULL DEFAULT 'Diproses',
  dibuat_pada   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pesanan_produk
    FOREIGN KEY (produk_id) REFERENCES produk(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

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

-- ---------------------------------------------------------
-- Query contoh yang mungkin berguna
-- ---------------------------------------------------------
-- Semua produk Best Seller:
--   SELECT * FROM produk WHERE best_seller = 1;
--
-- Produk berdasarkan kategori:
--   SELECT * FROM produk WHERE kategori = 'Makanan';
--
-- Produk yang tersedia saja:
--   SELECT * FROM produk WHERE stok = 'Tersedia';
--
-- Riwayat pesanan lengkap dengan nama produk:
--   SELECT p.id, p.nama_pembeli, p.no_hp, pr.nama_produk, p.jumlah, p.total_harga, p.status
--   FROM pesanan p
--   JOIN produk pr ON pr.id = p.produk_id
--   ORDER BY p.dibuat_pada DESC;
