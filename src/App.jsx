import React, { useState } from 'react';
import './App.css';
import { encodeMessage, decodeMessage } from './utils/steganography';

const SteganoVault = () => {
  // --- STATE HALAMAN DEPAN ---
  const [accessGranted, setAccessGranted] = useState(false); // Default: Belum masuk

  // --- STATE APLIKASI UTAMA ---
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [resultImage, setResultImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- FUNGSI TRANSISI ---
  const handleEnterSystem = () => {
    setAccessGranted(true); // Buka pintu masuk
  };

  // --- FUNGSI APLIKASI ---
  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setImage(null);
    setResultImage(null);
    setMessage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setResultImage(null);
      setMessage(''); 
    }
  };

  const handleProcess = async () => {
    if (!image) return alert("Upload gambar bukti dulu, Agen!");
    
    setIsProcessing(true);

    try {
      if (mode === 'encrypt') {
        if (!message) {
            setIsProcessing(false);
            return alert("Pesan rahasia tidak boleh kosong!");
        }
        const encodedImageURL = await encodeMessage(image, message);
        setResultImage(encodedImageURL);
        alert("Enkripsi Berhasil. Data aman.");
      } 
      else {
        const secretMessage = await decodeMessage(image);
        if (secretMessage) {
          setMessage(secretMessage);
          alert("Pesan RAHSIA ditemukan!");
        } else {
          setMessage("");
          alert("Negatif. Tidak ada pesan rahasia di gambar ini.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error Sistem: " + error);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- TAMPILAN 1: LANDING PAGE (TERAS RUMAH) ---
// ... (kode sebelumnya)

  // --- TAMPILAN 1: LANDING PAGE (TERAS RUMAH) ---
  if (!accessGranted) {
    return (
      <div className="landing-screen">
        <div className="folder-cover">
          <div className="stamp-mark">TOP SECRET</div>
          
          {/* --- BAGIAN BARU: GIF DETEKTIF --- */}
          {/* Ganti src di bawah ini dengan link GIF pilihanmu */}
          <div className="evidence-photo">
            <img 
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGQxc2tzZm5kdGlqOXg2dm92ZmFjcnZ1b3pzemh3bDVua2Z5ZHlzdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7UamMoBuFyMCpAyx0Y/giphy.gif" 
              alt="Evidence" 
            />
            <div className="paper-clip"></div> {/* Hiasan Klip Kertas */}
          </div>
          {/* ----------------------------------- */}

          <h2>PROJECT: STEGANO-VAULT</h2>
          <div className="file-info">
            <p><strong>CLEARANCE LEVEL:</strong> 6</p>
            <p><strong>AGENT:</strong> SHERLOCK</p> {/* Ubah nama agen sesukamu */}
            <p><strong>STATUS:</strong> CLASSIFIED</p>
          </div>
          
          <p className="warning-text">
            PERINGATAN: Akses tidak sah adalah pelanggaran federal.
            Hanya personel berwenang yang diizinkan membuka berkas ini.
          </p>
          
          <button className="btn-enter" onClick={handleEnterSystem}>
            [ BUKA BERKAS ]
          </button>
        </div>
      </div>
    );
  }

// ... (sisanya sama)

  // --- TAMPILAN 2: SISTEM UTAMA (RUMAH) ---
  return (
    <div className="container">
      {/* Tombol Back to Home (Opsional) */}
      <button className="btn-back" onClick={() => setAccessGranted(false)}>
        &larr; TUTUP BERKAS
      </button>

      <h1>🔐 Stegano-Vault</h1>
      <p>Sistem Komunikasi Rahasia Berbasis LSB.</p>

      <div className="tabs">
        <button 
          className={mode === 'encrypt' ? 'active' : ''} 
          onClick={() => handleModeSwitch('encrypt')}
        >
          ENKRIPSI
        </button>
        <button 
          className={mode === 'decrypt' ? 'active' : ''} 
          onClick={() => handleModeSwitch('decrypt')}
        >
          DEKRIPSI
        </button>
      </div>

      <div className="workspace">
        <div className="section">
          <h3>1. UPLOAD BUKTI (GAMBAR)</h3>
          <input 
            key={mode} 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          {image ? (
            <div className="image-preview">
              <img src={image} alt="Original" />
            </div>
          ) : (
             <div className="placeholder-box">
                <p>FILE KOSONG</p>
             </div>
          )}
        </div>

        <div className="section">
          <h3>2. OPERASI DATA</h3>
          <div className="input-group">
            <textarea
              rows="4"
              placeholder={mode === 'encrypt' ? "Ketik pesan rahasia di sini..." : "Hasil dekripsi akan muncul di sini..."}
              value={message}
              readOnly={mode === 'decrypt'} 
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button className="btn-action" onClick={handleProcess} disabled={isProcessing}>
            {isProcessing ? 'MEMPROSES...' : (mode === 'encrypt' ? '🔒 SEGEL PESAN' : '🔓 BUKA SEGEL')}
          </button>

          {resultImage && (
            <div className="result-box">
              <p>✅ DOKUMEN SIAP!</p>
              <img src={resultImage} alt="Result" className="result-img"/>
              <br/>
              <a href={resultImage} download="stegano_secret.png" className="btn-download">
                ⬇️ AMBIL DOKUMEN
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SteganoVault;