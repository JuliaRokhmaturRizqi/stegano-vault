# 🕵️‍♂️ Stegano-Vault

**Stegano-Vault** adalah aplikasi web berbasis React.js yang menerapkan teknik **Steganografi LSB (Least Significant Bit)**. Aplikasi ini memungkinkan pengguna menyembunyikan pesan rahasia ke dalam citra digital tanpa merusak kualitas visual gambar tersebut.

Dibangun dengan antarmuka bertema **"Dokumen Rahasia / Detektif"**, proyek ini menggabungkan logika algoritma tingkat rendah (bitwise operation) dengan desain UI yang kreatif dan interaktif.

---

## ✨ Fitur Utama

1.  **Enkripsi Pesan (Encoding):** Menyisipkan teks ke dalam kanal warna RGB gambar.
2.  **Dekripsi Pesan (Decoding):** Membaca kembali pesan yang tersembunyi.
3.  **Proteksi Header (Magic Signature):** Menggunakan validasi header "STG" untuk memastikan gambar yang diunggah valid dan mencegah *output* sampah.
4.  **Privasi Terjamin:** Semua pemrosesan dilakukan di sisi klien (*Client-Side*) menggunakan HTML5 Canvas, gambar tidak pernah dikirim ke server.
5.  **Desain Responsif:** Tampilan optimal di Laptop maupun HP.

---

## 🧠 Algoritma & Logika

Proyek ini menggunakan manipulasi bit pada level piksel:

* **Penyisipan:** Menggunakan operasi **Bitwise AND** (`& 254`) untuk mengosongkan bit terakhir, lalu **Bitwise OR** (`|`) untuk mengisi bit pesan.
* **Ekstraksi:** Menggunakan operasi **Bitwise AND** (`& 1`) untuk mengambil bit terakhir dari setiap piksel.
* **Struktur Data:** `[HEADER "STG"] + [PESAN ASLI] + [TERMINATOR NULL]`

---

## 🛠️ Teknologi yang Digunakan

* **React.js + Vite:** Framework UI yang cepat dan modern.
* **HTML5 Canvas API:** Untuk manipulasi data piksel (`Uint8ClampedArray`).
* **CSS3 Custom:** Desain tema "Top Secret Dossier" tanpa framework CSS eksternal.

---

## 🚀 Cara Menjalankan

1.  Clone repositori ini:
    `git clone https://github.com/username/stegano-vault.git`
2.  Masuk ke folder:
    `cd stegano-vault`
3.  Install library:
    `npm install`
4.  Jalankan server lokal:
    `npm run dev`

---

**Dibuat oleh Julia**
Mahasiswa Informatika - Semester 6