/**
 * Pruebas funcionales, de accesibilidad y SEO sobre el sitio compilado.
 *   npm run build && npm test
 * Variables: BASE_URL (por defecto arranca `astro preview` en :4322),
 *            CHROMIUM_PATH (ruta a Chromium si Playwright no lo encuentra).
 */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
let BASE = process.env.BASE_URL;
let server;
if (!BASE) {
  BASE = 'http://localhost:4322';
  server = spawn('npx', ['astro', 'preview', '--port', '4322'], { cwd: root, stdio: 'ignore' });
  for (let i = 0; i < 40; i++) {
    try { if ((await fetch(BASE)).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
}

const WA_NUMBER = '18095498560';
let pass = 0, fail = 0;
const results = [];
const check = (name, ok, detail = '') => {
  ok ? pass++ : fail++;
  results.push(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
};

// Páginas a partir de dist/
const pages = [];
const walk = (dir) => readdirSync(dir).forEach((f) => {
  const p = path.join(dir, f);
  if (statSync(p).isDirectory()) walk(p);
  else if (f === 'index.html') pages.push('/' + path.relative(path.join(root, 'dist'), path.dirname(p)).split(path.sep).join('/') + '/');
});
walk(path.join(root, 'dist'));
const urls = pages.map((p) => p.replace(/\/+/g, '/'));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
// Sin red externa: bloquea terceros para pruebas deterministas.
await ctx.route(/^(?!http:\/\/localhost)/, (r) => r.abort());

const titles = new Map();
const internalLinks = new Set();

for (const u of urls) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  const res = await page.goto(BASE + u, { waitUntil: 'networkidle' });
  check(`${u} responde 200`, res?.status() === 200, String(res?.status()));
  check(`${u} sin errores de consola`, errors.length === 0, errors.join(' | '));

  const seo = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    h1: document.querySelectorAll('h1').length,
    lang: document.documentElement.lang,
    og: !!document.querySelector('meta[property="og:image"]'),
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try { JSON.parse(s.textContent); return true; } catch { return false; }
    }),
  }));
  check(`${u} título y descripción`, seo.title.length > 10 && seo.desc.length > 50 && seo.desc.length <= 170, `${seo.title} (${seo.desc.length} car.)`);
  check(`${u} canonical, lang, OG`, seo.canonical.startsWith('http') && seo.lang === 'es-DO' && seo.og);
  check(`${u} un solo h1`, seo.h1 === 1, String(seo.h1));
  check(`${u} JSON-LD válido`, seo.ld.every(Boolean), `${seo.ld.length} bloque(s)`);
  if (titles.has(seo.title)) check(`${u} título único`, false, `repite ${titles.get(seo.title)}`);
  titles.set(seo.title, u);

  // Enlaces
  const links = await page.$$eval('a', (as) => as.map((a) => ({ href: a.getAttribute('href') ?? '', target: a.target, rel: a.rel, text: (a.textContent || a.getAttribute('aria-label') || '').trim() })));
  const bad = links.filter((l) => !l.href || l.href === '#' || l.href.startsWith('javascript:'));
  check(`${u} sin enlaces vacíos o decorativos`, bad.length === 0, bad.map((b) => b.text).join(', '));
  const nameless = links.filter((l) => !l.text);
  check(`${u} todos los enlaces tienen nombre`, nameless.length === 0);
  const wa = links.filter((l) => l.href.startsWith('https://wa.me/'));
  const waBad = wa.filter((l) => {
    const url = new URL(l.href);
    const text = url.searchParams.get('text') ?? '';
    return url.pathname !== `/${WA_NUMBER}` || !text.startsWith('Hola, CESDMA.') || l.target !== '_blank' || !l.rel.includes('noopener');
  });
  check(`${u} enlaces de WhatsApp correctos (${wa.length})`, wa.length > 0 && waBad.length === 0, waBad.map((b) => b.href).join(' '));
  links.filter((l) => l.href.startsWith('/')).forEach((l) => internalLinks.add(l.href.split('#')[0]));

  // Accesibilidad (axe-core, WCAG 2.2 AA)
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  check(`${u} axe WCAG 2.2 AA sin infracciones`, axe.violations.length === 0, axe.violations.map((v) => `${v.id} (${v.nodes.length})`).join(', '));
  await page.close();
}

// Enlaces internos rotos
for (const href of internalLinks) {
  const r = await fetch(BASE + href);
  check(`enlace interno ${href}`, r.ok, String(r.status));
}
for (const f of ['/robots.txt', '/sitemap-index.xml', '/og-image.png', '/favicon-48.png', '/favicon.ico', '/brand/emblema.webp', '/apple-touch-icon.png']) {
  const r = await fetch(BASE + f);
  check(`recurso ${f}`, r.ok);
}

// ---- Interacciones (móvil) ----
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });

// Saltar al contenido
await page.keyboard.press('Tab');
check('primer Tab enfoca "Saltar al contenido"', await page.evaluate(() => document.activeElement?.classList.contains('skip-link')));

