/* ============================================================
   PASAR LOKAL — Katalog Produk UMKM
   Kelompok 2 — Tugas Akhir Pemrograman Web 1
   ============================================================ */

// Fallback data (dipakai kalau fetch data-produk.json gagal,
// misalnya saat file dibuka langsung tanpa web server / CORS lokal)
const FALLBACK_DATA = [
  {"id":1,"namaProduk":"Keripik Pisang Sale Aceh","kategori":"Makanan","harga":15000,"stokJumlah":42,"stok":"Tersedia","penjual":"Warung Pisang Bu Cut","deskripsi":"Keripik pisang tipis renyah, digoreng dengan minyak kelapa dan diberi taburan gula aren khas Aceh.","gambar":"img/keripik-pisang.svg","bestSeller":true},
  {"id":2,"namaProduk":"Kopi Sanger Gayo","kategori":"Minuman","harga":18000,"stokJumlah":30,"stok":"Tersedia","penjual":"Kedai Kupi Gayo","deskripsi":"Racikan kopi robusta Gayo dengan susu kental manis, diaduk khas gaya sanger warung kopi Aceh.","gambar":"img/kopi-sanger.svg","bestSeller":true},
  {"id":3,"namaProduk":"Tas Anyaman Pandan Aceh","kategori":"Kerajinan","harga":95000,"stokJumlah":12,"stok":"Tersedia","penjual":"Kerajinan Ibu Ratna","deskripsi":"Tas anyaman dari daun pandan kering pilihan, dianyam manual dengan motif tradisional Aceh.","gambar":"img/tas-anyaman.svg","bestSeller":false},
  {"id":4,"namaProduk":"Kain Kerawang Gayo","kategori":"Fashion","harga":250000,"stokJumlah":0,"stok":"Habis","penjual":"Tenun Gayo Lestari","deskripsi":"Kain bermotif kerawang Gayo dengan sulaman benang emas, cocok untuk acara adat maupun formal.","gambar":"img/kain-kerawang.svg","bestSeller":false},
  {"id":5,"namaProduk":"Meuseukat Khas Aceh","kategori":"Makanan","harga":35000,"stokJumlah":20,"stok":"Tersedia","penjual":"Dapur Meuseukat Bunda","deskripsi":"Kue tradisional Aceh berbahan dasar nanas dan telur, digulung dan dihias motif bunga.","gambar":"img/meuseukat.svg","bestSeller":true},
  {"id":6,"namaProduk":"Es Timun Serut Aceh","kategori":"Minuman","harga":10000,"stokJumlah":0,"stok":"Habis","penjual":"Kedai Segar Banda Aceh","deskripsi":"Minuman segar dari timun suri serut, sirup merah, dan es serut, favorit saat berbuka puasa.","gambar":"img/es-timun.svg","bestSeller":false},
  {"id":7,"namaProduk":"Sirup Markisa Aceh","kategori":"Minuman","harga":32000,"stokJumlah":25,"stok":"Tersedia","penjual":"Home Industri Bu Nur","deskripsi":"Sirup markisa asli tanpa pengawet berlebih, cocok untuk minuman segar sehari-hari maupun acara keluarga.","gambar":"img/sirup-markisa.svg","bestSeller":false},
  {"id":8,"namaProduk":"Kerupuk Melinjo Aceh","kategori":"Makanan","harga":22000,"stokJumlah":0,"stok":"Habis","penjual":"UD Melinjo Jaya","deskripsi":"Kerupuk melinjo tipis dan gurih, digoreng garing, cocok jadi camilan maupun pelengkap makan.","gambar":"img/kerupuk-melinjo.svg","bestSeller":false},
  {"id":9,"namaProduk":"Tikar Pandan Aceh","kategori":"Kerajinan","harga":120000,"stokJumlah":8,"stok":"Tersedia","penjual":"Kerajinan Ibu Ratna","deskripsi":"Tikar anyaman pandan dengan motif kotak-kotak khas, kuat dan nyaman untuk lantai maupun lapak.","gambar":"img/tikar-pandan.svg","bestSeller":false},
  {"id":10,"namaProduk":"Peci Songkok Aceh","kategori":"Fashion","harga":65000,"stokJumlah":17,"stok":"Tersedia","penjual":"Konveksi Barokah","deskripsi":"Peci beludru hitam dengan bordir emas halus, biasa dipakai untuk acara resmi dan keagamaan.","gambar":"img/peci-songkok.svg","bestSeller":false},
  {"id":11,"namaProduk":"Gelang Rencong Aceh","kategori":"Kerajinan","harga":28000,"stokJumlah":0,"stok":"Habis","penjual":"Souvenir Aceh Kreatif","deskripsi":"Gelang unik dengan liontin mini berbentuk rencong, cocok jadi oleh-oleh khas Aceh.","gambar":"img/gelang-rencong.svg","bestSeller":false},
  {"id":12,"namaProduk":"Kaos Motif Pintu Aceh","kategori":"Fashion","harga":85000,"stokJumlah":33,"stok":"Tersedia","penjual":"Distro Meukah Aceh","deskripsi":"Kaos katun combed dengan sablon motif ukiran Pintu Aceh, nyaman dipakai untuk kegiatan sehari-hari.","gambar":"img/kaos-pintu-aceh.svg","bestSeller":true}
];

