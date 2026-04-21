const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    durum: "Çalışıyor",
    mesaj: "ExpressJS ile sunucu uyanık!",
    zaman: new Date().toISOString()
  });
});

// Sunucunun RAM kullanımı gibi basit bilgileri görmek istersen
app.get('/sistem', (req, res) => {
  const usage = process.memoryUsage();
  res.json({
    ram_kullanimi: `${Math.round(usage.rss / 1024 / 1024 * 100) / 100} MB`,
    uptime: `${Math.round(process.uptime())} saniye`
  });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda hazır.`);
});
