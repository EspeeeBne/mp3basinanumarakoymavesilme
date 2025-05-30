const fs     = require('fs').promises;
const path   = require('path');
const prompt = require('prompt-sync')({ sigint: true });

const targetDir = prompt('📂 Lütfen temizlenecek klasör yolunu girin: ');
if (!targetDir) {
console.error('🚫 Hata: klasör yolu boş olamaz');
process.exit(1);
}

;(async () => {
try {
    const files = await fs.readdir(targetDir);
    for (const file of files) {
    if (path.extname(file).toLowerCase() !== '.mp3') continue;
    const cleaned = file.replace(/^\d+[\-._\s]*/g, '');
    if (cleaned === file) continue;
    await fs.rename(
        path.join(targetDir, file),
        path.join(targetDir, cleaned)
    );
    console.log(`✔ ${file} → ${cleaned}`);
    }
} catch (err) {
    console.error('❌ Hata:', err.message);
}
})();