let PRODUCTS = [];
let cart = []; // { id, namaProduk, harga, gambar, qty, stokJumlah }

const state = { search: "", kategori: "Semua", stok: "Semua" };

// ---------- Util ----------
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2400);
}
function findProduct(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

// ---------- Mode Gelap (Malam) / Terang (Pagi) ----------
// Tema awal sudah diset lebih dulu oleh script kecil di <head> (index.html)
// supaya tidak ada "kedipan" warna saat halaman baru dimuat. Di sini kita
// hanya menyinkronkan ikon tombol dan menangani klik untuk berpindah tema.
const THEME_KEY = "pl-tema";
const themeToggleBtn = document.getElementById("themeToggle");
const themeIconEl = document.getElementById("themeIcon");

function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyThemeIcon(tema) {
  if (themeIconEl) themeIconEl.textContent = tema === "dark" ? "☀️" : "🌙";
  if (themeToggleBtn) {
    const label = tema === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap";
    themeToggleBtn.setAttribute("aria-label", label);
    themeToggleBtn.title = label;
  }
}

applyThemeIcon(getCurrentTheme());

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const temaBaru = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", temaBaru);
    try { localStorage.setItem(THEME_KEY, temaBaru); } catch (e) {}
    applyThemeIcon(temaBaru);
    showToast(temaBaru === "dark" ? "Mode gelap (malam) diaktifkan 🌙" : "Mode terang (pagi) diaktifkan ☀️");
  });
}

// ---------- Navigasi 6 Halaman ----------
const pages = ["beranda", "produk", "keranjang", "pesan", "tentang", "kelompok"];

function showPage(name) {
  if (!pages.includes(name)) name = "beranda";
  pages.forEach(p => document.getElementById("page-" + p).classList.toggle("active", p === name));
  document.querySelectorAll("[data-page]").forEach(a => a.classList.toggle("active", a.getAttribute("data-page") === name));
  document.getElementById("mainNav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showPage(link.getAttribute("data-page"));
  });
});
document.querySelectorAll("[data-goto]").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.getAttribute("data-goto")));
});
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});

// ---------- Load Data ----------
async function loadProducts() {
  try {
    const res = await fetch("data-produk.json");
    if (!res.ok) throw new Error("Gagal memuat data-produk.json");
    PRODUCTS = await res.json();
  } catch (err) {
    console.warn("Fetch data-produk.json gagal, menggunakan data cadangan. (" + err.message + ")");
    PRODUCTS = FALLBACK_DATA;
  }
  renderStats();
  renderBestSeller();
  renderProductSelect();
  renderProducts();
}

