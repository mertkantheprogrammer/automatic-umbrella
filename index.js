const express = require('express');
const app = express();

// Sunucu paneli portu genellikle ortam değişkeni olarak atar.
// Eğer atamazsa varsayılan olarak 3000 portunu kullanır.
const PORT = process.env.PORT || 3000;

// Ana dizin: Sunucu panelinin "Readiness Probe" kontrolü için 200 OK dönmeli.
app.get('/', (req, res) => {
  res.status(200).json({
    durum: "Aktif",
    mesaj: "Sunucu başarıyla ayağa kalktı!",
    zaman: new Date().toLocaleString('tr-TR')
  });
});

// Sistem bilgilerini görmek için: /sistem
app.get('/sistem', (req, res) => {
  const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
  res.json({
    ram_kullanimi: memoryUsage.toFixed(2) + " MB",
    uptime: Math.floor(process.uptime()) + " saniye",
    platform: process.platform,
    node_version: process.version
  });
});

// ÖNEMLİ: '0.0.0.0' yazmazsan Docker konteyneri dış isteklere cevap vermez.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Uygulama ${PORT} portu üzerinde dinleniyor...`);
});
