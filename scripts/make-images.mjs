// Genera public/og-image.png (1200x630) a partir de scripts/assets/og.html.
// Los iconos (favicon, apple-touch-icon) se generan desde public/brand/emblema.png.
// Uso: node scripts/make-images.mjs   (requiere Playwright + Chromium)
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(path.join(root, 'scripts/assets/og.html')).href);
await page.screenshot({ path: path.join(root, 'public/og-image.png') });
await browser.close();
console.log('Imagen OG generada.');