// ---------- Statistik Beranda ----------
function renderStats() {
  const totalProduk = PRODUCTS.length;
  const totalStok = PRODUCTS.reduce((sum, p) => sum + (p.stokJumlah || 0), 0);
  const totalKategori = new Set(PRODUCTS.map(p => p.kategori)).size;
  const totalPenjual = new Set(PRODUCTS.map(p => p.penjual)).size;

  document.getElementById("statRow").innerHTML = `
    <div class="stat-box"><span class="num">${totalProduk}</span><span class="lbl">Produk Terdaftar</span></div>
    <div class="stat-box"><span class="num">${totalStok}</span><span class="lbl">Total Stok Tersedia</span></div>
    <div class="stat-box"><span class="num">${totalKategori}</span><span class="lbl">Kategori Produk</span></div>
    <div class="stat-box"><span class="num">${totalPenjual}</span><span class="lbl">UMKM Bergabung</span></div>
  `;
}

// ---------- Kartu Produk (dipakai di Beranda & Produk) ----------
function productCardHTML(p) {
  const habis = p.stokJumlah <= 0;
  return `
    <article class="card">
      <div class="card-media">
        <img src="${p.gambar}" alt="${p.namaProduk}" loading="lazy">
        ${p.bestSeller ? `<div class="best-badge">Best<br>Seller</div>` : ""}
        <span class="stock-pill ${habis ? 'habis' : 'tersedia'}">${habis ? 'Habis' : 'Tersedia'}</span>
      </div>
      <div class="card-body">
        <span class="card-kategori">${p.kategori}</span>
        <h3>${p.namaProduk}</h3>
        <p class="card-desc">${p.deskripsi}</p>
        <p class="card-penjual">Penjual: <b>${p.penjual}</b></p>
        <p class="card-stock-qty">Sisa stok: <b>${p.stokJumlah}</b> unit</p>
        <div class="card-footer">
          <span class="price mono">${formatRupiah(p.harga)}</span>
          <button class="add-btn" data-add-cart="${p.id}" ${habis ? 'disabled' : ''}>
            🧺 ${habis ? 'Habis' : 'Tambah'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function bindAddToCartButtons(container) {
  container.querySelectorAll("[data-add-cart]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.getAttribute("data-add-cart")));
  });
}

function renderBestSeller() {
  const grid = document.getElementById("bestSellerGrid");
  const list = PRODUCTS.filter(p => p.bestSeller);
  grid.innerHTML = list.map(productCardHTML).join("");
  bindAddToCartButtons(grid);
}

// ---------- Render Produk (Halaman Produk, dengan search & filter) ----------
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchSearch = p.namaProduk.toLowerCase().includes(state.search.toLowerCase());
    const matchKategori = state.kategori === "Semua" || p.kategori === state.kategori;
    const stokStatus = p.stokJumlah > 0 ? "Tersedia" : "Habis";
    const matchStok = state.stok === "Semua" || stokStatus === state.stok;
    return matchSearch && matchKategori && matchStok;
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const list = getFilteredProducts();
  document.getElementById("resultCount").innerHTML = `Menampilkan <strong>${list.length}</strong> dari ${PRODUCTS.length} produk`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="stamp-decor-static">Tidak<br>Ditemukan</div>
        <h3>Produk tidak ditemukan</h3>
        <p>Coba kata kunci lain atau ubah filter kategori/stok.</p>
      </div>`;
    return;
  }
  grid.innerHTML = list.map(productCardHTML).join("");
  bindAddToCartButtons(grid);
}

// ---------- Search (di Beranda & di Produk) ----------
function applySearch(value) {
  state.search = value.trim();
  showPage("produk");
  document.getElementById("searchInput").value = state.search;
  renderProducts();
}
document.getElementById("searchFormHero").addEventListener("submit", e => {
  e.preventDefault();
  applySearch(document.getElementById("searchInputHero").value);
});
document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  state.search = document.getElementById("searchInput").value.trim();
  renderProducts();
});
document.getElementById("searchInput").addEventListener("input", e => {
  state.search = e.target.value.trim();
  renderProducts();
});

