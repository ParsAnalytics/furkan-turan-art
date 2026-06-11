// ===================================================
// KAMPANYA KODU ÜRETİCİ — Firebase'e 10.000 kod yazar
// Kullanım: node generate-codes.js
// Önce: npm install firebase-admin
// ===================================================

const admin = require('firebase-admin');

// ⚠️ Firebase Console'dan indirdiğiniz service account JSON dosyasının yolunu girin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Benzersiz kod üretici: "FT-XXXXX" formatı
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Karışabilecek karakterler çıkarıldı (0,O,1,I)
  let code = 'FT-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function generateAndUploadCodes(totalCodes = 10000) {
  console.log(`\n🎨 Furkan Turan Art — Kampanya Kodu Üreticisi`);
  console.log(`📦 ${totalCodes} adet kod üretiliyor...\n`);

  const codes = new Set();
  while (codes.size < totalCodes) {
    codes.add(generateCode());
  }

  const codeArray = Array.from(codes);
  const BATCH_SIZE = 500; // Firestore max batch size
  const batches = [];

  for (let i = 0; i < codeArray.length; i += BATCH_SIZE) {
    batches.push(codeArray.slice(i, i + BATCH_SIZE));
  }

  console.log(`📋 ${batches.length} toplu yazma işlemi başlıyor...`);

  let uploaded = 0;
  for (let b = 0; b < batches.length; b++) {
    const batch = db.batch();
    for (const code of batches[b]) {
      const ref = db.collection('kampanya-kodlari').doc(code);
      batch.set(ref, {
        kullanildi: false,
        olusturulma: admin.firestore.FieldValue.serverTimestamp()
      });
    }
    await batch.commit();
    uploaded += batches[b].length;
    const percent = Math.round((uploaded / totalCodes) * 100);
    process.stdout.write(`\r⏳ İlerleme: ${uploaded}/${totalCodes} (${percent}%)`);
  }

  console.log(`\n\n✅ Tamamlandı! ${totalCodes} kod Firestore'a yüklendi.`);
  console.log(`📁 Koleksiyon: kampanya-kodlari`);
  console.log(`🔑 Örnek kodlar: ${codeArray.slice(0, 5).join(', ')}\n`);

  // Kodları bir txt dosyasına da yaz (WhatsApp için kopyala-yapıştır)
  const fs = require('fs');
  fs.writeFileSync('kampanya-kodlari.txt', codeArray.join('\n'));
  console.log(`💾 Tüm kodlar "kampanya-kodlari.txt" dosyasına da kaydedildi.\n`);

  process.exit(0);
}

generateAndUploadCodes(10000).catch(err => {
  console.error('❌ Hata:', err);
  process.exit(1);
});