// Menú móvil
const toggle = page.locator('[data-menu-toggle]');
await toggle.click();
check('menú móvil se abre', (await toggle.getAttribute('aria-expanded')) === 'true' && (await page.locator('#menu-movil').isVisible()));
check('foco pasa al menú', await page.evaluate(() => !!document.activeElement?.closest('#menu-movil')));
await page.keyboard.press('Escape');
check('Esc cierra el menú y devuelve el foco', (await toggle.getAttribute('aria-expanded')) === 'false' && (await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle'))));
await toggle.click();
await page.locator('#menu-movil a', { hasText: 'Servicios' }).click();
await page.waitForTimeout(400);
check('enlace del menú lleva a la sección y cierra', (await toggle.getAttribute('aria-expanded')) === 'false' && page.url().endsWith('#servicios'));

// Filtros
await page.locator('[data-filter="cardiovascular"]').click();
const visible = await page.locator('.services__grid > li:not([hidden])').count();
check('filtro "Cardiovascular" muestra 5 servicios', visible === 5, String(visible));
check('anuncio accesible del filtro', (await page.locator('[data-filter-status]').textContent())?.includes('5'));
await page.locator('[data-filter="all"]').click();
check('filtro "Todos" muestra 10', (await page.locator('.services__grid > li:not([hidden])').count()) === 10);
await page.locator('.quick__tile[data-filter-link="laboratorio"]').click();
check('acceso rápido preselecciona categoría', (await page.locator('.services__grid > li:not([hidden])').count()) === 1);

// Asistente de WhatsApp
const form = page.locator('[data-wa-builder]');
await form.scrollIntoViewIfNeeded();
await page.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; }; });
await form.locator('button[type="submit"]').click();
check('asistente: error si no hay servicio', (await form.locator('[data-error]').isVisible()) && (await form.locator('select').getAttribute('aria-invalid')) === 'true');
await form.locator('select').selectOption('holter');
await form.locator('#wa-name').fill('Ana <script>123');
await form.locator('.seg label', { hasText: 'Tarde' }).click();
const preview = await form.locator('[data-preview]').textContent();
check('asistente: vista previa', preview === 'Hola, CESDMA. Mi nombre es Ana script. Quisiera información y coordinar una cita para: Holter. Si es posible, prefiero en horario de la tarde.', preview ?? '');
await form.locator('button[type="submit"]').click();
const opened = await page.evaluate(() => window.__opened);
check('asistente: abre wa.me con el mensaje codificado', opened.length === 1 && decodeURIComponent(new URL(opened[0]).searchParams.get('text')) === preview && opened[0].startsWith(`https://wa.me/${WA_NUMBER}?text=`), opened[0]);

// Botón flotante
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(150);
check('botón flotante oculto sobre el hero', (await page.locator('[data-fab]').getAttribute('data-state')) === 'hidden');
await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'instant' }));
await page.waitForTimeout(400);
const fab = page.locator('[data-fab]');
check('botón flotante visible tras desplazarse', (await fab.getAttribute('data-state')) === 'visible');
const box = await fab.boundingBox();
check('botón flotante dentro de pantalla y ≥ 44px', !!box && box.width >= 44 && box.height >= 44 && box.x + box.width <= 390 && box.y + box.height <= 844);

// Mapa bajo demanda
await page.locator('[data-map-load]').click();
check('mapa se carga solo al pulsar', (await page.locator('[data-map] iframe').count()) === 1);

// FAQ con teclado
const sum = page.locator('#preguntas summary').nth(1);
await sum.focus();
await page.keyboard.press('Enter');
check('FAQ se abre con teclado', await page.locator('#preguntas details').nth(1).evaluate((d) => d.open));

// Sin desbordamiento horizontal
for (const w of [320, 360, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width: w, height: 800 });
  for (const u of ['/', '/servicios/', '/servicios/mapa/']) {
    await page.goto(BASE + u, { waitUntil: 'networkidle' });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    check(`sin scroll horizontal ${u} @${w}px`, sw <= w, `${sw}px`);
  }
}

// Movimiento reducido: nada se oculta para animar
const rm = await browser.newContext({ reducedMotion: 'reduce' });
const p2 = await rm.newPage();
await p2.goto(BASE + '/', { waitUntil: 'networkidle' });
check('prefers-reduced-motion: sin elementos ocultos para animar', (await p2.locator('.will-reveal').count()) === 0);

// Sin JavaScript: el contenido y los enlaces siguen funcionando
const nojs = await browser.newContext({ javaScriptEnabled: false });
const p3 = await nojs.newPage();
await p3.goto(BASE + '/', { waitUntil: 'networkidle' });
check('sin JS: servicios visibles y sin controles inertes', (await p3.locator('.services__grid > li').count()) === 10 && !(await p3.locator('[data-filters]').isVisible()) && !(await p3.locator('[data-wa-builder]').isVisible()));

await browser.close();
server?.kill();

console.log(results.join('\n'));
console.log(`\n${pass} correctas, ${fail} fallidas`);
process.exit(fail ? 1 : 0);