// ---------- Filter Chips ----------
document.querySelectorAll("[data-filter-kategori]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter-kategori]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.kategori = btn.getAttribute("data-filter-kategori");
    renderProducts();
  });
});
document.querySelectorAll("[data-filter-stok]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter-stok]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.stok = btn.getAttribute("data-filter-stok");
    renderProducts();
  });
});

// ---------- Form Pemesanan (Fitur Wajib 18–20) ----------
function renderProductSelect() {
  const select = document.getElementById("produkPilih");
  const options = PRODUCTS.map(p =>
    `<option value="${p.id}" ${p.stokJumlah <= 0 ? 'disabled' : ''}>${p.namaProduk} — ${formatRupiah(p.harga)}${p.stokJumlah <= 0 ? ' (Habis)' : ' (Stok: ' + p.stokJumlah + ')'}</option>`
  ).join("");
  select.innerHTML = `<option value="">-- Pilih salah satu produk --</option>` + options;
}
function setFieldError(fieldId, isInvalid) {
  document.getElementById(fieldId).classList.toggle("invalid", isInvalid);
}

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("namaPembeli").value.trim();
  const hp = document.getElementById("noHp").value.trim();
  const produkId = document.getElementById("produkPilih").value;
  const jumlah = parseInt(document.getElementById("jumlahPesan").value, 10);

  let valid = true;
  const namaValid = nama.length > 0;
  setFieldError("fieldNama", !namaValid); if (!namaValid) valid = false;

  const hpValid = hp.length > 0 && /^[0-9]+$/.test(hp);
  setFieldError("fieldHp", !hpValid); if (!hpValid) valid = false;

  const produkValid = produkId !== "";
  setFieldError("fieldProduk", !produkValid); if (!produkValid) valid = false;

  const jumlahValid = Number.isInteger(jumlah) && jumlah >= 1;
  setFieldError("fieldJumlah", !jumlahValid); if (!jumlahValid) valid = false;

  if (!valid) { showToast("Periksa kembali data pesanan Anda."); return; }

  const produk = findProduct(produkId);
  if (jumlah > produk.stokJumlah) {
    setFieldError("fieldJumlah", true);
    document.querySelector("#fieldJumlah .field-error").textContent = `Stok tersisa hanya ${produk.stokJumlah} unit.`;
    showToast("Jumlah melebihi stok yang tersedia.");
    return;
  }

  const total = produk.harga * jumlah;
  document.getElementById("receiptBody").innerHTML = `
    <div class="receipt-row"><span>Pembeli</span><span>${nama}</span></div>
    <div class="receipt-row"><span>No. HP</span><span>${hp}</span></div>
    <div class="receipt-row"><span>Produk</span><span>${produk.namaProduk}</span></div>
    <div class="receipt-row"><span>Harga Satuan</span><span>${formatRupiah(produk.harga)}</span></div>
    <div class="receipt-row"><span>Jumlah</span><span>${jumlah}</span></div>
    <div class="receipt-row total"><span>Total Bayar</span><span>${formatRupiah(total)}</span></div>
  `;
  document.getElementById("receiptStamp").classList.add("show");

  dbInsertPesanan({
    namaPembeli: nama,
    noHp: hp,
    produkId: produk.id,
    namaProduk: produk.namaProduk,
    jumlah: jumlah,
    totalHarga: total
  });
  renderDbTable();

  showToast("Pesanan berhasil dibuat dan disimpan ke database!");
});

["namaPembeli", "noHp", "produkPilih", "jumlahPesan"].forEach((id, idx) => {
  const fieldIds = ["fieldNama", "fieldHp", "fieldProduk", "fieldJumlah"];
  document.getElementById(id).addEventListener("input", () => setFieldError(fieldIds[idx], false));
});

