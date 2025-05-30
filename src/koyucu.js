const fs     = require('fs').promises;
const path   = require('path');
const prompt = require('prompt-sync')({ sigint: true });

const targetDir = prompt('📂 Lütfen numaralandırılacak klasör yolunu girin: ');
if (!targetDir) {
console.error('🚫 Hata: klasör yolu boş olamaz');
process.exit(1);
}

;(async () => {
try {
    let files = await fs.readdir(targetDir);
    files = files
    .filter(f => path.extname(f).toLowerCase() === '.mp3')
    .sort((a, b) => a.localeCompare(b, 'tr'));

    for (let i = 0; i < files.length; i++) {
    const oldName = files[i];
    const newName = `${i + 1} - ${oldName}`;
    await fs.rename(
        path.join(targetDir, oldName),
        path.join(targetDir, newName)
    );
    console.log(`✔ ${oldName} → ${newName}`);
    }
} catch (err) {
    console.error('❌ Hata:', err.message);
}
})();
