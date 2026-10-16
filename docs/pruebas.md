# Resultados de pruebas

Fecha: 15 de octubre de 2026 (repetidas tras integrar el logo y los datos de Instagram). Build de producción (`npm run build`) servido con `astro preview` en local.
Navegador: Chromium 140 (Playwright 1.55). Lighthouse 13.5 con su simulación de red por defecto.

## Compilación

- `astro check`: 0 errores, 0 avisos.
- `astro build`: 14 páginas generadas, sitemap creado.
- `npm audit`: 0 vulnerabilidades.
- JavaScript propio: 4,9 KB (2,2 KB comprimido). Sin librerías de terceros en el navegador.

## Pruebas automáticas (`npm test`): 187 correctas, 0 fallidas

En cada una de las 13 páginas indexables:

- Responde 200 y no hay errores en la consola.
- Título único, descripción de 50–170 caracteres, canonical, `lang="es-DO"`, Open Graph, un solo `h1`, JSON-LD válido.
- Ningún enlace vacío, `#` ni `javascript:`; todos los enlaces tienen nombre accesible.
- Todos los enlaces de WhatsApp usan `wa.me/18095498560`, llevan un mensaje que empieza por “Hola, CESDMA.” y abren en pestaña nueva con `noopener`.
- **axe-core (WCAG 2.0/2.1/2.2 A y AA): 0 infracciones.**

Además:

- Todos los enlaces internos, `robots.txt`, sitemap, imagen OG y favicons responden.
- Teclado: el primer Tab enfoca “Saltar al contenido”; el menú móvil se abre, mueve el foco, se cierra con Esc y devuelve el foco; las FAQ se abren con Enter.
- Filtros de servicios (5 cardiovasculares, 10 en “Todos”) con anuncio para lector de pantalla; los accesos rápidos preseleccionan la categoría.
- Asistente de WhatsApp: muestra error si falta el servicio, limpia el nombre (`Ana <script>123` → `Ana script`), arma la vista previa y abre `wa.me` con el mismo texto codificado.
- Botón flotante: oculto sobre el hero, visible al desplazarse, ≥ 44 px y dentro de la pantalla.
- Mapa: solo se carga al pulsar el botón.
- Sin scroll horizontal en 320, 360, 390, 768, 1024 y 1440 px (inicio, servicios y una página de servicio).
- `prefers-reduced-motion`: no se oculta ni anima nada.
- Sin JavaScript: los 10 servicios se ven y no quedan controles inertes visibles (filtros y asistente se ocultan; se muestra un enlace directo a WhatsApp).

## CSP de producción (`npm run test:csp`)

Con la cabecera `Content-Security-Policy` de `public/_headers` aplicada: sin bloqueos y los scripts funcionan.

## Lighthouse (`npm run test:lighthouse`)

| Página | Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|---|
| Inicio | Móvil | 99 | 100 | 100 | 100 |
| Inicio | Escritorio | 100 | 100 | 100 | 100 |
| Servicios | Móvil | 100 | 100 | 100 | 100 |
| Servicios | Escritorio | 100 | 100 | 100 | 100 |
| Sonografía 4D | Móvil | 100 | 100 | 100 | 100 |
| Sonografía 4D | Escritorio | 100 | 100 | 100 | 100 |

Inicio en móvil: LCP 1,7 s, CLS 0,001, TBT 0 ms.

Condiciones: servidor local, sin CDN ni HTTPS. Los valores en el hosting final pueden variar; conviene repetir la medición tras publicar. Cuando se añadan fotos reales, optimízalas (WebP/AVIF) y vuelve a medir.

## Revisión visual

Capturas a 360, 390, 820, 1366 y 1920 px en `docs/capturas/`. Se corrigieron durante la revisión: desbordamiento horizontal en 360 px, iconos del botón de menú, superposición de tarjetas del hero en móvil y estilo de las etiquetas de sección.

## No probado

- Que el número 809-549-8560 tenga WhatsApp activo (no se puede comprobar sin escribir al número).
- El punto exacto del mapa: se usan las coordenadas publicadas en Instagram.
- Lectores de pantalla reales (NVDA, VoiceOver): solo pruebas automáticas y de teclado.
- Navegadores Safari y Firefox.