// ---------- "Database" Pesanan (localStorage) ----------
// Menyimpan data pesanan secara nyata di browser, dengan struktur kolom
// yang sama persis dengan tabel `pesanan` pada database/pasar_lokal_*.sql
// (id, nama_pembeli, no_hp, produk_id, nama_produk, jumlah, total_harga,
//  status, dibuat_pada). Data ini tersimpan permanen di localStorage,
// tidak hilang meskipun halaman di-refresh atau browser ditutup.
const DB_KEY = "pasarLokal_pesananDB";

function dbGetAll() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Gagal membaca database pesanan:", e);
    return [];
  }
}
function dbSaveAll(rows) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(rows));
  } catch (e) {
    console.error("Gagal menyimpan database pesanan:", e);
  }
}
function dbNextId(rows) {
  return rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;
}
function dbInsertPesanan({ namaPembeli, noHp, produkId, namaProduk, jumlah, totalHarga }) {
  const rows = dbGetAll();
  rows.push({
    id: dbNextId(rows),
    namaPembeli,
    noHp,
    produkId,
    namaProduk,
    jumlah,
    totalHarga,
    status: "Diproses",
    dibuatPada: new Date().toLocaleString("id-ID")
  });
  dbSaveAll(rows);
  return rows;
}
function dbClearAll() {
  localStorage.removeItem(DB_KEY);
}

