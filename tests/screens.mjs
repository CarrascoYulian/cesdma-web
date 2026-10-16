// Capturas de pantalla en varios dispositivos: node tests/screens.mjs [url] [outDir]
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:4321';
const out = process.argv[3] || 'test-results/screens';
const fs = await import('node:fs');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const sizes = [
  ['movil-pequeno', 360, 740],
  ['movil', 390, 844],
  ['tableta', 820, 1180],
  ['portatil', 1366, 768],
  ['escritorio', 1920, 1080],
];
const pages = (process.argv[4] || '/').split(',');
for (const p of pages) {
  for (const [name, w, h] of sizes) {
    // Movimiento reducido: la captura de página completa muestra el estado final.
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await page.goto(base + p, { waitUntil: 'networkidle' });
    // Fuerza la aparición de todos los elementos animados para la captura completa.
    await page.evaluate(() => document.querySelectorAll('.will-reveal').forEach((e) => e.classList.add('is-visible')));
    await page.waitForTimeout(400);
    const slug = p === '/' ? 'inicio' : p.replace(/\//g, '_').replace(/^_|_$/g, '');
    await page.screenshot({ path: `${out}/${slug}-${name}.png`, fullPage: true });
    await page.close();
  }
}
await browser.close();
console.log('ok');
