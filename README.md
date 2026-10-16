# CESDMA — sitio web

Sitio oficial de **CESDMA, Centro de Sonografía y Diagnósticos Médico Dra. Cruzveris Martínez**.

Sitio estático (HTML pre-generado) hecho con **Astro 7 + TypeScript**, sin backend y con unos 5 KB de JavaScript propio (2 KB comprimido). Toda la información institucional está en un único archivo de configuración.

- Ficha de marca e investigación: [`docs/ficha-de-marca.md`](docs/ficha-de-marca.md)
- Datos pendientes de confirmar: [`docs/datos-pendientes.md`](docs/datos-pendientes.md)
- Resultados de pruebas: [`docs/pruebas.md`](docs/pruebas.md)

> **Antes de publicar:** falta confirmar que el número tiene **WhatsApp activo** y el **horario**. Mientras tanto el sitio los marca con “Por confirmar”. Ver `docs/datos-pendientes.md`.

## Requisitos

- Node.js 22 o superior.

## Uso

```bash
npm install
npm run dev          # desarrollo en http://localhost:4321
npm run build        # comprueba tipos y genera dist/
npm run preview      # sirve dist/ localmente
npm run check:data   # lista los datos sin confirmar
npm test             # pruebas funcionales, accesibilidad y SEO (requiere build)
npm run test:lighthouse   # con `npm run preview` en marcha
```

Si Playwright no encuentra Chromium, indica la ruta: `CHROMIUM_PATH=/ruta/a/chrome npm test`.

## Configuración

### Variables de entorno (`.env`, ver `.env.example`)

| Variable | Para qué |
|---|---|
| `PUBLIC_SITE_URL` | Dominio definitivo (canonical, sitemap, Open Graph). Por defecto `https://www.cesdma.com.do` (**pendiente**). |
| `PUBLIC_SHOW_PENDING` | `true` (por defecto) muestra “Por confirmar” junto a los datos no verificados. Ponlo en `false` **solo** cuando `npm run check:data:strict` pase. |

No hay secretos ni claves: el sitio no usa APIs de pago ni bases de datos.

### Datos del centro — `src/config/site.ts`

Teléfono, WhatsApp, dirección, coordenadas, horario, redes, especialidades, médicos, seguros, foto del hero y galería. Cada dato tiene `verified`, `source` y `note`. Un dato con `verified: false`:

- se muestra con la etiqueta “Por confirmar” (si `PUBLIC_SHOW_PENDING` no es `false`);
- **no** se incluye en los datos estructurados de Google.

Comportamiento automático:

- `hours` vacío → “Horario: consúltalo por WhatsApp”.
- `specialties` vacío → invitación a consultar por WhatsApp; con datos → lista de especialidades.
- `doctors` vacío → no se muestran perfiles; con datos → fichas con foto, especialidad y credenciales.
- `heroImage: null` → composición gráfica de marca; con foto → la foto ocupa el panel del hero.
- `gallery` vacía → la sección de instalaciones no aparece.

### Servicios — `src/data/services.ts`

Nombre, resumen, introducción, datos útiles, modalidades confirmadas (`details`), qué preguntar y **mensaje de WhatsApp propio**. Añadir un servicio crea su página automáticamente en `/servicios/<slug>/`.

### Mensajes de WhatsApp — `src/config/whatsapp.ts`

Mensajes del encabezado, hero, botón flotante, contacto, FAQ y pie. Los enlaces se generan con `wa.me/<número>?text=<mensaje codificado>`. Nunca incluyen datos de salud.

### Preguntas frecuentes — `src/data/faq.ts`

### Cambiar el logo

El logo se compone del emblema oficial (`public/brand/emblema.webp`, con versión PNG para redes) y el nombre “CESDMA” en texto (`src/components/Logo.astro`). Para cambiarlo:

1. Sustituye `public/brand/emblema.png` y `emblema.webp` (fondo transparente) y ajusta `logo.width`/`logo.height` en `site.ts` a su proporción.
2. Regenera los iconos (`favicon.ico`, `favicon-48.png`, `apple-touch-icon.png`, `icon-512.png`) a partir del emblema.
3. Ejecuta `npm run images` para regenerar `og-image.png` (plantilla en `scripts/assets/og.html`).

### Fotos

Usa solo fotos reales con permiso. Guárdalas en `public/` en WebP o AVIF (≈1600 px de ancho máximo) e indica `width` y `height` reales en la configuración.

## Estructura

```
src/
  config/site.ts        Datos institucionales (único lugar a editar)
  config/whatsapp.ts    Mensajes de WhatsApp
  data/services.ts      Catálogo de servicios
  data/faq.ts           Preguntas frecuentes
  lib/whatsapp.ts       Enlaces wa.me y tel:
  lib/schema.ts         Datos estructurados (solo datos verificados)
  styles/tokens.css     Sistema de diseño (colores, tipografía, espaciado…)
  components/           Componentes de la interfaz
  layouts/Base.astro    SEO, Open Graph, cabecera y pie
  pages/                Inicio, servicios, privacidad, 404, robots.txt
  scripts/main.ts       Interacciones (menú, filtros, asistente, mapa…)
  scripts/message.ts    Composición del mensaje del asistente
public/                 Logo, favicon, imagen OG, cabeceras de seguridad
tests/                  Pruebas automáticas y Lighthouse
```

## Publicación

Es un sitio estático: sirve la carpeta `dist/` en cualquier hosting con HTTPS (Vercel, Netlify, Cloudflare Pages…).

- **Vercel:** `vercel.json` ya define cabeceras de seguridad y caché.
- **Netlify / Cloudflare Pages:** `public/_headers` hace lo mismo.
- Comando de build: `npm run build`. Carpeta de salida: `dist`.
- Define `PUBLIC_SITE_URL` con el dominio final.
- Tras publicar, registra el sitio en Google Search Console y envía `/sitemap-index.xml`. Vincula el sitio desde el perfil de Google Business y desde la biografía de Instagram.

## Seguridad y privacidad

- Sin formularios que envíen datos a un servidor, sin cookies, sin analítica ni píxeles publicitarios.
- El asistente “Prepara tu mensaje” funciona en el navegador; valida y limpia el nombre (solo letras, máx. 60) y no pide datos de salud.
- Cabeceras: CSP estricta (`script-src 'self'`), HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`.
- Google Maps solo se carga si el usuario lo pide.
- `npm audit`: 0 vulnerabilidades a la fecha de entrega.
- Medición de contactos (opcional): cada clic en WhatsApp o teléfono emite el evento `cesdma:contact` con `{ channel, context }`, sin el texto del mensaje. Si en el futuro se añade analítica, escucha ese evento con una herramienta respetuosa con la privacidad y actualiza el aviso de privacidad.

## Accesibilidad

Referencia WCAG 2.2 AA: contraste medido en todos los tokens, enlace “Saltar al contenido”, foco visible, menú móvil con teclado (Esc, Tab), filtros con `aria-pressed` y anuncio del resultado, FAQ nativas (`<details>`), objetivos táctiles ≥ 44 px, `prefers-reduced-motion` respetado y todo el contenido disponible sin JavaScript.
