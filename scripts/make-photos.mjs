// Optimiza las fotos ilustrativas (src/data/photos.ts) para la web.
// Entrada: una carpeta con <nombre>.jpg (originales descargados del banco).
// Salida: public/img/<nombre>-<ancho>.webp, recortadas a 3:2.
//   - hero-*: 800, 1400 y 2000 px (banner del inicio)
//   - resto:  480 y 800 px   (tarjetas de servicio)
// Uso: node scripts/make-photos.mjs <carpeta-originales>
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const src = process.argv[2];
if (!src) {
  console.error('Uso: node scripts/make-photos.mjs <carpeta-originales>');
  process.exit(1);
}
const out = path.resolve(import.meta.dirname, '../public/img');
fs.mkdirSync(out, { recursive: true });

for (const f of fs.readdirSync(src).filter((f) => f.endsWith('.jpg'))) {
  const name = f.replace(/\.jpg$/, '');
  const hero = name.startsWith('hero-');
  const widths = hero ? [800, 1400, 2000] : [480, 800];
  for (const w of widths) {
    const file = path.join(out, `${name}-${w}.webp`);
    await sharp(path.join(src, f))
      .rotate()
      .resize(w, Math.round((w * 2) / 3), { fit: 'cover', position: 'centre' })
      .webp({ quality: hero ? 86 : 74, effort: 6 })
      .toFile(file);
    console.log(path.relative(process.cwd(), file), Math.round(fs.statSync(file).size / 1024) + ' KB');
  }
}
