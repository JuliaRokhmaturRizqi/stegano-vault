// src/utils/steganography.js

// 1. Helper: Char ke Biner
const charToBinary = (char) => {
  return char.charCodeAt(0).toString(2).padStart(8, '0');
};

// 2. Helper: Teks ke Biner (+ Terminator)
export const textToBinary = (text) => {
  let binaryString = '';
  for (let i = 0; i < text.length; i++) {
    binaryString += charToBinary(text[i]);
  }
  binaryString += '00000000'; // Terminator
  return binaryString;
};

// 3. FUNGSI ENCODE (Menyisipkan)
export const encodeMessage = (imageSrc, message) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
   
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // --- LOGIKA HEADER ---
      // Tambahkan "STG" di depan pesan asli
      const fullMessage = "STG" + message;
      const binaryMessage = textToBinary(fullMessage);

      // Cek Kapasitas
      const totalPixels = data.length / 4;
      if (binaryMessage.length > totalPixels * 3) {
        reject("Pesan terlalu panjang untuk gambar ini!");
        return;
      }

      let binaryIndex = 0;

      // Loop Sekali Saja
      for (let i = 0; i < data.length; i++) {
        if (binaryIndex >= binaryMessage.length) break;
        if ((i + 1) % 4 === 0) continue; // Skip Alpha

        const currentBit = parseInt(binaryMessage[binaryIndex]);
        // Masukkan bit
        data[i] = (data[i] & 254) | currentBit;
        binaryIndex++;
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (e) => reject("Gagal memuat gambar, File mungkin rusak atau format tidak didukung browser.");
  });
};

// 4. FUNGSI DECODE (Membaca)
export const decodeMessage = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let binaryString = '';
      let decodedText = '';
      let tempBuffer = ''; // Untuk menyimpan "STG" sementara
      let isHeaderFound = false;

      // Loop Sekali Saja (LINEAR SCAN)
      for (let i = 0; i < data.length; i++) {
        // Skip Alpha
        if ((i + 1) % 4 === 0) continue;

        // Ambil LSB
        binaryString += (data[i] & 1).toString();

        // Setiap 8 bit
        if (binaryString.length === 8) {
          const charCode = parseInt(binaryString, 2);
          
          // --- LOGIKA PENGECEKAN HEADER ---
          if (!isHeaderFound) {
            // Kita sedang mencari "STG"
            tempBuffer += String.fromCharCode(charCode);
            
            // Cek setiap kelipatan 3 karakter
            if (tempBuffer.length === 3) {
                if (tempBuffer === "STG") {
                    isHeaderFound = true; // Header ketemu! Lanjut baca pesan.
                    decodedText = ""; // Reset untuk pesan asli
                } else {
                    resolve(null); // BUKAN GAMBAR STEGANO (Header salah)
                    return; 
                }
            }
          } 
          // --- LOGIKA MEMBACA PESAN ASLI ---
          else {
            if (charCode === 0) { // Terminator ketemu
                resolve(decodedText);
                return;
            }
            decodedText += String.fromCharCode(charCode);
          }

          binaryString = ''; // Reset binernya
        }
      }

      // Jika loop selesai tapi tidak ketemu terminator
      resolve(null); 
    };

    img.onerror = (e) => reject("Gagal memuat gambar, coba gunakan gambar lain.");
  });
};