function renderDbTable() {
  const tbody = document.getElementById("dbTableBody");
  if (!tbody) return;
  const rows = dbGetAll().slice().reverse(); // terbaru di atas

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="db-empty">Belum ada data pesanan.</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td class="mono">${r.id}</td>
      <td>${r.namaPembeli}</td>
      <td class="mono">${r.noHp}</td>
      <td>${r.namaProduk}</td>
      <td class="mono">${r.jumlah}</td>
      <td class="mono">${formatRupiah(r.totalHarga)}</td>
      <td><span class="db-status">${r.status}</span></td>
      <td class="mono">${r.dibuatPada}</td>
    </tr>
  `).join("");
}

function sqlEscape(str) {
  return String(str).replace(/'/g, "''");
}

function downloadDatabaseSql() {
  const rows = dbGetAll();
  if (rows.length === 0) {
    showToast("Belum ada data pesanan untuk diunduh.");
    return;
  }

  let sql = `-- =========================================================\n`;
  sql += `-- PASAR LOKAL — Ekspor Database Pesanan\n`;
  sql += `-- Diunduh otomatis dari localStorage browser pada ${new Date().toLocaleString("id-ID")}\n`;
  sql += `-- Struktur tabel mengikuti database/pasar_lokal_mysql.sql\n`;
  sql += `-- =========================================================\n\n`;
  sql += `INSERT INTO pesanan (id, nama_pembeli, no_hp, produk_id, jumlah, total_harga, status, dibuat_pada) VALUES\n`;
  sql += rows.map(r =>
    `  (${r.id}, '${sqlEscape(r.namaPembeli)}', '${sqlEscape(r.noHp)}', ${r.produkId}, ${r.jumlah}, ${r.totalHarga}, '${sqlEscape(r.status)}', '${sqlEscape(r.dibuatPada)}')`
  ).join(",\n");
  sql += ";\n";

  const blob = new Blob([sql], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pesanan_export.sql";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Database pesanan berhasil diunduh (.sql).");
}

document.getElementById("downloadDbBtn").addEventListener("click", downloadDatabaseSql);
document.getElementById("clearDbBtn").addEventListener("click", () => {
  if (dbGetAll().length === 0) { showToast("Riwayat pesanan sudah kosong."); return; }
  if (confirm("Kosongkan seluruh riwayat pesanan di database ini? Tindakan ini tidak bisa dibatalkan.")) {
    dbClearAll();
    renderDbTable();
    showToast("Riwayat pesanan berhasil dikosongkan.");
  }
});

["cartNamaPembeli", "cartNoHp"].forEach((id, idx) => {
  const fieldIds = ["fieldCartNama", "fieldCartHp"];
  document.getElementById(id).addEventListener("input", () => setFieldError(fieldIds[idx], false));
});

// ---------- Keranjang Simulasi (Halaman 3) ----------
function addToCart(id) {
  const produk = findProduct(id);
  if (!produk || produk.stokJumlah <= 0) return;

  const existing = cart.find(item => item.id === produk.id);
  const currentQty = existing ? existing.qty : 0;

  if (currentQty + 1 > produk.stokJumlah) {
    showToast(`Stok "${produk.namaProduk}" hanya tersisa ${produk.stokJumlah} unit.`);
    return;
  }

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: produk.id, namaProduk: produk.namaProduk, harga: produk.harga, gambar: produk.gambar, qty: 1, stokJumlah: produk.stokJumlah });
  }
  renderCart();
  showToast(`"${produk.namaProduk}" ditambahkan ke keranjang.`);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === Number(id));
  if (!item) return;
  if (delta > 0 && item.qty + 1 > item.stokJumlah) {
    showToast(`Stok "${item.namaProduk}" hanya tersisa ${item.stokJumlah} unit.`);
    return;
  }
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== Number(id));
  renderCart();
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== Number(id));
  renderCart();
}

function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const summaryBox = document.getElementById("cartSummaryBox");
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("navCartCount").textContent = totalCount;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty">Keranjang masih kosong.<br>Tambahkan produk dari halaman Produk.</div>`;
    summaryBox.style.display = "none";
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.gambar}" alt="${item.namaProduk}">
      <div class="cart-item-info">
        <h4>${item.namaProduk}</h4>
        <span>${formatRupiah(item.harga)} x ${item.qty} = ${formatRupiah(item.harga * item.qty)}</span>
        <div class="qty-ctrl">
          <button data-qty-minus="${item.id}" aria-label="Kurangi jumlah">−</button>
          <span class="mono">${item.qty}</span>
          <button data-qty-plus="${item.id}" aria-label="Tambah jumlah">+</button>
          <button class="remove-item" data-remove="${item.id}">Hapus</button>
        </div>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum, i) => sum + i.harga * i.qty, 0);
  document.getElementById("cartItemCount").textContent = totalCount;
  document.getElementById("cartTotal").textContent = formatRupiah(total);
  summaryBox.style.display = "block";

  cartItemsEl.querySelectorAll("[data-qty-plus]").forEach(b => b.addEventListener("click", () => changeQty(b.getAttribute("data-qty-plus"), 1)));
  cartItemsEl.querySelectorAll("[data-qty-minus]").forEach(b => b.addEventListener("click", () => changeQty(b.getAttribute("data-qty-minus"), -1)));
  cartItemsEl.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => removeFromCart(b.getAttribute("data-remove"))));
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return;

  const nama = document.getElementById("cartNamaPembeli").value.trim();
  const hp = document.getElementById("cartNoHp").value.trim();

  let valid = true;
  const namaValid = nama.length > 0;
  setFieldError("fieldCartNama", !namaValid); if (!namaValid) valid = false;

  const hpValid = hp.length > 0 && /^[0-9]+$/.test(hp);
  setFieldError("fieldCartHp", !hpValid); if (!hpValid) valid = false;

  if (!valid) {
    showToast("Isi nama dan nomor HP yang valid untuk checkout.");
    return;
  }

  // Simpan setiap item keranjang sebagai satu baris ke database pesanan
  cart.forEach(item => {
    dbInsertPesanan({
      namaPembeli: nama,
      noHp: hp,
      produkId: item.id,
      namaProduk: item.namaProduk,
      jumlah: item.qty,
      totalHarga: item.harga * item.qty
    });
  });

  renderDbTable();
  showToast(`Checkout berhasil! ${cart.length} item pesanan disimpan ke database.`);

  cart = [];
  document.getElementById("cartNamaPembeli").value = "";
  document.getElementById("cartNoHp").value = "";
  renderCart();
});

// Tampilkan riwayat pesanan saat halaman pertama kali dimuat
renderDbTable();

// ---------- Init ----------
loadProducts();
