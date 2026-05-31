# FIKTI Room 📱

Aplikasi mobile untuk menampilkan ketersediaan ruangan dan status kehadiran dosen secara real-time di Fakultas Ilmu Komputer dan Teknologi Informasi (FIKTI) Universitas Muhammadiyah Sumatera Utara (UMSU).

---

## 📋 Deskripsi

FIKTI Room memungkinkan mahasiswa memantau status ruang kelas (dosen masuk/tidak/menunggu) tanpa harus datang langsung ke ruangan. Relator Kelas dapat mengonfirmasi kehadiran dosen melalui tombol yang tersedia di detail ruangan.

---

## 🏗️ Arsitektur

Proyek ini menggunakan pola **MVC (Model-View-Controller)**:

```
www/
├── index.html                  # Struktur HTML (semua screen)
├── css/
│   └── style.css               # Seluruh styling aplikasi
└── js/
    ├── model/
    │   └── RoomModel.js        # Data & logika bisnis
    ├── view/
    │   └── RoomView.js         # Manipulasi DOM & render UI
    ├── controller/
    │   └── AppController.js    # Event handler & koordinasi MVC
    └── app.js                  # Entry point
```

| Layer | File | Tanggung Jawab |
|-------|------|----------------|
| **Model** | `RoomModel.js` | Menyimpan data ruangan, dosen, status; menyediakan fungsi update |
| **View** | `RoomView.js` | Render kartu ruangan, detail, toast, perpindahan screen |
| **Controller** | `AppController.js` | Menangani klik user, memanggil Model & View |

---

## ✨ Fitur

- **Splash Screen** — animasi loading saat aplikasi dibuka
- **Pemilihan Peran** — Relator Kelas atau Mahasiswa
- **Dashboard** — statistik aktif/menunggu/kosong + grid ruangan per lantai
- **Detail Ruangan** — info lengkap dosen, mata kuliah, waktu, status
- **Konfirmasi Kehadiran** — Relator dapat mengubah status (Dosen Masuk / Tidak Masuk)
- **Toast Notifikasi** — konfirmasi perubahan status
- **Read-only untuk Mahasiswa** — tidak bisa mengubah status

### Status Ruangan

| Status | Warna | Keterangan |
|--------|-------|------------|
| Dosen Masuk | 🟢 Hijau | Dosen telah hadir |
| Menunggu | 🟡 Kuning | Ada jadwal, belum dikonfirmasi |
| Dosen Tidak Masuk | 🔴 Merah | Dosen tidak hadir |
| Kosong | ⚫ Abu-abu | Tidak ada jadwal |

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** v14 atau lebih baru → [nodejs.org](https://nodejs.org)
- **Java JDK 17** → [adoptium.net](https://adoptium.net)
- **Android SDK** (via Android Studio) → [developer.android.com](https://developer.android.com/studio)
- **Cordova CLI**

### 1. Clone Repository

```bash
git clone https://github.com/<username>/fikti-room.git
cd fikti-room
```

### 2. Install Cordova

```bash
npm install -g cordova
```

### 3. Install Dependensi

```bash
npm install
```

### 4. Tambahkan Platform Android

```bash
cordova platform add android
```

### 5. Tambahkan Plugin

```bash
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-whitelist
```

### 6. Jalankan di Emulator / Device

```bash
# Emulator
cordova emulate android

# Device (USB Debugging aktif)
cordova run android
```

### 7. Build APK (Release)

```bash
cordova build android --release
```

APK tersimpan di:
```
platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

---

## 🌐 Menjalankan di Browser (Preview)

Untuk preview cepat tanpa build Android:

```bash
cordova platform add browser
cordova run browser
```

Atau buka langsung `www/index.html` di browser.

---

## 📁 Struktur Lengkap Proyek

```
fikti-room/
├── config.xml          # Konfigurasi Cordova (nama app, plugin, SDK)
├── package.json        # Dependensi Node
├── .gitignore
├── README.md
└── www/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── model/
        │   └── RoomModel.js
        ├── view/
        │   └── RoomView.js
        ├── controller/
        │   └── AppController.js
        └── app.js
```

> **Catatan:** Folder `platforms/`, `plugins/`, dan `node_modules/` tidak di-commit ke Git karena di-generate otomatis oleh Cordova.

---

## 📊 Kriteria Penilaian yang Dipenuhi

| Aspek | Implementasi |
|-------|-------------|
| Framework Cordova | ✅ HTML/CSS/JS via Apache Cordova |
| Desain UI (Bagian 7) | ✅ Splash, Role, Dashboard, Detail, Toast |
| Status dinamis | ✅ Relator dapat mengubah status ruangan |
| Arsitektur MVC | ✅ Model / View / Controller terpisah |
| Dokumentasi README | ✅ File ini |

---

## 👨‍💻 Informasi Tugas

- **Mata Kuliah:** Mobile Apps
- **Dosen:** Mahardika Abdi Prawira Tanjung, M.Kom
- **Institusi:** FIKTI – Universitas Muhammadiyah Sumatera Utara
- **Tahun Akademik:** 2025/2026
