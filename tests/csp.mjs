/**
 * Comprueba que el sitio funciona con la Content-Security-Policy de producción
 * (public/_headers). Uso: con `npm run preview` en marcha, `node tests/csp.mjs`.
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const BASE = process.env.BASE_URL || 'http://localhost:4321';
const csp = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8')
  .match(/Content-Security-Policy: (.*)/)[1]
  .replace('upgrade-insecure-requests', ''); // localhost es http
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const p = await b.newPage();
const errs = [];
p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 160)));
await p.route(BASE + '/**', async (r) => {
  const res = await r.fetch();
  r.fulfill({ response: res, headers: { ...res.headers(), 'content-security-policy': csp } });
});
for (const u of ['/', '/servicios/', '/servicios/holter/', '/privacidad/']) await p.goto(BASE + u, { waitUntil: 'networkidle' });
await p.goto(BASE + '/', { waitUntil: 'networkidle' });
await p.locator('[data-filter="laboratorio"]').click();
const n = await p.locator('.services__grid > li:not([hidden])').count();
await b.close();
console.log(errs.length === 0 && n === 1 ? '✓ CSP sin bloqueos y scripts operativos' : `✗ ${n} servicios; errores: ${errs.join(' | ')}`);
process.exit(errs.length === 0 && n === 1 ? 0 : 1);
